<?php
//----------------------------------------------------------------------------------------//
// Iniciar sesión y configurar respuesta JSON
//----------------------------------------------------------------------------------------//
session_start();
require 'Conexion.php';

header('Content-Type: application/json');  // Indicamos que la respuesta es JSON para config AJAX

//----------------------------------------------------------------------------------------//
// Verificar que se envíen datos mediante método POST
//----------------------------------------------------------------------------------------//
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $password = $_POST["pswd"];

    //------------------------------------------------------------------------------------//
    // Validar que los campos no estén vacíos antes de hacer la consulta
    //------------------------------------------------------------------------------------//
    if (empty($email) || empty($password)) {
        echo json_encode(["error" => "Todos los campos son obligatorios."]);
        exit();
    }

    //------------------------------------------------------------------------------------//
    // Escapar los datos para evitar sql injection
    //------------------------------------------------------------------------------------//
    $email = $conn->real_escape_string($email);
    $password = $conn->real_escape_string($password);

    //------------------------------------------------------------------------------------//
    // Consultar en la tabla de TUTORES para verificar si es un padre
    //------------------------------------------------------------------------------------//
    $sql = "SELECT id_tutor FROM TUTORES WHERE email = '$email' AND contrasenia = '$password'";
    $result = $conn->query($sql);
    if ($result && $result->num_rows > 0) {
        $_SESSION["usuario"] = $email;
        $_SESSION["tipo"] = "TUTOR";
        $row = $result->fetch_assoc();  // Obtener la fila de datos
        $_SESSION["id"] = $row["id_tutor"]; // Guardar el id_tutor en la sesión
        $_SESSION["login"] = "OK";
        echo json_encode(["redirect" => "../html/IndexPadre.html"]);
        exit();
    }

    //------------------------------------------------------------------------------------//
    // Consultar en la tabla de MONITORES para verificar si es un monitor
    //------------------------------------------------------------------------------------//
    $sql = "SELECT id_monitor FROM MONITORES WHERE email = '$email' AND contrasenia = '$password'";
    $result = $conn->query($sql);
    if ($result && $result->num_rows > 0) {
        $_SESSION["usuario"] = $email;
        $_SESSION["tipo"] = "MONITOR";
        $row = $result->fetch_assoc();  // Obtener la fila de datos
        $_SESSION["id"] = $row["id_monitor"];   // Guardar el id_tutor en la sesión
        $_SESSION["login"] = "OK";
        echo json_encode(["redirect" => "../html/IndexMonitor.html"]);
        exit();
    }

    //------------------------------------------------------------------------------------//
    // Consultar en la tabla de ADMIN para verificar si es un administrador
    //------------------------------------------------------------------------------------//
    $sql = "SELECT id_admin FROM ADMIN WHERE email = '$email' AND contrasenia = '$password'";
    $result = $conn->query($sql);
    if ($result && $result->num_rows > 0) {
        $_SESSION["usuario"] = $email;
        $_SESSION["tipo"] = "ADMIN";
        $row = $result->fetch_assoc();  // Obtener la fila de datos
        $_SESSION["id"] = $row["id_admin"]; // Guardar el id_admin en la sesion 
        $_SESSION["login"] = "OK";
        echo json_encode(["redirect" => "../html/IndexAdmin.html"]);
        exit();
    }

    //------------------------------------------------------------------------------------//
    // Si no se encuentran coincidencias, enviar mensaje de error al cliente IMPORTANTE
    //------------------------------------------------------------------------------------//
    echo json_encode(["error" => "Credenciales incorrectas."]);
    exit();
} else {
    //------------------------------------------------------------------------------------//
    // Si el método no es POST, se deniega el acceso 
    //------------------------------------------------------------------------------------//
    echo json_encode(["error" => "Acceso denegado."]);
    exit();
}

//----------------------------------------------------------------------------------------//
// Opcional: Cerrar la conexión si ya no es necesaria DE MPMENTO NO
//----------------------------------------------------------------------------------------//
// $conn->close();
?>
