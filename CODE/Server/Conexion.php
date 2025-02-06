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
// Seleccionar la base de datos
//----------------------------------------------------------------------------------------//
$conn->select_db($dbname);

//----------------------------------------------------------------------------------------//
// Creación de tablas
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
";

// Ejecutar la creación de tablas
if ($conn->multi_query($sql_tables)) {
    echo "Tablas creadas con éxito.<br>";
} else {
    echo "Error al crear las tablas: " . $conn->error . "<br>";
}

// Esperar a que terminen todas las consultas anteriores.
while ($conn->more_results() && $conn->next_result()) {}

//----------------------------------------------------------------------------------------//
// Insertar datos de prueba si no existen
//----------------------------------------------------------------------------------------//

// Verificar si ya existen registros antes de insertar
$check_tutor = "SELECT COUNT(*) as count FROM TUTORES WHERE email = 'padre@ejemplo.com'";
$check_monitor = "SELECT COUNT(*) as count FROM MONITORES WHERE email = 'monitor@ejemplo.com'";
$check_admin = "SELECT COUNT(*) as count FROM ADMIN WHERE email = 'admin@ejemplo.com'";

// Comprobar e insertar tutor
$result = $conn->query($check_tutor);
$row = $result->fetch_assoc();
if ($row['count'] == 0) {
    $sql_insert_tutor = "INSERT INTO TUTORES (nombre, dni, telefono, email, contrasenia) 
                         VALUES ('Padre Ejemplo', '12345678A', '123456789', 'padre@ejemplo.com', '1234567')";
    if ($conn->query($sql_insert_tutor) === TRUE) {
        echo "Tutor insertado correctamente.<br>";
    } else {
        echo "Error insertando tutor: " . $conn->error . "<br>";
    }
}

// Comprobar e insertar monitor
$result = $conn->query($check_monitor);
$row = $result->fetch_assoc();
if ($row['count'] == 0) {
    $sql_insert_monitor = "INSERT INTO MONITORES (nombre, email, contrasenia) 
                           VALUES ('Monitor Ejemplo', 'monitor@ejemplo.com', '1234567')";
    if ($conn->query($sql_insert_monitor) === TRUE) {
        echo "Monitor insertado correctamente.<br>";
    } else {
        echo "Error insertando monitor: " . $conn->error . "<br>";
    }
}

// Comprobar e insertar admin
$result = $conn->query($check_admin);
$row = $result->fetch_assoc();
if ($row['count'] == 0) {
    $sql_insert_admin = "INSERT INTO ADMIN (email, contrasenia) 
                         VALUES ('admin@ejemplo.com', 'admin1234')";
    if ($conn->query($sql_insert_admin) === TRUE) {
        echo "Admin insertado correctamente.<br>";
    } else {
        echo "Error insertando admin: " . $conn->error . "<br>";
    }
}

//----------------------------------------------------------------------------------------//
// Cerrar la conexión
//----------------------------------------------------------------------------------------//
$conn->close();
?>
