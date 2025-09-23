const axios = require('axios');
const { ServerConfig, Queue } = require('../config');
const  AppError  = require('../utils/errors/app-error');

const { BookingRepository } = require('../repositories');
const db = require('../models');
const { StatusCodes } = require('http-status-codes');

const { ENUMS } = require('../utils/common');
const { BOOKED,CANCELLED } = ENUMS.BOOKING_STATUS;

const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});


const bookingRepository = new BookingRepository();

async function createBooking(data){

    const transaction = await db.sequelize.transaction();
    try{
        const flight = await axios.get(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`);
        const flightdata = flight.data.data;
        if(data.noOfSeats > flightdata.totalSeats){
            throw new AppError('not enough seats', StatusCodes.BAD_REQUEST);
        }

        const totalBillingAmount = data.noOfSeats * flightdata.price;
        const bookingPayload = {...data, totalCost: totalBillingAmount};
        const booking = await bookingRepository.create(bookingPayload, transaction);

        await axios.patch(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}/seats`,{
            seats: data.noOfSeats
        });
        console.log(data.recipientEmail);
        // Queue.sendData({
        //     recipientEmail: data.recipientEmail,
        //     subject: 'lumenairways',
        //     text: `we know you have a flight in mind and we will server your tickets after your payment confirmation`
        // })
        await transaction.commit();
        return booking;
    }catch(error){
        await transaction.rollback();
        throw error;
    }
}

async function makePayment(data){

    try{
        const bookingDetails = await bookingRepository.get(data.bookingId);
        if(bookingDetails.status == CANCELLED) {
            throw new AppError('The booking time has expired', StatusCodes.BAD_REQUEST);
        }
        const bookingTime = new Date(bookingDetails.createdAt);
        const currentTime = new Date();
        if(currentTime - bookingTime > 600000) {
            await cancelBooking(data.bookingId);
            throw new AppError('The booking time expired', StatusCodes.BAD_REQUEST);
        }
        if(bookingDetails.totalCost != data.totalCost) {
            throw new AppError('The amount of payment doesnot match', StatusCodes.BAD_REQUEST);
        }
        if(bookingDetails.userId != data.userId) {
            throw new AppError('The user corresponding to the booking doesnot match', StatusCodes.BAD_REQUEST);
        }
        // Razorpay order
        const options = {
            amount: bookingDetails.totalCost * 100, // amount in paise
            currency: "INR",
            receipt: `receipt_order_${bookingDetails.id}`,
        };

        const order = await razorpay.orders.create(options);

        // Return order details to frontend 
        return {
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            bookingId: bookingDetails.id,
            key: process.env.RAZORPAY_KEY_ID,
        };
    } catch (error) {
        console.log("makePayment error:", error);
        throw error;
    }
}

async function verifyPayment(data) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = data;
  
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");
  
    if (expectedSignature !== razorpay_signature) {
      await cancelBooking(bookingId); // rollback seats, mark CANCELLED
      throw new AppError("Invalid payment signature", 400);
    }
  
    const transaction = await db.sequelize.transaction();
    try {
      await bookingRepository.update(bookingId, { status: BOOKED }, transaction);
  
    //   Queue.sendData({
    //     recipientEmail: data.recipientEmail,
    //     subject: "Lumen Airways: Flight Booking Confirmed",
    //     text: `Booking ID: ${bookingId} is confirmed`
    //   });
  
      await transaction.commit();
      return { success: true, bookingId };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
  

async function cancelBooking(bookingId) {
    const transaction = await db.sequelize.transaction();
    try {
        const bookingDetails = await bookingRepository.get(bookingId, transaction);
        console.log(bookingDetails);
        if(bookingDetails.status == CANCELLED) {
            await transaction.commit();
            return true;
        }
        await axios.patch(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${bookingDetails.flightId}/seats`,{
            seats: bookingDetails.noOfSeats,
            dec: 0
        });
        await bookingRepository.update(bookingId, {status: CANCELLED}, transaction);
        await transaction.commit();
    }catch(error) {
        await transaction.rollback();
        throw error;
    }
}

async function cancelOldBookings(){
    try{
        console.log("inside service");
        const time = new Date(Date.now() - 1000 * 300); //time 5mins ago
        const response = await bookingRepository.cancelOldBookings(time);
        return response;
    }catch(error) {
        console.log(error);
        // await transaction.rollback();
        // throw error;
    }
}

module.exports={
    createBooking,
    makePayment,
    verifyPayment,
    cancelOldBookings
}
