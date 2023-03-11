CREATE DATABASE images_crud;

USE images_crud;

CREATE TABLE imagenes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    imagen LONGBLOB NOT NULL
);