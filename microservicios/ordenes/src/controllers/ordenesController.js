const express = require("express");
const router = express.Router();
const axios = require("axios");

const ordenesModel = require("../models/ordenesModel");

router.get("/ordenes", async (req, res) => {
  var result;
  result = await ordenesModel.traerOrdenes();
  res.json(result);
});

router.get("/ordenes/:id", async (req, res) => {
  const id = req.params.id;
  var result;
  result = await ordenesModel.traerOrden(id);
  res.json(result);
});

router.post("/ordenes", async (req, res) => {
  const usuario = req.body.usuario;
  const items = req.body.items;
  console.log(items)

  // Verificamos si hay suficientes unidades de los productos para realizar la orden
  const disponibilidad = await verificarDisponibilidad(items);
  
  const totalCuenta = await calcularTotal(items);
  
  // Si no hay suficientes unidades de los productos, retornamos un error
  if (!disponibilidad) {
    return res.json({ error: "No hay disponibilidad de productos" });
  }
  
  // Si el total es 0 o negativo, retornamos un error
  if (totalCuenta <= 0) {
    return res.json({ error: "Invalid order total" });
  }


  // Creamos la orden
  const response = await axios.get(`http://usuarios:3001/usuarios/${usuario}`);
  console.log(response.data); // Imprime el array

  // Verificar si la respuesta es un array y tiene al menos un elemento
  if (Array.isArray(response.data) && response.data.length > 0) {
    const userData = response.data[0]; // Accede al primer elemento del array
    const name = userData.nombre;
    const email = userData.email;

    orden = {
      nombreCliente: name,
      emailCliente: email,
      totalCuenta: totalCuenta,
    };

    const ordenRes = await ordenesModel.crearOrden(orden);

    // Disminuimos la cantidad de unidades de los productos
    await actualizarInventario(items);
    
    return res.send("orden creada");
  } else {
    return res.json({ error: "Error al obtener los datos del usuario" });
  }
});


// Función para calcular el total de la orden
async function calcularTotal(items) {
  let ordenTotal = 0;
  for (const producto of items) {
    try {
      const response = await axios.get(
        `http://productos:3002/productos/${producto.id}`
      );
      ordenTotal += response.data.precio * producto.cantidad;
    } catch (error) {
      console.error(`Error al obtener el producto ${producto.id}: ${error}`);
    }
  }
  return ordenTotal;
}

// Función para verificar si hay suficientes unidades de los productos para realizar la orden
async function verificarDisponibilidad(items) {
  let disponibilidad = true;

  for (const producto of items) {
    const response = await axios.get(
      `http://productos:3002/productos/${producto.id}`
    );
    if (response.data.inventario < producto.cantidad) {
      disponibilidad = false;
      break;
    }
  }
  return disponibilidad;
}

// Función para disminuir la cantidad de unidades de los productos
async function actualizarInventario(items) {
  for (const producto of items) {
    const response = await axios.get(
      `http://productos:3002/productos/${producto.id}`
    );

    const inventarioActual = response.data.inventario;
    const inv = inventarioActual - producto.cantidad;

    await axios.put(`http://productos:3002/productos/${producto.id}`, {
      inventario: inv,
    });
  }
}

module.exports = router;
