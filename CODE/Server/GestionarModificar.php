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
if (!isset($_SESSION['idNino'])) {
    //en caso si no se recoge bien el id
    echo json_encode(['error' => 'No se encontró la sesión del usuario.']);
    exit();
}
// Obtener el contenido JSON de la solicitud POST
$data = json_decode(file_get_contents('php://input'), true);



 //CONSULTA PARA SACAR TODO LOS DATOS DEL NIÑO
 $queryInfoNino = $conn->prepare("SELECT * FROM ninos WHERE id_nino = ?");   //sacamos todo los informaciones del actividad, dependiendo del monitor y el plan, por que no va a ser el mismo actividades en los diferentes plan 
 $queryInfoNino->bind_param("i", $_SESSION['idNino'] );    //asignamos el valor de ?, es un i porque es un numero(integer)
 $queryInfoNino->execute();   //ejecutar en bbdd
 $result = $queryInfoNino->get_result();  //recoge el resultado de la consulta 
 // Comprobamos la respuesta de la consulta
 if ($result->num_rows > 0) {    //comprueba si hay resultado o no 
    $infoNino = $result->fetch_assoc();  //extraer los datos del primier fila ([nombre => padreEjemplo, wjdwedeu, sduewhud, sduhuwe]), en este caso en js no hace falta mapear, por que solo hay una fila de datos
} else {
    // echo json_encode(['error' => "No se encontraron datos para esta Hijo con el ID " . $id_nino]);
    // exit();
}
 //cerramos e query
 $queryInfoNino->close();


//INSERTS DE DATOS PARA NIÑO (MODIFICAR NIÑO)
if (isset($data['nombre_nino']) && isset($data['nacimiento_nino']) && isset($data['alergia']) && isset($data['observaciones'])) {
    if (empty($data['nombre_nino']) || empty($data['nacimiento_nino']) || empty($data['alergia']) || empty($data['observaciones'])) {
        echo json_encode(['error' => 'Faltan datos necesarios']);
        exit();
    }
    $queryModificacionNiño = $conn->prepare("UPDATE ninos SET nombre = ?, fecha_nacimiento = ?, alergias = ?, observaciones = ? WHERE id_nino = ?");
    $queryModificacionNiño->bind_param("ssssi", $data['nombre_nino'], $data['nacimiento_nino'], $data['alergia'], $data['observaciones'], $_SESSION['idNino']);
    if ($queryModificacionNiño->execute()) { //comprobamos la ejecucion
        
        if ($queryModificacionNiño->affected_rows > 0) { // Si se inserta al menos un registro
            echo json_encode(['registrado' => '../html/modificacion/html/modificacionExitosa.html']);
            $queryModificacionNiño->close();   
            exit();
        } else {
            echo json_encode(['noRegistrado' => '../html/modificacion/html/modificacionFallada.html']);
            $queryModificacionNiño->close();   
            exit();

        }
    } else {
        //en caso si no ha podido ejecutar
        echo json_encode(['error' => 'Error ejecutar Modificar de niño']);
        $queryModificacionNiño->close();   
        exit();
    }
    
    
}


echo json_encode([
    'login' => $login,
    'id_nino' => $_SESSION['idNino'],
    'infoNino' => $infoNino

]);