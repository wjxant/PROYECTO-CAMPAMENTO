<?php
// servidor enviará estará en formato JSON
header('Content-Type: application/json');
require_once 'conexion.php';
// comprobacion de conexion
if ($conn->connect_error) {
    echo json_encode(['error' => 'Error de conexión a la base de datos']);
    exit();
}

session_start(); // Reanuda/recuperar la sesión que teníamos creada

$login = "no";
//comprobar si ha logueado o no 
if (!isset($_SESSION["login"])){
    echo json_encode(['noLogin' => '../html/noLogeado.html']);
    exit();
}else{
    $login= "ok";
}

//comprobamos si recoge el id
if (!isset($_SESSION['id'])) {
    //en caso si no se recoge bien el id
    echo json_encode(['error' => 'No se encontró la sesión del usuario.']);
    exit();
}
// Obtener el contenido JSON de la solicitud POST
$data = json_decode(file_get_contents('php://input'), true);






echo json_encode([
    'login' => $login,
    'id_Padre' => $_SESSION['id']

]);