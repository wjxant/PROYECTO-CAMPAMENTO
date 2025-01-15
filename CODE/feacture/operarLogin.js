const email = document.getElementById('email');
const contraseña = document.getElementById('contraseña');
//espacio de error
const errorEmail = document.getElementById('errorEmail');
const errorContraseña = document.getElementById('errorContraseña');
//booleano para bloquear el envio de formulario en caso si no pasa el validacion 
let emailCorrecto = false;
let contraseñaCorecto = false;
//escogemos ybien el formulario para el bloqueo 
const formularioLogin = document.getElementById('formularioLogin');

//funcion para comprobar email
function validarEmail (email){
    //en casi si pasa el calidacion 
    if (/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)){
        //transforma el valor de booleano
        emailCorrecto = true;
        //vacia el campo
        errorEmail.innerHTML = ``;
        return true;
    }else{
        //en caso si no pasa el validacion 
        emailCorrecto = false;
        //asigna valor en el espacio de error
        errorEmail.innerHTML = `
            <img src="../assets/icons/errorIcon.png" alt="error" id="errorIcon">
            Error de correo

        `;
        return false;
    }
};

//funcion que se valida la contraseña
function validarContraseña (contraseña){
    //en caso si pasa el validacion
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{4,})(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(contraseña)){
        //transforma el booleano 
        contraseñaCorecto = true;
        //vacia el campo de error
        errorContraseña.innerHTML = ``;
        return true;
    }else{
        //en caso si esta mal 
        contraseñaCorecto = false;
        //asigna valor en el espacio de error
        errorContraseña.innerHTML = `
            <img src="../assets/icons/errorIcon.png" alt="error" id="errorIcon">
            La contraseña no es valida
        `;
        return false;
    }
}

//vertificamos el email
email.onblur = function (){
    validarEmail(email.value)
}
//vertificamos la contraseña
contraseña.onblur = function (){
    validarContraseña(contraseña.value)
}

//comprobamos cuando damos el enviar el formulario
formularioLogin.addEventListener('submit', function(event){
    //en caso si uno de los campos estan mal, se bloquea el formulario
    if (emailCorrecto == false || contraseñaCorecto == false){
        event.preventDefault();
    }
})
