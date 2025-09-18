const express = require('express');

const { ServerConfig, Queue } = require('./config');
const cors = require('cors');
const apiRoutes = require('./routes');
const CRON = require('./utils/common/cron-jobs')

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async() => {
    console.log(`sucessfully started the server on PORT: ${ServerConfig.PORT}`);
    CRON();
    await Queue.connectQueue(),
    console.log("queue connected");
});