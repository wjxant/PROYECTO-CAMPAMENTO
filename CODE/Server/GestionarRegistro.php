<?php
//----------------------------------------------------------------------------------------//
// Iniciar el buffer de salida para limpiar cualquier salida previa
//----------------------------------------------------------------------------------------//
ob_start();

//----------------------------------------------------------------------------------------//
// Iniciar sesión y configurar la respuesta JSON
//----------------------------------------------------------------------------------------//
session_start();
require 'Conexion.php';

//----------------------------------------------------------------------------------------//
// Limpiar la salida generada por Conexion.php (si hay) para enviar solo JSON
//----------------------------------------------------------------------------------------//
ob_clean();

header('Content-Type: application/json');  // Indicamos que la respuesta es JSON para AJAX

//----------------------------------------------------------------------------------------//
// Verificar que se envíen datos mediante método POST
//----------------------------------------------------------------------------------------//
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    //------------------------------------------------------------------------------------//
    // Recuperar los datos enviados por el método POST
    //------------------------------------------------------------------------------------//
    $email = $_POST["email"];
    $password = $_POST["pswd"];

    //------------------------------------------------------------------------------------//
    // Validar que los campos no estén vacíos
    //------------------------------------------------------------------------------------//
    if (empty($email) || empty($password)) {
        echo json_encode(["error" => "Todos los campos son obligatorios."]);
        exit();
    }
    //------------------------------------------------------------------------------------//

    //------------------------------------------------------------------------------------//
    // Escapar los datos para evitar SQL Injection
    //------------------------------------------------------------------------------------//
    $email = $conn->real_escape_string($email);
    $password = $conn->real_escape_string($password);
    //------------------------------------------------------------------------------------//

    //------------------------------------------------------------------------------------//
    // Hashear la contraseña
    //------------------------------------------------------------------------------------//
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    //------------------------------------------------------------------------------------//

    //------------------------------------------------------------------------------------//
    // Consultar si el email ya está registrado en la base de datos
    //------------------------------------------------------------------------------------//
    $check_email = "SELECT * FROM TUTORES WHERE email = '$email'";
    $result = $conn->query($check_email);
    $row = $result->fetch_assoc();
    if ($row) {
        echo json_encode(["error" => "El email ya está registrado."]);
        exit();
    }
    //------------------------------------------------------------------------------------//

    //------------------------------------------------------------------------------------//
    // Insertar el nuevo TUTOR en la base de datos (solo se insertan email y contraseña)
    // Los demás campos se insertan como cadena vacía (o NULL, según la definición de la tabla)
    //------------------------------------------------------------------------------------//
    $sql_insert_tutor = "INSERT INTO TUTORES (nombre, dni, telefono, email, contrasenia) 
                         VALUES ('', '', '', '$email', '$hashedPassword')";
    if ($conn->query($sql_insert_tutor) === TRUE) {
         // Registrar el usuario en la sesión y redirigir
        $_SESSION["usuario"] = $email;
        $_SESSION["tipo"] = "TUTOR";
        $_SESSION["id"] = $conn->insert_id;  // Obtener el id del nuevo tutor 
        $_SESSION["login"] = "OK";
        echo json_encode(["redirect" => "../html/IndexPadre.html"]);
        exit();
    } else {
        echo json_encode(["error" => "Error al registrar el tutor."]);
        exit();
    }
} else {
    echo json_encode(["error" => "No se enviaron datos vía POST."]);
    exit();
}

//----------------------------------------------------------------------------------------//
// Cerrar la conexión (no es necesario cerrarla ahora)
//----------------------------------------------------------------------------------------//
// $conn->close();
?>
