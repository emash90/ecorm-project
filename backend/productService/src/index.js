const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

const PORT = process.env.PRODUCT_SERVICE_PORT || 5002;

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT} testing jenkins pipeline`);
});

const productRoutes = require('./product-framework/express/routes/productRoutes');

app.use('/api/v1/product', productRoutes);