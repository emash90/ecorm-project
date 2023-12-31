const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT || 5000;
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});

let user_session_id;

// Auth microservice
const AUTH_SERVICE_HOST = process.env.AUTH_SERVICE_HOST || 'localhost';
const authURL = 'http://' + AUTH_SERVICE_HOST + ':4000'

// Fetch responses from auth microservice
app.use('/auth/v1', async (req, res) => {
  const url = `${authURL}` + '/auth/v1' + req.url;
  const method = req.method;
  const data = req.body;
  try {
    const response = await fetchAuth(url, method, data);
    console.log("response", response);
    res.status(response.status).send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

const fetchAuth = async (url, method, data) => {
  try {
    const response = await axios({
      url,
      method,
      data
    });
    user_session_id = response.data.session_id;
    return response;
  } catch (error) {
    console.error(error);
    // If there's an error, create a consistent response structure
    return {
      status: error.response ? error.response.status : 500,
      data: error.response ? error.response.data : 'Internal Server Error'
    };
  }
};


/////fetch response for product microservice

const PRODUCT_SERVICE_HOST = process.env.PRODUCT_SERVICE_HOST || 'localhost';
const productURL = 'http://' + PRODUCT_SERVICE_HOST + ':4001'

app.use('/product/v1', async (req, res) => {
  const url = `${productURL}` + '/product/v1' + req.url;
  const method = req.method;
  req.body.session_id = user_session_id;
  const data = req.body;
  console.log(`Request to ${url} with method ${method} and data ${JSON.stringify(data)}`);
  try {
    const response = await fetchProduct(url, method, data);
    res.status(response.status).send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
})

const fetchProduct = async (url, method, data) => {
  try {
    const response = await axios({
      url,
      method,
      data
    });
    return response;
  } catch (error) {
    console.error(error);
    // If there's an error, create a consistent response structure
    return {
      status: error.response ? error.response.status : 500,
      data: error.response ? error.response.data : 'Internal Server Error'
    };
  }
};