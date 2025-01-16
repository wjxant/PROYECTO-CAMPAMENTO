//COMPROBACION DE ENTRADA
function mostrarError(campo, mensaje) {
  // Limpiar mensaje de error previo
  var error = campo.nextElementSibling;
  if (error && error.className === "error") {
    error.parentNode.removeChild(error);
  }

  // Mostrar nuevo mensaje de error si existe
  if (mensaje) {
    var error = document.createElement("span");
    error.className = "error";
    error.style.color = "red";
    error.innerHTML = `<img src="../assets/icons/errorIcon.png" alt="error" id="errorIcon"> ${mensaje}`;
    campo.parentNode.insertBefore(error, campo.nextSibling);
  }
}
document.addEventListener("DOMContentLoaded", function () {
  var nombre = document.getElementById("nombre");
  var apellido = document.getElementById("apellido");
  var direccion = document.getElementById("direccion");
  var ciudad = document.getElementById("ciudad");
  var provincia = document.getElementById("provincia");
  var codigo_postal = document.getElementById("codigo_postal");
  var pais = document.getElementById("pais");
  var correo = document.getElementById("correo");
  var telefono = document.getElementById("telefono");
  var dni = document.getElementById("DNI");
  var nombre_nino = document.getElementById("nombre_nino");
  var apellido_nino = document.getElementById("apellido_nino");
  var dni_nino = document.getElementById("DNI_nino");
  var fecha_nacimiento = document.getElementById("fecha_nacimiento");
  var programa = document.getElementById('programa1');
  var seguro = document.getElementById('seguro_si');


  nombre.onblur = function () {
    if (nombre.value == "") {
      mostrarError(nombre, "El nombre es obligatorio");
    } else {
      mostrarError(nombre, "");
    }
  };
  apellido.onblur = function () {
    if (apellido.value == "") {
      mostrarError(apellido, "El apellido es obligatorio");
    } else {
      mostrarError(apellido, "");
    }
  };
  direccion.onblur = function () {
    if (direccion.value == "") {
      mostrarError(direccion, "La dirección es obligatoria");
    } else {
      mostrarError(direccion, "");
    }
  };
  ciudad.onblur = function () {
    if (ciudad.value == "") {
      mostrarError(ciudad, "La ciudad es obligatoria");
    } else {
      mostrarError(ciudad, "");
    }
  };
  provincia.onblur = function () {
    if (provincia.value == "") {
      mostrarError(provincia, "La provincia es obligatoria");
    } else {
      mostrarError(provincia, "");
    }
  };
  codigo_postal.onblur = function () {
    if (codigo_postal.value == "") {
      mostrarError(codigo_postal, "El código postal es obligatorio");
    } else {
      mostrarError(codigo_postal, "");
    }
  };
  pais.onblur = function () {
    if (pais.value == "") {
      mostrarError(pais, "El país es obligatorio");
    } else {
      mostrarError(pais, "");
    }
  };
  correo.onblur = function () {
    var regexCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (correo.value == "" || !regexCorreo.test(correo.value)) {
      mostrarError(correo, "Por favor, ingrese un correo electrónico válido");
    } else {
      mostrarError(correo, "");
    }
  };
  telefono.onblur = function () {
    var regexTelefono = /^[0-9]{9}$/;
    if (telefono.value == "" || !regexTelefono.test(telefono.value)) {
      mostrarError(telefono, "Por favor, ingrese un número de teléfono válido");
    } else {
      mostrarError(telefono, "");
    }
  };
  dni.onblur = function () {
    var regexDNI = /^[0-9]{8}[A-Z]$/;
    if (dni.value == "" || !regexDNI.test(dni.value)) {
      mostrarError(dni, "Por favor, ingrese un DNI válido");
    } else {
      mostrarError(dni, "");
    }
  };
  nombre_nino.onblur = function () {
    if (nombre_nino.value == "") {
      mostrarError(nombre_nino, "El nombre del niño es obligatorio");
    } else {
      mostrarError(nombre_nino, "");
    }
  };
  apellido_nino.onblur = function () {
    if (apellido_nino.value == "") {
      mostrarError(apellido_nino, "El apellido del niño es obligatorio");
    } else {
      mostrarError(apellido_nino, "");
    }
  };
  dni_nino.onblur = function () {
    var regexDNI = /^[0-9]{8}[A-Z]$/;
    if (dni_nino.value == "" || !regexDNI.test(dni_nino.value)) {
      mostrarError(dni_nino, "Por favor, ingrese un DNI del niño válido");
    } else {
      mostrarError(dni_nino, "");
    }
  };
  fecha_nacimiento.onblur = function () {
    if (fecha_nacimiento.value == "") {
      mostrarError(fecha_nacimiento, "La fecha de nacimiento es obligatoria");
    } else {
      mostrarError(fecha_nacimiento, "");
    }
  };

  //VERTIFICAMOS CUANDO PRESIONAMOS EL ENVIAR
  document.getElementById("enviar").addEventListener("click", function () {
    // Validar campos requeridos
    if (nombre.value === '') mostrarError(nombre, 'El nombre es obligatorio') ;
    if (apellido.value === '') mostrarError(apellido, 'El apellido es obligatorio');
    if (direccion.value === '') mostrarError(direccion, 'La dirección es obligatoria');
    if (ciudad.value === '') mostrarError(ciudad, 'La ciudad es obligatoria');
    if (provincia.value === '') mostrarError(provincia, 'La provincia es obligatoria');
    if (codigo_postal.value === '') mostrarError(codigo_postal, 'El código postal es obligatorio');
    if (pais.value === '') mostrarError(pais, 'El país es obligatorio');
    if (correo.value === '') mostrarError(correo, 'El correo es obligatorio');
    if (telefono.value === '') mostrarError(telefono, 'El teléfono es obligatorio');
    if (dni.value === '') mostrarError(dni, 'El DNI es obligatorio');
    if (nombre_nino.value === '') mostrarError(nombre_nino, 'El nombre del niño es obligatorio');
    if (apellido_nino.value === '') mostrarError(apellido_nino, 'El apellido del niño es obligatorio');
    if (dni_nino.value === '') mostrarError(dni_nino, 'El DNI del niño es obligatorio');
    if (fecha_nacimiento.value === '') mostrarError(fecha_nacimiento, 'La fecha de nacimiento es obligatoria');
    if (programas.value === '') mostrarError(programa, 'Debe seleccionar al menos un programa');
    if (seguro.value === '') mostrarError(seguro, 'Debe seleccionar una opción de seguro de cancelación');

  });
});

function validarFormulario() {
  var valido = true;

  // Obtener todos los campos del formulario
  var campos = document.querySelectorAll(
    'input[type="text"], input[type="email"], input[type="date"], textarea'
  );

  campos.forEach(function (campo) {
    if (
      campo.nextElementSibling &&
      campo.nextElementSibling.className === "error"
    ) {
      valido = false;
    }
  });

  var programas = document.querySelectorAll('input[name="programa"]:checked');
  var seguro = document.querySelector('input[name="seguro"]:checked');

  if (programas.length === 0) {
    mostrarError(
      document.getElementById("programa1"),
      "Debe seleccionar al menos un programa"
    );
    valido = false;
  }
  if (seguro === null) {
    mostrarError(
      document.getElementById("seguro_si"),
      "Debe seleccionar una opción de seguro de cancelación"
    );
    valido = false;
  }
  return valido;
}
