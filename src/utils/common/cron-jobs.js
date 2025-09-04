const cron = require('node-cron');

const { BookingService } = require('../../services/');

function scheduleCrons(){
    cron.schedule('*/10 * * * *', async () => {
        console.log('starting cron job',BookingService);
        await BookingService.cancelOldBookings();

    });
}

module.exports = scheduleCrons; 