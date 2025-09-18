'use strict';
const { Op } = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bookings', [
      { id: 1,  flightId: 3,  userId: 1,  status: 'booked',    noOfSeats: 10, totalCost: 10000, createdAt: new Date('2025-09-03 10:54:50'), updatedAt: new Date('2025-09-04 10:56:00') },
      { id: 2,  flightId: 2,  userId: 1,  status: 'booked',    noOfSeats: 10, totalCost: 10000, createdAt: new Date('2025-09-04 05:04:00'), updatedAt: new Date('2025-09-04 10:56:00') },
      { id: 3,  flightId: 4,  userId: 1,  status: 'cancelled', noOfSeats: 10, totalCost: 10000, createdAt: new Date('2025-09-04 05:21:13'), updatedAt: new Date('2025-09-04 11:06:10') },
      { id: 4,  flightId: 3,  userId: 2,  status: 'cancelled', noOfSeats: 10, totalCost: 10000, createdAt: new Date('2025-09-04 05:30:16'), updatedAt: new Date('2025-09-04 11:06:10') },
      { id: 5,  flightId: 3,  userId: 2,  status: 'cancelled', noOfSeats: 10, totalCost: 10000, createdAt: new Date('2025-09-04 05:47:51'), updatedAt: new Date('2025-09-04 11:06:10') },
      { id: 6,  flightId: 4,  userId: 3,  status: 'cancelled', noOfSeats: 10, totalCost: 10000, createdAt: new Date('2025-09-04 06:26:35'), updatedAt: new Date('2025-09-04 11:06:10') },
      { id: 7,  flightId: 5,  userId: 3,  status: 'cancelled', noOfSeats: 10, totalCost: 10000, createdAt: new Date('2025-09-04 12:06:39'), updatedAt: new Date('2025-09-04 12:12:24') },
      { id: 8,  flightId: 5,  userId: 1,  status: 'booked',    noOfSeats: 10, totalCost: 10000, createdAt: new Date('2025-09-04 12:14:58'), updatedAt: new Date('2025-09-04 12:17:54') },
      { id: 9,  flightId: 5,  userId: 1,  status: 'cancelled', noOfSeats: 10, totalCost: 10000, createdAt: new Date('2025-09-08 05:58:15'), updatedAt: new Date('2025-09-08 06:10:00') },
      { id: 10, flightId: 2,  userId: 1,  status: 'cancelled', noOfSeats: 10, totalCost: 10000, createdAt: new Date('2025-09-08 06:04:47'), updatedAt: new Date('2025-09-08 06:10:00') },
      { id: 11, flightId: 13, userId: 1,  status: 'cancelled', noOfSeats: 2,  totalCost: 40000, createdAt: new Date('2025-09-08 08:52:19'), updatedAt: new Date('2025-09-08 09:00:00') },
      { id: 12, flightId: 2,  userId: 1,  status: 'cancelled', noOfSeats: 10, totalCost: 10000, createdAt: new Date('2025-09-09 06:28:19'), updatedAt: new Date('2025-09-09 06:40:00') },
      { id: 13, flightId: 2,  userId: 1,  status: 'cancelled', noOfSeats: 10, totalCost: 10000, createdAt: new Date('2025-09-09 07:48:06'), updatedAt: new Date('2025-09-09 08:00:00') },
      { id: 14, flightId: 2,  userId: 3,  status: 'cancelled', noOfSeats: 10, totalCost: 10000, createdAt: new Date('2025-09-09 07:52:19'), updatedAt: new Date('2025-09-09 08:00:00') },
      { id: 15, flightId: 3,  userId: 4,  status: 'cancelled', noOfSeats: 10, totalCost: 10000, createdAt: new Date('2025-09-09 07:56:40'), updatedAt: new Date('2025-09-09 08:01:00') },
      { id: 16, flightId: 3,  userId: 4,  status: 'cancelled', noOfSeats: 10, totalCost: 10000, createdAt: new Date('2025-09-09 08:01:17'), updatedAt: new Date('2025-09-09 08:10:00') },
      { id: 17, flightId: 2,  userId: 5,  status: 'booked',    noOfSeats: 10, totalCost: 10000, createdAt: new Date('2025-09-09 08:01:43'), updatedAt: new Date('2025-09-09 08:01:56') },
      { id: 18, flightId: 2,  userId: 5,  status: 'cancelled', noOfSeats: 10, totalCost: 10000, createdAt: new Date('2025-09-09 10:43:01'), updatedAt: new Date('2025-09-09 10:50:00') },
      { id: 19, flightId: 2,  userId: 5,  status: 'cancelled', noOfSeats: 10, totalCost: 10000, createdAt: new Date('2025-09-09 11:08:17'), updatedAt: new Date('2025-09-09 11:20:00') },
      { id: 20, flightId: 2,  userId: 5,  status: 'cancelled', noOfSeats: 10, totalCost: 10000, createdAt: new Date('2025-09-09 11:14:55'), updatedAt: new Date('2025-09-09 11:20:00') },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', { id: { [Op.in]: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20] } });
  }
};
