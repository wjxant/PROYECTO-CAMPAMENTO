CREATE DATABASE IF NOT EXISTS 'CAMPAMENTO'

    CREATE TABLE IF NOT EXISTS 'TUTORES' (
        id_tutor INT PRIMARY KEY AUTO_INCREMENT, 
        nombre VARCHAR(50) NOT NULL,
        dni VARCHAR(9) NOT NULL,
        telefono VARCHAR(9) NOT NULL, 
        email VARCHAR(50) NOT NULL,
        contrasenia VARCHAR(50) NOT NULL,
    ); 
        
    CREATE TABLE IF NOT EXISTS 'NINOS' (
        id_nino INT PRIMARY KEY AUTO_INCREMENT, 
        nombre VARCHAR(50) NOT NULL,
        alergias VARCHAR(),
        observacion VARCHAR(),
        fecha_nacimiento DATE NOT NULL
        id_tutor INT NOT NULL,
        FOREIGN KEY (id_tutor) REFERENCES TUTORES(id_tutor)
    );
    
    CREATE TABLE IF NOT EXISTS 'MONITORES' (
        id_monitores INT PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(50) NOT NULL,
        correo VARCHAR(50) NOT NULL,
        contrasenia VARCHAR(50) NOT NULL,
    );
    CREATE TABLE IF NOT EXISTS 'GRUPOS'(
        id_grupo INT PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(50) NOT NULL,
        FOREIGN KEY (id_monitor) REFERENCES MONITORES(id_monitor),
        FOREIGN KEY (id_nino) REFERENCES NINOS(id_nino)
    );
    CREATE TABLE IF NOT EXISTS 'ACTIVIDADES'(
        id_actividad INT PRIMARY KEY AUTO_INCREMENT,
        titulo VARCHAR(50) NOT NULL,
        descripcion VARCHAR(),
        hora TIME NOT NULL,
        FOREIGN KEY (id_grupo) REFERENCES GRUPOS(id_grupo)
    );
    CREATE TABLE IF NOT EXISTS 'ADMIN'(
        id_admin INT PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(50) NOT NULL,
        contrasenia VARCHAR(50) NOT NULL,
    );
    
        