const express = require('express');
// const { BookingMiddleware } = require('../../middlewares')
const { BookingController } = require('../../controllers');
 
const router = express.Router();

router.post('/',
    BookingController.createBooking
)

router.post('/payments',
    BookingController.makePayment
);

router.post('/verifyPayment',
    BookingController.verifyPayment
)
module.exports= router;