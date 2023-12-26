const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');


const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_DB, REDIS_HOST, REDIS_PORT, MONGO_HOST, MONGODB_PORT } = require('./config/config.js');

//////////////configure redis for session storage

const session = require('express-session');
const redis = require('ioredis');
const connectRedis = require('connect-redis');


const RedisStore = connectRedis(session);
const redisClient = redis.createClient({
    host: REDIS_HOST,
    port: REDIS_PORT
});



const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: process.env.SESSION_SECRET || 'secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 1 // 1 minutes
        }
    })
);

//connect to mongodb database service 

const MONGODB_URI = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGODB_PORT}/${MONGO_DB}?authSource=admin`;
const connect_with_retry = () => {
  return mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log('MongoDB Connected'))
      .catch(err => {
          console.log(err);
          setTimeout(connect_with_retry, 5000);
      });
};


connect_with_retry();
  

  const authRoutes = require('./routes/v1/authRoutes');
  app.use('/auth/v1', authRoutes);

  app.listen(port, () => {
    console.log(`Server Running at ${port}`);
  });
  