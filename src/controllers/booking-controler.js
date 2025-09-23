const { StatusCodes } = require('http-status-codes')
const { BookingService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common')

const inMemDb = {};

async function createBooking(req, res) {
    try{
        console.log("req",req.body);
        const response = await BookingService.createBooking({
            flightId: req.body.flightId,
            userId: req.body.userId,
            noOfSeats: req.body.noOfSeats,
            recipientEmail: req.body.recipientEmail,
        });
        SuccessResponse.data = response;
        console.log(response);
        return res 
                    .status(StatusCodes.OK)
                    .json(SuccessResponse);
    } catch(error){
        console.log(error);
       ErrorResponse.error = error;
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}

async function makePayment(req, res) {
    try{
        const idempotencyKey = req.headers['x-idempotency-key'];
        if(!idempotencyKey || inMemDb[idempotencyKey]) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({message: 'Cannot retry on a successful payment or not send access key'});
        }
        const response = await BookingService.makePayment({
            totalCost: req.body.totalCost,
            userId: req.body.userId,
            bookingId: req.body.bookingId,
            recipientEmail: req.body.recipientEmail,
        });
        inMemDb[idempotencyKey] = idempotencyKey;
        SuccessResponse.data = response;
        return res 
                .status(StatusCodes.OK)
                .json({
                    message: "Order created successfully",
                    data: {
                    orderId: response.orderId,
                    amount: response.amount,
                    currency: response.currency,
                    bookingId: response.bookingId,
                    key: response.key, // frontend needs this
                    },
                });
    } catch(error){
       ErrorResponse.error = error;
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}

async function verifyPayment(req, res) {
    console.log("reqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",req);
    console.log("ressssssssssssssssssssssssssssssssssssssssssss",res);
    try{
        const response = await BookingService.verifyPayment({
            razorpay_order_id: req.body.razorpay_order_id,
            razorpay_payment_id: req.body.razorpay_payment_id,
            bookingId: req.body.bookingId,
            razorpay_signature: req.body.razorpay_signature,
        });
        inMemDb[idempotencyKey] = idempotencyKey;
        SuccessResponse.data = response;
        return res 
                .status(StatusCodes.OK)
                .json({
                    message: "Ticket Booked successfully",
                });
    } catch(error){
       ErrorResponse.error = error;
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}

module.exports = {
    createBooking,
    makePayment,
    verifyPayment
}
 