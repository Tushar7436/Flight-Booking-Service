const { StatusCodes } = require("http-status-codes");

const { ErrorResponse } = require('../utils/common');
const AppError = require("../utils/errors/app-error");

function validateCreateRequest(req,res,next) {
    if(!req.body.totalCost) {
        ErrorResponse.message = "Something went wrong while creating the totalcost",
        ErrorResponse.error = new AppError(['totalcost is not found in the incoming request'],StatusCodes.BAD_REQUEST);
        return res  
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.userId) {
        ErrorResponse.message = "Something went wrong while creating the userId",
        ErrorResponse.error = new AppError(['userId is not found in the incoming request'],StatusCodes.BAD_REQUEST);
        return res  
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.bookingId) {
        ErrorResponse.message = "Something went wrong while creating the bookingId",
        ErrorResponse.error = new AppError(['bookingId is not found in the incoming request'],StatusCodes.BAD_REQUEST);
        return res  
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.recipientEmail) {
        ErrorResponse.message = "Something went wrong while creating the recipientEmail",
        ErrorResponse.error = new AppError(['recipientEmail is not found in the incoming request'],StatusCodes.BAD_REQUEST);
        return res  
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateRequest
}