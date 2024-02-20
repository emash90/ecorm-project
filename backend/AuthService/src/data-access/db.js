const mongoose = require('mongoose');
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_AUTH_DB, MONGO_HOST, MONGODB_PORT } = require('../../config/config.js');

let MONGODB_URI;

if (process.env.NODE_ENV == 'production') {
    // use mongo atlas
    MONGODB_URI = process.env.MONGODB_URI;
}else {
    MONGODB_URI = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGODB_PORT}/${MONGO_AUTH_DB}?authSource=admin`;
}
const connectDB = () => {
  return mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log('MongoDB Connected'))
      .catch(err => {
          console.log(err);
          setTimeout(connectDB, 5000);
      });
};


module.exports = connectDB;