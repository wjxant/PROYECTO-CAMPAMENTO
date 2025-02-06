<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Campamento";

//----------------------------------------------------------------------------------------//
// Crear la conexión
//----------------------------------------------------------------------------------------//
$conn = new mysqli($servername, $username, $password);

//----------------------------------------------------------------------------------------//
// Verificar la conexión
//----------------------------------------------------------------------------------------//
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//----------------------------------------------------------------------------------------//
// Crear la Base de datos si no existe
//----------------------------------------------------------------------------------------//
$sql = "CREATE DATABASE IF NOT EXISTS $dbname";
if ($conn->query($sql) === TRUE) {
    echo "Base de datos creada con éxito<br>";
} else {
    echo "Error al crear la base de datos: " . $conn->error . "<br>";
}

//----------------------------------------------------------------------------------------//
// Seleccionar la base de datos a utilizar.
$conn->select_db($dbname);

//----------------------------------------------------------------------------------------//
// Creación de tablas e inserción de datos
//----------------------------------------------------------------------------------------//
$sql_tables = "
    CREATE TABLE IF NOT EXISTS TUTORES (
        id_tutor INT PRIMARY KEY AUTO_INCREMENT, 
        nombre VARCHAR(50) NOT NULL,
        dni VARCHAR(9) NOT NULL,
        telefono VARCHAR(9) NOT NULL,
        email VARCHAR(50) NOT NULL UNIQUE,
        contrasenia VARCHAR(20) NOT NULL
    );

    INSERT IGNORE INTO TUTORES (id_tutor, nombre, dni, telefono, email, contrasenia) VALUES 
    (1, 'Padre Ejemplo', '12345678A', '123456789', 'padre@ejemplo.com', '1234567');

    CREATE TABLE IF NOT EXISTS NINOS (
        id_nino INT PRIMARY KEY AUTO_INCREMENT, 
        nombre VARCHAR(50) NOT NULL,
        alergias TEXT,
        observaciones TEXT,
        fecha_nacimiento DATE NOT NULL,
        id_tutor INT NOT NULL,
        FOREIGN KEY (id_tutor) REFERENCES TUTORES(id_tutor)
    );

    CREATE TABLE IF NOT EXISTS MONITORES (
        id_monitor INT PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL UNIQUE,
        contrasenia VARCHAR(20) NOT NULL
    );

    INSERT IGNORE INTO MONITORES (id_monitor, nombre, email, contrasenia) VALUES 
    (1, 'Monitor Ejemplo', 'monitor@ejemplo.com', '1234567');

    CREATE TABLE IF NOT EXISTS GRUPOS (
        id_grupo INT PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(50) NOT NULL,
        id_monitor INT NOT NULL,
        id_nino INT NOT NULL,
        FOREIGN KEY (id_monitor) REFERENCES MONITORES(id_monitor),
        FOREIGN KEY (id_nino) REFERENCES NINOS(id_nino)
    );

    CREATE TABLE IF NOT EXISTS ACTIVIDADES (
        id_actividad INT PRIMARY KEY AUTO_INCREMENT,
        titulo VARCHAR(50) NOT NULL,
        descripcion TEXT,
        hora TIME NOT NULL,
        id_monitor INT NOT NULL,
        FOREIGN KEY (id_monitor) REFERENCES MONITORES(id_monitor)
    );

    CREATE TABLE IF NOT EXISTS ADMIN (
        id_admin INT PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(50) NOT NULL UNIQUE,
        contrasenia VARCHAR(20) NOT NULL
    );

    INSERT IGNORE INTO ADMIN (id_admin, email, contrasenia) VALUES 
    (1, 'admin@ejemplo.com', 'admin1234');
";

//----------------------------------------------------------------------------------------//
// Ejecutar la creación de las tablas e inserción de datos
//----------------------------------------------------------------------------------------//
if ($conn->multi_query($sql_tables) === TRUE) {
    echo "Tablas creadas e inicializadas con éxito.<br>";
} else {
    echo "Error al crear tablas o insertar datos: " . $conn->error . "<br>";
}

//----------------------------------------------------------------------------------------//
// Cerrar la conexión
//----------------------------------------------------------------------------------------//
$conn->close();
?>
