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
  const serviceURL = `http://${serviceHost}:${process.env[`${serviceName}_SERVICE_PORT`] || 
    (serviceName === 'AUTH' ? 5001 : serviceName === 'PRODUCT' ? 5002 : serviceName === 'ORDER' ? 5003 : 5004)}`;
  let url;
  switch (serviceName) {
    case 'AUTH':
      url = `${serviceURL}/api/v1/auth${req.url}`;
      break;
    case 'PRODUCT':
      url = `${serviceURL}/api/v1/product${req.url}`;
      break;
    case 'CART':
      url = `${serviceURL}/api/v1/cart${req.url}`;
      break;
    case 'ORDER':
      url = `${serviceURL}/api/v1/order${req.url}`;
      break;
    default:
      break;
  }
  const method = req.method;
  const data = req.body;
  console.log(`Request to ${url} with method ${method} and data ${JSON.stringify(data)}`);

  try {
    const response = await axios({ url, method, data });
    // console.log("response", response.data)
    res.status(response.status).send(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json(error.response ? error.response.data : { message: 'Internal server error' });
  }
};

// Auth microservice
app.use('/api/v1/auth', async (req, res) => {
  await handleMicroserviceRequest('AUTH', req, res);
});

// Product microservice
app.use('/api/v1/product', async (req, res) => {
  await handleMicroserviceRequest('PRODUCT', req, res);
});

// Cart microservice
app.use('/api/v1/cart', async (req, res) => {
  await handleMicroserviceRequest('CART', req, res);
});

// Order microservice
app.use('/api/v1/order', async (req, res) => {
  await handleMicroserviceRequest('ORDER', req, res);
});
