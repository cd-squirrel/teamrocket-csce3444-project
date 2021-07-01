const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
//const usersRouter = require('./routes/users');
const register = require('./routes/api/register');
const users = require('./routes/api/users');

//vars for database connection
const mongoose = require('mongoose');
require('dotenv/config');
//const m = new mongoose.Mongoose( { useUnifiedTopology: true } );

const app = express();

//connect to db
const connectDB = async () => {
  try {
      await mongoose.connect(process.env.DB_CONNECTION, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      });

      console.log('MongoDB connected!!');
  } catch (err) {
      console.log('Failed to connect to MongoDB', err);
  }
};

connectDB();

app.listen(3001, () => console.log('Server started . . .'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/users', usersRouter);

app.use('/api/users', users);
app.use('/api/register', register);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
