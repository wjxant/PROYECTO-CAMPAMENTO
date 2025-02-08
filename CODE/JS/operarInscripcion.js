//recogemos nombres en html 
const nombre = document.getElementById("nombre");
const correo = document.getElementById("correo");
const telefono = document.getElementById("telefono");
const dni = document.getElementById("DNI");
const nombre_nino = document.getElementById("nombre_nino");
const fecha_nacimiento = document.getElementById("fecha_nacimiento");
const alergia = document.getElementById("alergiaNew");
const observaciones = document.getElementById('observaciones');
const plan = document.getElementById('plan');


// Los divs donde se mostrarán los errores
const errornombre = document.getElementById("errornombre");
const errorcorreo = document.getElementById("errorcorreo");
const errortelefono = document.getElementById("errortelefono");
const errorDNI = document.getElementById("errorDNI");
const errornombre_nino = document.getElementById("errornombre_nino");
const errorfecha_nacimiento = document.getElementById("errorfecha_nacimiento");
const errorprograma = document.getElementById("errorprograma");
const errorAlergia = document.getElementById("errorAlergiaNew");
const errorPlan = document.getElementById('errorPlan');


//SACAMOS EL ID DEL PLAN
let id_plan= -1


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


let alergiatxt = 'no';  //variable pasa raber si tiene alergia o no
function comprobarAlergia() {
  let seleccionado = document.querySelector('input[name="alergiaNew"]:checked');
  if (!seleccionado) return; // No hacer nada si no hay un radio seleccionado
  let espacio = document.getElementById('espacioInputAlergiaNew');
  if (seleccionado.value === "si") {
    if (!document.getElementById('alergiasNew')) {
      espacio.innerHTML = `
        <textarea
            name="alergiasNew"
            id="alergiasNew"
            cols="30"
            rows="10"
        ></textarea>
      `;
      document.getElementById('alergiasNew').onblur = comprobarInputAlergia;
      alergiatxt = "si"
    }
  } else if (seleccionado.value === "no") {
    espacio.innerHTML = ''; // Elimina el textarea si selecciona "No"
    mostrarError(errorAlergia); // Limpia el mensaje de error
    alergiatxt = "no";
  }
}

function comprobarInputAlergia() {
  let inputAlergia = document.getElementById('alergiasNew');
  if (!inputAlergia) return; // No hacer nada si el textarea no existe
  let valorAlergia = inputAlergia.value.trim();
  if (valorAlergia === "") {
    mostrarError(errorAlergia, "Alergia no indicada");
  } else {
    mostrarError(errorAlergia);
  }
}

function comprobarPlan(){
  let valorSeleccionado = document.getElementById("planSelect").value;
  console.log("id_plan seleccionado: " +valorSeleccionado)
  id_plan = valorSeleccionado;
  if (valorSeleccionado == 0){
    mostrarError(errorPlan, "Escoge un plan");
  } else {
    mostrarError(errorPlan);
  }
  
}

function comprobarPlanExterno(){
  if (id_plan == 0 ||id_plan == -1){  //0 en caso si es "seleccione uno" y -1 es por el parametro(no ha seleccionado el nuevo)
    mostrarError(errorPlan, "Escoge un plan");
  } else {
    mostrarError(errorPlan);
  }
}

// Asignar evento "change" a los radios
document.querySelectorAll('input[name="alergiaNew"]').forEach(radio => {
  radio.addEventListener("change", comprobarAlergia);
});
nombre.onblur = comprobarNombre;
correo.onblur = comprobarCorreo;
telefono.onblur = comprobarTelefono;
dni.onblur = comprobarDni;
nombre_nino.onblur = comprobarNombreNino;
fecha_nacimiento.onblur = comprobarFechaNacimiento;



// Evento submit del formulario
//cogemos el formulario
const formulario = document.getElementById('formularioInscripcion');
//cuando hacemos el submit
formulario.onsubmit = function(event) {
  comprobarNombre();
  comprobarCorreo();
  comprobarTelefono();
  comprobarDni();
  comprobarNombreNino();
  comprobarFechaNacimiento();
  comprobarInputAlergia();
  comprobarPlanExterno();

  // Función para verificar errores
  function checkError(element) {
    return element && element.textContent.trim() === "";
  }

  if (
    checkError(errornombre) &&
    checkError(errorcorreo) &&
    checkError(errortelefono) &&
    checkError(errorDNI) &&
    checkError(errornombre_nino) &&
    checkError(errorfecha_nacimiento) &&
    checkError(errorAlergia) &&
    checkError(errorPlan)
  ) {
    // Formulario válido, permitir el envío
    //AQUI ES LO SIGUIENTE PASO
    event.preventDefault(); // Evita el envío del formulario

    enviarBBDD()


  } else {
    mostrarError(document.getElementById('errorEnviar'), "El formulario contiene errores");
    event.preventDefault(); // Evita el envío del formulario
  }
};



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

      //rellenamos los datos del padre con el funcion rellenarInput
      rellenarInput(nombre, data.infoPadre['nombre']);
      rellenarInput(correo, data.infoPadre['email']);
      rellenarInput(telefono, data.infoPadre['telefono']);
      rellenarInput(dni, data.infoPadre['dni']);



      //rellenar el div del plan 
      console.log('Plan:')
      console.log(data.infoPlan)
      //comprobar el contenido del array de plan devuelto por bbdd
      if (data.infoPlan.length === 0){
        plan.innerHTML='El administrador aun no ha creado los planes'
        document.getElementById('enviar').disabled = true;
      }else{
        document.getElementById('enviar').disabled = false;
        $arrayPlanes = data.infoPlan;
        plan.innerHTML = `<select name="planSelect" id="planSelect">
        <option value="0">---- Seleccione un Plan ----</option>
                ${$arrayPlanes.map(plan =>`
                    <option value="${plan['id_plan']}">${plan['fecha_inicio']} - ${plan['fecha_fin']}</option>
                        `)}
            </select> 
            `;

            //comprobar el valor
            document.getElementById('planSelect').onblur = comprobarPlan;
      }

    }
})

function rellenarInput (input, valor){
  input.value = valor;  //escribir
  input.disabled = true; // Desactivar
}


function enviarBBDD(){

  let alergia = 'nada';
 let observacionesTXT = 'nada';
  console.log(`nombre: ${nombre_nino.value}`);
  console.log(`fecha: ${fecha_nacimiento.value}`);
  console.log(`id_plan: ${id_plan}`)
  console.log(alergiatxt )
  if (alergiatxt == "si"){  //comprobamos si hay alergia o no 
  console.log(`alergia: ${document.getElementById('alergiasNew').value}`);
  alergia = document.getElementById('alergiasNew').value  //en caso de si se le asigna al variable
  }
  console.log(`observaciones: ${observaciones.value}`)
  if (observaciones.value.trim() == ""){
    observacionesTXT = "nada"
  }


  //FETCH
  fetch("../Server/GestionarInscripcion.php", {
    method: 'POST',
    headers: {
        'Content-type': 'application/json',
    },
    body: JSON.stringify({ 
      nombre_nino: nombre_nino.value,
      nacimiento_nino: fecha_nacimiento.value,
      id_plan: id_plan,
      alergia: alergiatxt,
      observaciones: observacionesTXT
      
    })
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
        //en caso de si tener error
        console.log('Error: ' + data.error);
    }else if (data.registrado){ //en caso si ha ejecutado
      window.location.href = data.registrado;  // Redirige a la URL proporcionada en el JSON
    }
    else if (data.noRegistrado){  //en caso de no ejecutado
      window.location.href = data.noRegistrado;  // Redirige a la URL proporcionada en el JSON
    }else{
      window.location.href = '../html/inscripcion/html/inscripcionFallada.html';  // Redirige a la URL proporcionada en el JSON

    }
})


}