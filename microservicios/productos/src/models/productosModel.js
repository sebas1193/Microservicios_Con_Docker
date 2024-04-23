const mysql = require('mysql2/promise');
const connection = mysql.createPool({
    host: 'db',
    user: 'root',
    password: 'password',
    database: 'almacen'
});

async function traerProductos() {
    const result = await connection.query('SELECT * FROM productos');
    return result[0];
}

async function traerProducto(id) {
    const result = await connection.query('SELECT * FROM productos WHERE id = ?', id);
    return result[0];
}

async function actualizarProducto(id, inventario) {
    const result = await connection.query('UPDATE productos SET inventario = ? WHERE id = ?', [inventario, id]);
    return result;    
}

async function crearProducto(nombre, precio, inventario) {
    const result = await connection.query('INSERT INTO productos VALUES(null,?,?,?)', [nombre, precio, inventario]);
    return result;
}

module.exports = {
    traerProducto,
    traerProductos,
    actualizarProducto,
    crearProducto
}