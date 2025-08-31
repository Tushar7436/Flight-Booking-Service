'use strict';
const {
  Model
} = require('sequelize');

const { ENUMS } = require('../utils/common');
const { PENDING, BOOKED, INITIATED, CANCELLED } = ENUMS.BOOKING_STATUS;
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init({
    flightId:{
      types: DataTypes.INTEGER,
      allowNull: false
    }, 
    userId:{
      types:DataTypes.INTEGER,
      allowNull: false,
    },
    status:{
      types: DataTypes.ENUM,
      values: [PENDING,BOOKED,INITIATED, CANCELLED],
      defaultValue: INITIATED,
      allowNUll: false
    }, 
    noOfSeats:{
      types: DataTypes.INTEGER,
      defaultValue:1,
      allowNull: false
    },
    totalCost:{
      types: DataTypes.INTEGER,
      allowNull: false
    } 
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};