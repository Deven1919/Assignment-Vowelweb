const express = require('express');
const morgan = require('morgan');
const app = express();
const prodRouter = require('./router/productRoutes');
const userRouter = require('./router/userRoutes');
const orderRouter = require('./router/orderRoutes');
app.use(express.json());
app.use(morgan('dev'));

//ROUTES
app.use('/api/v1/prod', prodRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/order', orderRouter);

// FOR HANDLING THE INCORRECT URL PATH
app.all('*', (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server.`);
  err.statusCode = 404;
  err.status = 'Fail';
  next(err);
});

//GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  err.status = err.status || 'ERROR 💥';
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
  next();
});

module.exports = app;
