const express = require('express')
const app = express();
const morgan = require('morgan')

const usuariosController = require('./controllers/usuariosController');

app.use(morgan('dev'));
app.use(express.json());

app.use(usuariosController);

app.listen(3001, () => {
    console.log('Puerto 3001 ejecutando el microservicio Usuarios')
});