//-----------------------------------------------------------------------------------------------------------//
//                                               INICIO DE JS DE NAVBAR
//-----------------------------------------------------------------------------------------------------------//

// Función para abrir la ventana overlay
document.getElementById('btnCerrarSesion').addEventListener('click', () => {
    document.getElementById("overlay").classList.add("activeOverlay"); // Añadir clase para mostrar el overlay
});

// Acción para cerrar el overlay
document.getElementById('cerrarOverlayCerrarSesion').addEventListener('click', cerrarOverlayCerrarSesion); // Evento para cerrar el overlay
document.getElementById('volverOverlayCerrarSesion').addEventListener('click', cerrarOverlayCerrarSesion); // Evento para volver y cerrar el overlay

// Función para quitar el overlay
function cerrarOverlayCerrarSesion() {
    document.getElementById("overlay").classList.remove("activeOverlay"); // Quitar clase para ocultar el overlay
}

// Acción del botón de cerrar sesión
document.getElementById('cerrarSesionOverlayCerrarSesion').addEventListener('click', cerrarSesionSeguro); // Evento para cerrar sesión

// Función para cerrar sesión y redireccionar
function cerrarSesionSeguro() {
    fetch("../Server/quitarSesion.php", { // Conexión con el servidor para quitar la sesión
        method: 'POST', // Método de la solicitud
        headers: {
            'Content-type': 'application/json', // Tipo de contenido de la solicitud
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener datos del servidor.'); // Manejo de error si la respuesta no es OK
        }
        return response.json(); // Convertir la respuesta a JSON
    })
    .then(data => {
        if (data.logout) {
            window.location.href = data.logout; // Redirigir a la URL proporcionada para logout
        }
    });
}

// Cuando se presiona el botón de modificar perfil
document.getElementById('btnModificarDatosPadre').addEventListener('click', () => {
    window.location.href = "../html/ModificarPadre.html"; // Redirigir a la página de modificación de perfil
});

// Cuando se presiona el botón de notificaciones
document.getElementById('btnNotificaciones').addEventListener('click', () => {
    window.location.href = "../html/NotificacionesPadre.html"; // Redirigir a la página de notificaciones
});

// Cuando se presiona el botón de monitor
document.getElementById('btnMonitor').addEventListener('click', () => {
    window.location.href = "../html/infoMonitorPadre.html"; // Redirigir a la página de información del monitor
});

// Cuando se presiona el botón de contactos
document.getElementById('btnContacto').addEventListener('click', () => {
    window.location.href = "../html/infoContactoPadre.html"; // Redirigir a la página de contactos
});

// Cuando se presiona el botón de política
document.getElementById('btnPolitica').addEventListener('click', () => {
    window.location.href = "../html/politicas.html"; // Redirigir a la página de políticas
});

// Cuando se presiona el botón de comedor
document.getElementById('btnComedor').addEventListener('click', () => {
    window.location.href = "../html/comedor.html"; // Redirigir a la página de comedor
});

// Cuando se presiona el botón de calendario
document.getElementById('btnCalendario').addEventListener('click', () => {
    window.location.href = "../html/calendarioPadre.html"; // Redirigir a la página de calendario
});

// Cuando se presiona el botón de actividades
document.getElementById('btnInfoActividades').addEventListener('click', () => {
    window.location.href = "../html/infoActividades.html"; // Redirigir a la página de actividades
});

//-----------------------------------------------------------------------------------------------------------//
//                                           FIN DE JS DE NAVBAR
//-----------------------------------------------------------------------------------------------------------//
