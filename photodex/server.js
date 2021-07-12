const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');

const authRoute = require('./routes/api/auth');
const postRoute = require('./routes/api/upload');
const listUsersRoute = require('./routes/api/users');
const listAlbumsRoute = require('./routes/api/listAlbums');
const { verifyJWT } = require('./middleware/verifyJWT');

//vars for database connection
const mongoose = require('mongoose');
require('dotenv/config');

const app = express();

//connect to db
const connectDB = async () => {
  try {
      await mongoose.connect(process.env.DB_CONNECTION, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true
      });

      console.log('MongoDB connected!!');
  } catch (err) {
      console.log('Failed to connect to MongoDB', err);
  }
};

connectDB();

app.listen(8000, () => console.log('Server started . . .'));

//middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', listUsersRoute);
app.use('/api/user/', listAlbumsRoute);
app.use('/api/', authRoute);
app.use('/api/post', /*verifyJWT,*/ postRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send json error message
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

module.exports = app;
