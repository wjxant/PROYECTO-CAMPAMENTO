//recogemos nombres en html 
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const correo = document.getElementById("correo");
const telefono = document.getElementById("telefono");
const dni = document.getElementById("DNI");
const nombre_nino = document.getElementById("nombre_nino");
const apellido_nino = document.getElementById("apellido_nino");
const dni_nino = document.getElementById("DNI_nino");
const fecha_nacimiento = document.getElementById("fecha_nacimiento");
const seguro = document.getElementById("seguro_si");


// Los divs donde se mostrarán los errores
const errornombre = document.getElementById("errornombre");
const errorapellido = document.getElementById("errorapellido");
const errorcorreo = document.getElementById("errorcorreo");
const errortelefono = document.getElementById("errortelefono");
const errorDNI = document.getElementById("errorDNI");
const errornombre_nino = document.getElementById("errornombre_nino");
const errorapellido_nino = document.getElementById("errorapellido_nino");
const errorDNI_nino = document.getElementById("errorDNI_nino");
const errorfecha_nacimiento = document.getElementById("errorfecha_nacimiento");
const errorprograma = document.getElementById("errorprograma");
const errorseguro = document.getElementById("errorseguro");

//funcion para mostrar el eror
function mostrarError(lugar, mensaje) {
  // Si el mensaje no está vacío, mostrar el error
  if (mensaje) {
    lugar.innerHTML = `
      <img src="../assets/icons/errorIcon.png" alt="error" id="errorIcon">
      ${mensaje}`;
    lugar.style.color = "red"; // Añadir estilo de color rojo para el mensaje de error
    //en caso si no hemos puesto el error
  } else {
    // Limpiar el contenido del lugar si no hay mensaje de error
    lugar.innerHTML = "";
  }
}


function comprobarNombre (){
  if (nombre.value == "") {
    mostrarError(errornombre, "El nombre no puede estar vacío");
  } else {
    mostrarError(errornombre, "");
  }
}
function comprobarApellido() {
  if (apellido.value == "") {
    mostrarError(errorapellido, "El apellido no puede estar vacío");
  } else {
    mostrarError(errorapellido, "");
  }
}
function comprobarCorreo() {
  if (correo.value == "") {
    mostrarError(errorcorreo, "El correo no puede estar vacío");
  } else {
    mostrarError(errorcorreo, "");
    if (/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(correo.value)){
      mostrarError(errorcorreo, "");
    } else {
      mostrarError(errorcorreo, "Error de formato de Correo, tiene que contener un @");
    }
  }
}
function comprobarTelefono() {
  if (telefono.value == "") {
    mostrarError(errortelefono, "El teléfono no puede estar vacío");
  } else {
    mostrarError(errortelefono, "");
    if (/^[0-9]{9}$/.test(telefono.value)){
      mostrarError(errortelefono, "");
    } else {
      mostrarError(errortelefono, "El teléfono tiene que ser de 9 digitos de número");
    }
  }
}
function comprobarDni() {
  if (dni.value == "") {
    mostrarError(errorDNI, "El DNI no puede estar vacío");
  } else {
    mostrarError(errorDNI, "");
    if (/^[XxYyZz]?\d{8}[A-Za-z]$/.test(dni.value)){
      mostrarError(errorDNI, "");
    } else {
      mostrarError(errorDNI, "Error de formato, tiene que contener 8 dígitos de número o letra y una letra al final");
    }
  }
}
function comprobarNombreNino() {
  if (nombre_nino.value == "") {
    mostrarError(errornombre_nino, "El nombre del niño no puede estar vacío");
  } else {
    mostrarError(errornombre_nino, "");
  }
}
function comprobarApellidoNino() {
  if (apellido_nino.value == "") {
    mostrarError(errorapellido_nino, "El apellido del niño no puede estar vacío");
  } else {
    mostrarError(errorapellido_nino, "");
  }
}
function comprobarDniNino() {
  if (dni_nino.value == "") {
    mostrarError(errorDNI_nino, "El DNI del niño no puede estar vacío");
  } else {
    mostrarError(errorDNI_nino, "");
    if (/^[XxYyZz]?\d{8}[A-Za-z]$/.test(dni_nino.value)){
      mostrarError(errorDNI_nino, "");
    } else {
      mostrarError(errorDNI_nino, "Error de formato, tiene que contener 8 dígitos de número o letra y una letra al final");
    }
  }
}
function comprobarFechaNacimiento() {
  const fechaIngresada = new Date(fecha_nacimiento.value);  // Convertimos la fecha ingresada a un objeto Date
  const fechaActual = new Date();  // Obtenemos la fecha y hora actual
  if (fecha_nacimiento.value == "") {
    mostrarError(errorfecha_nacimiento, "La fecha de nacimiento no puede estar vacía");
  } else {
    mostrarError(errorfecha_nacimiento, "");
    if (fechaIngresada > fechaActual){
      mostrarError(errorfecha_nacimiento, "La fecha no puede ser futura");
    } else {
      mostrarError(errorfecha_nacimiento, "");
    }
  }
}

// Asignar el evento onblur a cada campo
nombre.onblur = comprobarNombre;
apellido.onblur = comprobarApellido;
correo.onblur = comprobarCorreo;
telefono.onblur = comprobarTelefono;
dni.onblur = comprobarDni;
nombre_nino.onblur = comprobarNombreNino;
apellido_nino.onblur = comprobarApellidoNino;
dni_nino.onblur = comprobarDniNino;
fecha_nacimiento.onblur = comprobarFechaNacimiento;

//cando presiomos el boton 
const formulario = document.getElementById('formularioInscripcion');
// Asigna un evento submit
formulario.onsubmit = function(event) {
  comprobarNombre();
  comprobarApellido();
  comprobarCorreo();
  comprobarTelefono();
  comprobarDni();
  comprobarNombreNino();
  comprobarApellidoNino();
  comprobarDniNino();
  comprobarFechaNacimiento();
  

// Función para comprobar si los elementos de error están vacíos
  function checkError(element) {
    return element && element.textContent.trim() === "";
  }

  // Comprobamos todos los errores
  //en caso si hay algun error, saltaria el alert y bloquearia el envio
  if (
    checkError(errornombre) &&
    checkError(errorapellido) &&
    checkError(errorcorreo) &&
    checkError(errortelefono) &&
    checkError(errorDNI) &&
    checkError(errornombre_nino) &&
    checkError(errorapellido_nino) &&
    checkError(errorDNI_nino) &&
    checkError(errorfecha_nacimiento) &&
    checkError(errorseguro)
  ) {
    // Si todos los errores están vacíos
    //AQUI DE DEJA EL PASO SOGUIENTE
  }else{
    alert('El formulario contiene errores');
    event.preventDefault(); // Evita el envío del formulario

  }
}
//id del padre
//--------------------------------------------------------------------------------//
let idPadre = 0;
//--------------------------------------------------------------------------------//
//CONEXION BBDD
fetch("../Server/GestionarInscripcion.php", {
    method: 'POST',
    headers: {
        'Content-type': 'application/json',
    },
    // body: JSON.stringify({ inscribirse: "ok"})
})
.then(response => {
    if (!response.ok) {
        throw new Error('Error al obtener datos del servidor.');
    }
    return response.json();
})
.then(data => {
    //comprobar si es un error o no
    if (data.error) {
        //en caso de si
        console.log('Error: ' + data.error);
    } else if (data.noLogin){
      window.location.href = data.noLogin;  // Redirige a la URL proporcionada en el JSON
    }else {
      console.log(`Login: ${data.login}`);  //comprobar el login
      console.log(`El id del padre es: ${data.id_Padre}`) //recogemos el dato
      idPadre = data.id_Padre;  //asignamos al varible
    }
})