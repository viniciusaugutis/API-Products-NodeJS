const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//Routes
const productCategoryRoute = require('./routes/productCategoryRouter');
app.use('/product_categories', productCategoryRoute);

const productRoute = require('./routes/productRouter');
app.use('/products', productRoute);

module.exports = app; 