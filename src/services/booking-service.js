const axios = require('axios');
const { ServerConfig } = require('../config');
const  AppError  = require('../utils/errors/app-error')

const { BookingRepository } = require('../repositories');
const db = require('../models');
const { StatusCodes } = require('http-status-codes');

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
        const booking = await bookingRepository.createBooking(bookingPayload, transaction);

        await axios.patch(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}/seats`,{
            seats: data.noOfSeats
        })
        await transaction.commit();
        return booking;
    }catch(error){
        await transaction.rollback();
        throw error;
    }
}

module.exports={
    createBooking
}
