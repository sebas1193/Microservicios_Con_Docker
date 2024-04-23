DROP TABLE IF EXISTS usuarios;
CREATE TABLE usuarios (
    nombre varchar(50),
    email varchar(50),
    usuario varchar(50),
    password varchar(50),
    PRIMARY KEY(usuario)
);

DROP TABLE IF EXISTS productos;
CREATE TABLE productos (
    id int(11) NOT NULL AUTO_INCREMENT,
    nombre varchar(50),
    precio decimal(10,2),
    inventario int(11),
    PRIMARY KEY(id)
);

DROP TABLE IF EXISTS ordenes;
CREATE TABLE ordenes (
    id int(11) NOT NULL AUTO_INCREMENT,
    nombreCliente varchar(50),
    emailCliente varchar(50),
    totalCuenta decimal(10,2),
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

INSERT INTO usuarios (nombre, email, usuario, password) VALUES ('Admin', 'admin@admin.com', 'admin', 'admin');
INSERT INTO usuarios (nombre, email, usuario, password) VALUES ('Usuario 1', 'user1@user.com', 'user1', '1234');
