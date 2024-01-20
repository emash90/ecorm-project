const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const axios = require('axios');

const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_DB, MONGODB_PORT, MONGO_HOST } = require('./config/config.js');

const MONGODB_URI = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGODB_PORT}/${MONGO_DB}?authSource=admin`;
console.log("MONGODB_URI", MONGODB_URI);

app.listen(port, () => {
    console.log(`Server Running at ${port}`);
});

const connect_with_retry = () => {
    return mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('MongoDB Connected'))
        .catch(err => {
            console.log(err);
            console.log('Retrying in 5 seconds');
            setTimeout(connect_with_retry, 5000);
        });
}

connect_with_retry();

const productRoutes = require('./routes/v1/productRoutes');

app.use('/product/v1', productRoutes);
