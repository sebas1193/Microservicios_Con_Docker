const express = require('express')
const app = express();
const morgan = require('morgan')

const productosController = require('./controllers/productosController');

app.use(morgan('dev'));
app.use(express.json());

app.use(productosController);

app.listen(3002, () => {
    console.log('Puerto 3002 ejecutando el microservicio Productos')
});