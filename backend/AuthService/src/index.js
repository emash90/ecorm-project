const express = require('express');
const app = express();
const cors = require('cors');

const port = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const userRoutes = require('../src/user-framework/express/routes/userRoutes');

app.use('/auth/v1', userRoutes);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})