<?php


$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Campamento";

//----------------------------------------------------------------------------------------//
// Crear la conexión
//----------------------------------------------------------------------------------------//

$conn = new mysqli($servername, $username, $password, $dbname);

//----------------------------------------------------------------------------------------//


//----------------------------------------------------------------------------------------//
// Verificar la conexión
//----------------------------------------------------------------------------------------//

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
//----------------------------------------------------------------------------------------//


//----------------------------------------------------------------------------------------//
// Creamos una nueva tabla si no existe
//----------------------------------------------------------------------------------------//

$sql = "CREATE TABLE IF NOT EXISTS  (

)";

//----------------------------------------------------------------------------------------//

