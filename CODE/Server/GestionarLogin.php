<?php
session_start();
require 'Conexion.php';  // Esto incluye el código de conexión y la creación de tablas/datos

// Verificar si se enviaron los datos del formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $password = $_POST["pswd"];

    if (empty($email) || empty($password)) {
        die("Error: Todos los campos son obligatorios.");
    }

    // Escapar los datos para prevenir SQL Injection
    $email = $conn->real_escape_string($email);
    $password = $conn->real_escape_string($password);
    
    // Consultar en la tabla TUTORES
    $sql = "SELECT id_tutor FROM TUTORES WHERE email = '$email' AND contrasenia = '$password'";
    $result = $conn->query($sql);
    if ($result && $result->num_rows > 0) {
        $_SESSION["usuario"] = $email;
        $_SESSION["tipo"] = "TUTOR";
        header("Location: ../html/IndexPadre.html");
        exit();
    }
    
    // Consultar en la tabla MONITORES
    $sql = "SELECT id_monitor FROM MONITORES WHERE email = '$email' AND contrasenia = '$password'";
    $result = $conn->query($sql);
    if ($result && $result->num_rows > 0) {
        $_SESSION["usuario"] = $email;
        $_SESSION["tipo"] = "MONITOR";
        header("Location: ../CODE/html/IndexMonitor.html");
        exit();
    }
    
    // Consultar en la tabla ADMIN
    $sql = "SELECT id_admin FROM ADMIN WHERE email = '$email' AND contrasenia = '$password'";
    $result = $conn->query($sql);
    if ($result && $result->num_rows > 0) {
        $_SESSION["usuario"] = $email;
        $_SESSION["tipo"] = "ADMIN";
        header("Location: ../CODE/html/IndexAdmin.html");
        exit();
    }
    
    // Si no coincide con ningún usuario, se muestra un error.
    echo "Error: Credenciales incorrectas.";
    exit();
} else {
    echo "Acceso denegado.";
    exit();
}

// Opcionalmente, puedes cerrar la conexión (si no se requiere más)
$conn->close();
?>
