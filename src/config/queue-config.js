const amqplib = require("amqplib");

let channel, connection;

async function connectQueue() {
    try{
         connection = await amqplib.connect("amqps://xmylqijo:cBNQINxXmEmtDljehz6j0UiKhan3RW9j@rabbit.lmq.cloudamqp.com/xmylqijo");
         channel = await connection.createChannel();

        await channel.assertQueue("noti-queue");
    }catch(error) {
        console.log(error)
    }
}

async function sendData(data) {
    try {
        await channel.sendToQueue("noti-queue", Buffer.from(JSON.stringify(data)));

    } catch(error){
        console.log(error);
        throw error;
    }
}

module.exports ={
     connectQueue,
     sendData
}
