const express = require('express');

const { ServerConfig } = require('./config');
const cors = require('cors');
const apiRoutes = require('./routes');
const CRON = require('./utils/common/cron-jobs')

const app = express();

app.use(cors({ origin: "*" }));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`sucessfully started the server on PORT: ${ServerConfig.PORT}`);
    CRON();
});