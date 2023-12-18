const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


////////////setup redis to store user sessions

const session = require("express-session");
const redis = require("redis");
let RedisStore = require("connect-redis").default;



const app = express();


let redisClient = redis.createClient({
    host: 'localhost',
    port: 6379
});

const port = process.env.PORT || 4000

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: 'secret$%123',
    cookie: { maxAge: 2600000 },
    saveUninitialized: false,
    resave: false
}));

app.listen(port, () => {
    console.log(`Server Running at ${port}`)
    })

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/authService';
//////connect to database

mongoose.connect(MONGODB_URI)
.then(()=> {
    console.log("Connected to database");

})
.catch((error) => {
    console.log("error connecting to database", error);
})

//////auth routes


const authRoutes = require('./routes/v1/authRoutes');

app.use('/auth/v1', authRoutes);

