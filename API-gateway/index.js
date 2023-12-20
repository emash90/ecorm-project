const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');

const port = process.env.PORT || 5000;
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});

// Auth microservice
const authURL = "http://localhost:4000/auth/v1";

// Fetch responses from auth microservice
app.use('/auth/v1', async (req, res) => {
  const url = `${authURL}${req.url}`;
  const method = req.method;
  const data = req.body;
  
  try {
    const response = await fetchAuth(url, method, data);
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
