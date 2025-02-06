const nombrePadre = document.getElementById('nombrePadres');
const idPadre = document.getElementById('idPadre');
const emailPadres = document.getElementById('emailPadres');
const selectHijo = document.getElementById('selectHijo');
const tablaPadresv= document.getElementById('tablaPadres');
const nombreHijo = document.getElementById('nombreHijo');
const edadHijo = document.getElementById('edadHijo');
const alergia = document.getElementById('alergiaHijo');
const grupoHijo = document.getElementById('grupoHijo');
const profesorHijo = document.getElementById('profesorHijo');

//conexion con php
fetch("../Server/GestionarIndexPadre.php", {
    method: 'POST',
    headers: {
        'Content-type': 'application/json',
    },
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
        alert('Error: ' + data.error);
    }else{
        //en caso de no
        //AQUI SE REVIBE LOS RESPUESTAS DEL SERVIDOR
        idPadre.innerHTML='ID: '+data.id_Padre;
        nombrePadre.innerHTML=data.infoPadre['nombre'];
        emailPadres.innerHTML=data.infoPadre['email'];

        let hijoSeleccionado = 0;

        console.log(data.infoHijos)
        //JS para el select del hijo
        if (data.infoHijos.length ===0){    // Comprueba si infoHijo es null o undefined (en caso si cae a esta condicion significa no hay hijo)
            selectHijo.innerHTML="Aun no tienes ningun hijos matriculado";
            document.getElementById('hijodiv').classList.add('oculto');; // Esconde el elemento
            document.getElementById('tablaPadres').classList.add('oculto');; // Esconde el elemento

        }else if(data.infoHijos.length ===1){
            document.getElementById('hijodiv').classList.remove('oculto'); //  Para mostrarlo de nuevo
            document.getElementById('tablaPadres').classList.remove('oculto'); // Para mostrarlo de nuevo
            hijoSeleccionado = data.infoHijos[0]['id_nino'] //hay que decir en posicion 0 porque recordamos que infoHijos es un array de objeto, y si es un solo hijo, estara en posicion 0
            console.log(hijoSeleccionado);
            selectHijo.innerHTML = data.infoHijos[0]['nombre']

        }else{

            $arrayHijos = data.infoHijos;
            document.getElementById('hijodiv').classList.remove('oculto'); //  Para mostrarlo de nuevo
            document.getElementById('tablaPadres').classList.remove('oculto'); // Para mostrarlo de nuevo
            selectHijo.innerHTML = `<select name="hijoSelect" id="hijoSelect">
                ${$arrayHijos.map(hijo =>`
                         <option value="${hijo['id_nino']}}">${hijo['nombre']}</option>
                        `)}
            </select> 
            `;

            // Asignar el primer niño seleccionado automáticamente
            hijoSeleccionado = $arrayHijos[0].id_nino;

            // Capturar el evento 'change' cuando el usuario selecciona un niño
            document.getElementById('hijoSelect').addEventListener('change', function () {
                // Obtener el id_nino seleccionado
                hijoSeleccionado = this.value;  //se coge el valor del seleccionado, porque he asignado el id a su valor
                console.log('ID del niño seleccionado:'+ hijoSeleccionado);
                //despues del cambiar (change) se muestra otra vez el dato, cambiando el id
                if (hijoSeleccionado!=0){
                    mostarDatosNino(hijoSeleccionado)
                }
               
            });
        }
        console.log("id hijo seleccionado:" +hijoSeleccionado)
        //se muestra dato una vez cargado
        if (hijoSeleccionado!=0){
            mostarDatosNino(hijoSeleccionado)
       }
    }

    //funcion para mostrar datos del niño
    function mostarDatosNino (id_nino){
        console.log(`Buscando datos para niño id: ${id_nino}`)
        fetch("../Server/GestionarIndexPadre.php", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ id_nino: id_nino})
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
            }else{
                console.log("Datos del hijo: ",data.datoHijo)
                nombreHijo.innerHTML = data.datoHijo['nombre'];
                edadHijo.innerHTML = calcularEdad(data.datoHijo['fecha_nacimiento'])
                alergia.innerHTML = data.datoHijo['alergias']

                //metodo para calcular la edad 
                function calcularEdad(fechaNacimiento) {
                    const hoy = new Date();
                    console.log("hoy: " +hoy);
                    const nacimiento = new Date(fechaNacimiento);
                    console.log("nacimiento: " +nacimiento)
                    let edad = hoy.getFullYear() - nacimiento.getFullYear();
                    return edad;
                    
                }
                //nombre del grupo
                if (data.nombreGrupo.length>0){
                    grupoHijo.innerHTML = data.nombreGrupo;
                }else{
                    grupoHijo.innerHTML = "Aun no se ha asignado el grupo"
                }
                //mostrar monitor
                if (data.profesorHijo.length>0){
                    profesorHijo.innerHTML = data.profesorHijo;
                }else{
                    profesorHijo.innerHTML = "Aun no se ha asignado el profesor"
                }

                //mostrar la tabla de actividades
                console.log(`id del monitor del grupo ${data.profesorHij} es: ${data.idProfesorHijo}`)
                //Recogemos los datos de actividades
                console.log(`Actividades con el monito ${data.idProfesorHijo} es: ${data.actividades}`);
                console.log(data.actividades) 
                // Accedemos a la tabla
                const tabla = document.getElementById('tablaActividad').getElementsByTagName('tbody')[0];
                //borramos el contenido anterior
                tabla.innerHTML="";
                //comprobamos si hay actividad o no 
                if (data.actividades.length>0){
                    data.actividades.forEach(actividad =>{
                        // Crea una nueva fila
                        const nuevaFila = tabla.insertRow();
                        // crea la primera celda
                        const celda1 = nuevaFila.insertCell();
                        //introdycudini informacion 
                        celda1.innerHTML = `${actividad.titulo}`;

                        // Crea la segnda celda
                        const celda2 = nuevaFila.insertCell();
                        //introducimos indormacion en la celda
                        celda2.innerHTML = `${actividad.hora} - ${actividad.hora_fin}`;

                        // Crea la tercera celda
                        const celda3 = nuevaFila.insertCell();
                        //introducimos indormacion en la celda
                        celda3.innerHTML = `${actividad.descripcion}`;

                        // Crea la cuarta celda
                        const celda4 = nuevaFila.insertCell();
                        //introducimos indormacion en la celda
                        celda4.innerHTML = `${actividad.dia}`;
                    })
                }else{
                    //en caso si no hay actividad
                    document.getElementById('infoTabla').innerHTML = "No tiene ninguna actividad programada";
                }


            }



        })

    }



})