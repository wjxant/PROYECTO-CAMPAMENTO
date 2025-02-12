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
      //comprobamos el contenido de txtarea
      document.getElementById('alergiasNew').onblur = comprobarInputAlergia;
      alergiatxt = "si"
    }
  } else if (seleccionado.value === "no") {
    espacio.innerHTML = ''; // Elimina el textarea si selecciona "No"
    mostrarError(errorAlergia); // Limpia el mensaje de error
    alergiatxt = "no";
  }
}
//funcion para comprobar el txtarea del alergia, en caso de vacio salta el error
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

//funcion para comprobar si hemos seleccionado el select del plan o no, en caso de si se le asigna el valor a id_plan
function comprobarPlan(){
  //sacamos el valor
  let valorSeleccionado = document.getElementById("planSelect").value;
  console.log("planSelect seleccionado: " +valorSeleccionado)
  //asignamos en el valor el valor seleccionado
  id_plan = valorSeleccionado;
  //comprobar el valor seleccionado
  if (valorSeleccionado == 0){
    //en caso es 0 se salte el error
    mostrarError(errorPlan, "Escoge un plan");
    document.getElementById('precioPlan').innerHTML = ``
    document.getElementById('infoPlan').innerHTML = ``
  } else {
    //en caso de otros, se borra el error
    mostrarError(errorPlan);
    FetchSacarInfoPlanBBDD(id_plan)
  }

}

// Funcion para sacar informacion del plan del bbdd
async function FetchSacarInfoPlanBBDD(id_plan) {
  console.log("Comprobación de plan en BBDD");

    let response = await fetch("../Server/GestionarInscripcion.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_planPatabuscarEnBBDD: id_plan }),
    });
    if (!response.ok) {
      throw new Error("Error al obtener datos del servidor.");
    }
    let data = await response.json();
    if (data.infoPlan) {
      document.getElementById("precioPlan").innerHTML = `Precio: ${data.infoPlan.precio}`;
      document.getElementById("infoPlan").innerHTML = `Definición: ${data.infoPlan.definicion}`;
    } else {
      document.getElementById("precioPlan").innerHTML = "";
      document.getElementById("infoPlan").innerHTML = "";
    }

}



//funcion para comprobar si el variable de id_plan es valido o no
function comprobarPlanExterno(){
  //ejecutamos el funcion para asegurar que se asigna un valor en el variable id_plan
  comprobarPlan()
  console.log("id_plan seleccionado: " +id_plan)  //imprime el nuevo id_plan, ya que se asigna el id_plan en el funcion de la linea anterior
  //comprobar el variable
  if (id_plan == 0 ||id_plan == -1){  //0 en caso si es "seleccione uno" y -1 es por el parametro(no ha seleccionado)
    mostrarError(errorPlan, "Escoge un plan");  //mostrar el error
  } else {
    mostrarError(errorPlan);  //quitar
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
    mostrarError(document.getElementById('errorEnviar'));
    event.preventDefault(); // Evita el envío del formulario

    //envia al servidor
    InsertsInscripcionNinoBBDD()


  } else {
    //mostrar error
    mostrarError(document.getElementById('errorEnviar'), "El formulario contiene errores");
    event.preventDefault(); // Evita el envío del formulario
  }
};



//id del padre
//--------------------------------------------------------------------------------//
let idPadre = 0;
//--------------------------------------------------------------------------------//
//CONEXION BBDD
//este fetch se ejecuta SIEMPRE
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
        plan.innerHTML='El administrador aun no ha creado los planes' //informamos que no hay ningun plan 
        document.getElementById('infoForm').innerHTML="El administrador aun no ha creado los planes"
        document.getElementById('enviar').disabled = true;  //desactivamos el boton
        document.getElementById('formularioInscripcion').classList.add('oculto');; // Esconde el elemento
      }else{
        document.getElementById('formularioInscripcion').classList.remove('oculto');; // aparecer el elemento
        document.getElementById('infoForm').innerHTML=''
        //en caso nos devuelve un array de tamaño distinto que 0
        document.getElementById('enviar').disabled = false; //habilitamos el boton 
        $arrayPlanes = data.infoPlan; //pasamos los el array enviado por php a un variable
        //lo mapeamos y ponemos planes en el selecr 
        plan.innerHTML = `<select name="planSelect" id="planSelect"> 
        <option value="0">---- Seleccione un Plan ----</option>
                ${$arrayPlanes.map(plan =>`
                    <option value="${plan['id_plan']}">${plan['fecha_inicio']} - ${plan['fecha_fin']}</option>
                        `)}
            </select> 
            `;

            //cuando perdemos el foco del select comprobamos si hemos seleccionado o no
            //por defecto es 0 si no lo selecionamos siempre es 0, y si es 0 se salta el error
            document.getElementById('planSelect').onblur = comprobarPlan;
            document.getElementById('planSelect').onchange = comprobarPlan;
      }

    }
})

function rellenarInput (input, valor){
  input.value = valor;  //escribir
  input.disabled = true; // Desactivar
}

//funcion para insert de datos
function InsertsInscripcionNinoBBDD(){

  let alergiaContenido = 'nada';
 let observacionesTXT = 'nada';
  console.log(`nombre: ${nombre_nino.value}`);
  console.log(`fecha: ${fecha_nacimiento.value}`);
  console.log(`id_plan: ${id_plan}`)
  console.log('hay contenido alergia?: ' +alergiatxt )
  if (alergiatxt == "si"){  //comprobamos si hay alergia o no 
  console.log(`alergia: ${document.getElementById('alergiasNew').value}`);
  alergiaContenido = document.getElementById('alergiasNew').value  //en caso de si se le asigna al variable
  console.log(`Hay contenido Alergia es: `+alergiaContenido )
  }

  console.log(`observaciones: ${observaciones.value}`)
  if (observaciones.value.trim() !== ""){
    observacionesTXT = observaciones.value;
  }


  //FETCH PARA EL INSCRIPCION DEL NIÑO
  fetch("../Server/GestionarInscripcion.php", {
    method: 'POST',
    headers: {
        'Content-type': 'application/json',
    },
    body: JSON.stringify({ 
      //envia datos al php
      nombre_nino: nombre_nino.value,
      nacimiento_nino: fecha_nacimiento.value,
      id_plan: id_plan,
      alergia: alergiaContenido,
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
      //en otros casos
      window.location.href = '../html/inscripcion/html/inscripcionFallada.html';  // Redirige a la URL proporcionada en el JSON

    }
})



}
document.getElementById('volver').addEventListener('click', ()=>{
  window.location.href = '../html/IndexPadre.html'; // Redirige al login cuando se hace clic en el botón
})
