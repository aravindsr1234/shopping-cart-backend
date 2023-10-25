var express = require('express');
const connectDb = require('./server/database/connection');

// environment variable
require('dotenv').config();

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// connect mongodb
connectDb();

app.use('/', require('./server/routes/categoryRouter'));
app.use('/user', require('./server/routes/userRouter'));
app.use('/admin', require('./server/routes/adminRouter'));
app.use('/cart', require('./server/routes/cartRouter'));
app.use('/product', require('./server/routes/productRouter'));
app.use('/order', require('./server/routes/orderRouter'));

app.use(express.static("uploads"));  

const port = process.env.port || 8080;

app.listen(`${port}`, () => {
    console.log(`Server is running on ${port}`);
});