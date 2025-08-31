const { StatusCodes } = require('http-status-codes');

const Booking = require('./models');
const CrudRepository = require('./crud-repository');

class BookingRespository extends CrudRepository {
    constructor() {
        super(Booking);
    }
}

module.exports = BookingRespository;