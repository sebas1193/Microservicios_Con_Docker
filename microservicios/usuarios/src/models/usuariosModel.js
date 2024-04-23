const mysql = require('mysql2/promise');
const connection = mysql.createPool({
    host: 'db',
    user: 'root',
    password: 'password',
    database: 'almacen'
});

async function traerUsuarios() {
    const result = await connection.query('SELECT * FROM usuarios');
    return result[0];
}

async function traerUsuario(usuario) {
    const result = await connection.query('SELECT * FROM usuarios WHERE usuario = ? ', usuario);
    return result[0];
}

async function validarUsuario(usuario, password) {
    const result = await connection.query('SELECT * FROM usuarios WHERE usuario = ? AND password = ?', [usuario, password]);
    return result[0];
}

async function crearUsuario(nombre, email, usuario, password) {
    const result = await connection.query('INSERT INTO usuarios VALUES(?,?,?,?)', [nombre, email, usuario, password]);
    return result;
}

module.exports = {
    traerUsuario,
    traerUsuarios,
    validarUsuario,
    crearUsuario
};

