const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');




const port = process.env.PORT || 5000
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Server Running at ${port}`)
    })



/////auth microservice
 const authURL = "http://localhost:4000/auth/v1";

/////fetch responses from auth microservice

app.use('/auth/v1', async (req, res) => {
    const url = `${authURL}${req.url}`;
    const method = req.method;
    const data = req.body;
    const response = await fetchAuth(url, method, data);
    res.status(response.status).send(response.data);
})

const fetchAuth = async (url, method, data) => {
    try {
        const response = await axios({
            url,
            method,
            data
        })
        return response;
    } catch (error) {
        console.log(error);
    }
}



