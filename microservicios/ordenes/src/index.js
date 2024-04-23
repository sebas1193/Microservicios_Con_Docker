const express = require("express");
const app = express();
const morgan = require("morgan");

const ordenesController = require("./controllers/ordenesController");

app.use(morgan("dev"));
app.use(express.json());

app.use(ordenesController);

app.listen(3003, () => {
  console.log("Puerto 3003 ejecutando el microservicio Ordenes");
});