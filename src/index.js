const express = require('express');

const { ServerConfig, Logger } = require('./config');
const apiRoutes = require('./routes');


const app = express();

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`sucessfully started the server on PORT: ${ServerConfig.PORT}`);
    Logger.info("Sucessfully started the server");
});