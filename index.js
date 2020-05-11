"use strict"
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');
const app = express();
const logger = require('./app/libs/loggerLib');
const productRoute = require('./app/routes/product');
const studentInfoRoute = require('./app/routes/studentInfo')
const appConfig = require('./config/appConfig');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cookieParser());
// app.use((req, res, next) => {
//     res.status(200).json({
//         message: 'Server Started!'
//     });
// });


// const port = process.env.PORT || 3000;
const server = http.createServer(app);

/* start server listening */
console.log(appConfig.port);
server.listen(appConfig.port);

/**
 * Event listener for HTTP server "error" event.
 */

let onError = (error) => {
    if (error.syscall !== 'listen') {
      logger.error(error.code + ' not equal listen', 'serverOnErrorHandler', 10)
      throw error;
    }
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        logger.error(error.code + ':elavated privileges required', 'serverOnErrorHandler', 10);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        logger.error(error.code + ':port is already in use.', 'serverOnErrorHandler', 10);
        process.exit(1);
        break;
      default:
        logger.error(error.code + ':some unknown error occured', 'serverOnErrorHandler', 10);
        throw error;
    }
}

// error event listening
server.on('error', onError);

/**
 * Event listener for HTTPS server "listening" event.
 */

let onListening = () => {

    let address = server.address();
    let bind = (typeof address === 'string') ? 'pipe ' + address : 'port ' + address.port;
    console.log('Listening on ' + bind);
    logger.info('server listening on port' + address.port, 'serverOnListeningHandler', 10);
    // let db = mongoose.connect(appConfig.db.uri, {
    //   useNewUrlParser: true
    // });
  }
  
  // success event listening 
  server.on('listening', onListening);
  

  //product route
app.use('/products', productRoute);
/* studentInfo route */
app.use('/studentInfo', studentInfoRoute);
module.exports = app;