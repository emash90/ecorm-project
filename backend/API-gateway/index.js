const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});


// Function to handle microservice requests
const handleMicroserviceRequest = async (serviceName, req, res) => {
  const serviceHost = process.env[`${serviceName}_SERVICE_HOST`] || 'localhost';
  const serviceURL = `http://${serviceHost}:${process.env[`${serviceName}_SERVICE_PORT`] || 4000}`;
  let url;
  switch (serviceName) {
    case 'AUTH':
      url = `${serviceURL}/auth/v1${req.url}`;
      break;
    case 'PRODUCT':
      url = `${serviceURL}/product/v1${req.url}`;
      break;
    case 'CART':
      url = `${serviceURL}/cart/v1${req.url}`;
      break;
    case 'ORDER':
      url = `${serviceURL}/orders/v1${req.url}`;
      break;
    default:
      break;
  }
  const method = req.method;
  const data = req.body;
  console.log(`Request to ${url} with method ${method} and data ${JSON.stringify(data)}`);

  try {
    const response = await axios({ url, method, data });
    res.status(response.status).send(response.data);
  } catch (error) {
    console.error(error);
    res.status(error.response ? error.response.status : 500).send(error.response ? error.response.data : 'Internal Server Error');
  }
};

// Auth microservice
app.use('/auth/v1', async (req, res) => {
  await handleMicroserviceRequest('AUTH', req, res);
});

// Product microservice
app.use('/product/v1', async (req, res) => {
  await handleMicroserviceRequest('PRODUCT', req, res);
});

// Cart microservice
app.use('/cart/v1', async (req, res) => {
  await handleMicroserviceRequest('CART', req, res);
});

// Order microservice
app.use('/orders/v1', async (req, res) => {
  await handleMicroserviceRequest('ORDER', req, res);
});
