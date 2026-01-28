
CREATE DATABASE plantilla_automatizada;

use plantilla_automatizada;

-- {{CREACION DE TABLAS}}

-- 1. Tabla Sede
CREATE TABLE Sede (
    id_sede INT AUTO_INCREMENT PRIMARY KEY,
    nombre_sede VARCHAR(100) NOT NULL,
    ciudad VARCHAR(100) NOT NULL
);

-- 2. Tabla Areas
CREATE TABLE Areas (
    area_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    id_sub_area INT DEFAULT NULL,
    departamento VARCHAR(100) NOT NULL,
    id_sede INT NOT NULL,
    FOREIGN KEY (id_sub_area) REFERENCES Areas(area_id),
    FOREIGN KEY (id_sede) REFERENCES Sede(id_sede)
);

-- 3. Tabla Carpeta
CREATE TABLE Carpeta (
    id_carpeta INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(80) NOT NULL,
    id_sede INT NOT NULL,
    id_sub_carpeta INT DEFAULT NULL,
    FOREIGN KEY (id_sede) REFERENCES Sede(id_sede),
    FOREIGN KEY (id_sub_carpeta) REFERENCES Carpeta(id_carpeta)
);



-- 4. Tabla Formato
CREATE TABLE Formato (
    formato_id INT AUTO_INCREMENT PRIMARY KEY,
    activo_de_informacion VARCHAR(150) NOT NULL,
    id_area INT NOT NULL,
    periodo_de_conservacion_anio INT NOT NULL,
    ubicacion_descripcion VARCHAR(200) NOT NULL,
    tipo_documento VARCHAR(20) NOT NULL,
    tipo_grupo VARCHAR(100) NOT NULL,
    tamano FLOAT NOT NULL,
    nombre_archivo VARCHAR(40) NOT NULL,
    fecha_subida DATE NOT NULL,
    tipo_etiqueta VARCHAR(15) NOT NULL,
    id_carpeta INT NOT NULL,
    tipo_activo VARCHAR(50) NOT NULL,
    confidencialidad BOOLEAN NOT NULL, 
    criticidad VARCHAR(30) NOT NULL,
    FOREIGN KEY (id_area) REFERENCES Areas(area_id),
    FOREIGN KEY (id_carpeta) REFERENCES Carpeta(id_carpeta)
);



-- {{INSERSION DE DATOS}}

-- 1. Insert Sede
INSERT INTO Sede (nombre_sede, ciudad)
VALUES
('Sede Norte', 'Quito'),
('Sede Sur', 'Guayaquil'),
('Sede Central', 'Cuenca');


-- 2. Insert Areas
INSERT INTO Areas (nombre, id_sub_area, departamento, id_sede)
 VALUES 
 ('Recursos Humanos', null, 'Administración', 1),
 ('Contabilidad', 1, 'Finanzas', 2),
 ('Sistemas', 1, 'Tecnología', 3);


-- 3. Insert Carpeta
INSERT INTO Carpeta (nombre, id_sede, id_sub_carpeta) 
VALUES 
('Documentos RH', 1, 1),
('Informes Financieros', 2, 1),
('Sistemas 2025', 3, 1);



-- 4. Insert Formato
INSERT INTO Formato (
    activo_de_informacion, id_area, periodo_de_conservacion_anio, ubicacion_descripcion,
    tipo_documento, tipo_grupo, tamano, nombre_archivo, fecha_subida,
    tipo_etiqueta, id_carpeta, tipo_activo, confidencialidad, criticidad
)
VALUES
 (
    'Contrato laboral 2024', 1, 5, 'Archivo Físico - Estantería 1',
    'PDF', 'Legal', 1.2, 'contrato.pdf', '2024-03-10',
    'RH', 1, 'Documento', TRUE, 'Alta'
),

(
    'Balance General 2023', 2, 10, 'Carpeta Digital - Servidor 2',
    'Excel', 'Financiero', 0.9, 'balance.xlsx', '2024-01-15',
    'Contabilidad', 2, 'Hoja de cálculo', FALSE, 'Media'
),
(
    'Manual de usuario software interno', 3, 3, 'Repositorio - GitLab',
    'DOCX', 'Técnico', 0.5, 'manual.docx', '2024-05-02',
    'Sistemas', 3, 'Documento digital', FALSE, 'Baja'
);





-- {{PROCEDIMIENTOS ALMACENADOS PARA CONSULTAR}}


-- 1. Listar tabla Sede
DELIMITER //
CREATE PROCEDURE listar_sedes()
BEGIN
    SELECT * FROM Sede;
END;
//
DELIMITER ;

-- 2. Consultar tabla Sede por id
DELIMITER //
CREATE PROCEDURE consultar_sedes_por_id(IN p_id_sede INT)
BEGIN
    SELECT
        id_sede,
        nombre_sede,
        ciudad
    FROM
        Sede
    WHERE
        id_sede = p_id_sede;
END 
//
DELIMITER ;



-- 3. Listar tabla Areas
DELIMITER //
CREATE PROCEDURE listar_areas()
BEGIN
    SELECT * FROM Areas;
END;
//
DELIMITER ;

-- 4.  Consultar Area por su ID
DELIMITER //
CREATE PROCEDURE consultar_area_por_id(IN p_area_id INT)
BEGIN
    SELECT
        area_id,
        nombre,
        id_sub_area,
        departamento,
        id_sede
    FROM
        Areas
    WHERE
        area_id = p_area_id;
END //

DELIMITER ;



-- 5. Listar tabla Carpeta
DELIMITER //
CREATE PROCEDURE listar_carpetas()
BEGIN
    SELECT * FROM Carpeta;
END;
//
DELIMITER ;




-- 6. Consultar Carpeta por su ID
DELIMITER //
CREATE PROCEDURE consultar_carpeta_por_id(IN p_id_carpeta INT)
BEGIN
    SELECT
        id_carpeta,
        nombre,
        id_sede,
        id_sub_carpeta
    FROM
        Carpeta
    WHERE
        id_carpeta = p_id_carpeta;
END 
//
DELIMITER ;




-- 7. Listar tabla Formato
DELIMITER //
CREATE PROCEDURE listar_formatos()
BEGIN
    SELECT * FROM Formato;
END;
//
DELIMITER ;


-- 8. Consultar formato por su ID
DELIMITER //
CREATE PROCEDURE consultar_formato_por_id(
    IN p_id_formato INT
)
BEGIN
    SELECT * FROM Formato
    WHERE formato_id = p_id_formato;
END;
//
DELIMITER ;


DROP PROCEDURE consultar_formato_por_id;




-- {{PROCEDIMIENTOS ALMACENADOS PARA INSERTAR DATOS}}

-- 1. De la tabla Sede
DELIMITER //
CREATE PROCEDURE insertar_sede(
    IN nombre VARCHAR(100),
    IN ciudad_nombre VARCHAR(100)
)
BEGIN
    INSERT INTO Sede(nombre_sede, ciudad)
    VALUES (nombre, ciudad_nombre);
END;
//
DELIMITER ;



-- 2. De la Tabla Formato

DELIMITER //
CREATE PROCEDURE insertar_formato(
    IN activo_info VARCHAR(150),
    IN id_area_val INT,
    IN periodo_anio INT,
    IN ubicacion_desc VARCHAR(200),
    IN tipo_doc VARCHAR(20),
    IN tipo_grupo_val VARCHAR(100),
    IN tamano_val FLOAT,
    IN nombre_archivo VARCHAR(40),
    IN fecha_subida_val DATE,
    IN tipo_etiqueta_val VARCHAR(15),
    IN id_carpeta_val INT,
    IN tipo_activo_val VARCHAR(50),
    IN confidencial BOOLEAN,
    IN criticidad_val VARCHAR(30)
)
BEGIN
    INSERT INTO Formato(
        activo_de_informacion,
        id_area,
        periodo_de_conservacion_anio,
        ubicacion_descripcion,
        tipo_documento,
        tipo_grupo,
        tamano,
        nombre_archivo,
        fecha_subida,
        tipo_etiqueta,
        id_carpeta,
        tipo_activo,
        confidencialidad,
        criticidad
    )
    VALUES (
        activo_info,
        id_area_val,
        periodo_anio,
        ubicacion_desc,
        tipo_doc,
        tipo_grupo_val,
        tamano_val,
        nombre_archivo,
        fecha_subida_val,
        tipo_etiqueta_val,
        id_carpeta_val,
        tipo_activo_val,
        confidencial,
        criticidad_val
    );
END;
//
DELIMITER ;




-- 3. De la Tabla Area

DELIMITER //
CREATE PROCEDURE insertar_area(
    IN nombre_area VARCHAR(100),
    IN sub_area_id INT,
    IN departamento_nombre VARCHAR(100),
    IN sede_id INT
)
BEGIN
    INSERT INTO Areas(nombre, id_sub_area, departamento, id_sede)
    VALUES (nombre_area, sub_area_id, departamento_nombre, sede_id);
END;
//
DELIMITER ;




-- 4. De la Tabla Carpeta

DELIMITER //
CREATE PROCEDURE insertar_carpeta(
    IN nombre_carpeta VARCHAR(80),
    IN sede_id INT,
    IN sub_carpeta_id INT
)
BEGIN
    INSERT INTO Carpeta(nombre, id_sede, id_sub_carpeta)
    VALUES (nombre_carpeta, sede_id, sub_carpeta_id);
END;
//
DELIMITER ;



-- {{PROCEDIMIENTOS ALMACENADOS PARA ACTUALIZAR DATOS}}

-- 1. De la Tabla Sede 

DELIMITER //
CREATE PROCEDURE actualizar_sede(
    IN id INT,
    IN nuevo_nombre VARCHAR(100),
    IN nueva_ciudad VARCHAR(100)
)
BEGIN
    UPDATE Sede
    SET nombre_sede = nuevo_nombre,
        ciudad = nueva_ciudad
    WHERE id_sede = id;
END;
//
DELIMITER ;




-- 2. De la Tabla Formato

DELIMITER //
CREATE PROCEDURE actualizar_formato(
    IN formato_id_val INT,
    IN activo_info VARCHAR(150),
    IN id_area_val INT,
    IN periodo_anio INT,
    IN ubicacion_desc VARCHAR(200),
    IN tipo_doc VARCHAR(20),
    IN tipo_grupo_val VARCHAR(100),
    IN tamano_val FLOAT,
    IN nombre_archivo_val VARCHAR(40),
    IN fecha_subida_val DATE,
    IN tipo_etiqueta_val VARCHAR(15),
    IN id_carpeta_val INT,
    IN tipo_activo_val VARCHAR(50),
    IN confidencial BOOLEAN,
    IN criticidad_val VARCHAR(30)
)
BEGIN
    UPDATE Formato
    SET activo_de_informacion = activo_info,
        id_area = id_area_val,
        periodo_de_conservacion_anio = periodo_anio,
        ubicacion_descripcion = ubicacion_desc,
        tipo_documento = tipo_doc,
        tipo_grupo = tipo_grupo_val,
        tamano = tamano_val,
        nombre_archivo = nombre_archivo_val,
        fecha_subida = fecha_subida_val,
        tipo_etiqueta = tipo_etiqueta_val,
        id_carpeta = id_carpeta_val,
        tipo_activo = tipo_activo_val,
        confidencialidad = confidencial,
        criticidad = criticidad_val
    WHERE formato_id = formato_id_val;
END;
//
DELIMITER ;



-- 3. De la Tabla Areas

DELIMITER //
CREATE PROCEDURE actualizar_area(
    IN area_id_val INT,
    IN nuevo_nombre VARCHAR(100),
    IN nuevo_subarea INT,
    IN nuevo_departamento VARCHAR(100),
    IN nueva_sede INT
)
BEGIN
    UPDATE Areas
    SET nombre = nuevo_nombre,
        id_sub_area = nuevo_subarea,
        departamento = nuevo_departamento,
        id_sede = nueva_sede
    WHERE area_id = area_id_val;
END;
//
DELIMITER ;



-- 4. De la Tabla Carpeta 

DELIMITER //
CREATE PROCEDURE actualizar_carpeta(
    IN carpeta_id_val INT,
    IN nuevo_nombre VARCHAR(80),
    IN nueva_sede INT,
    IN nuevo_sub_carpeta INT
)
BEGIN
    UPDATE Carpeta
    SET nombre = nuevo_nombre,
        id_sede = nueva_sede,
        id_sub_carpeta = nuevo_sub_carpeta
    WHERE id_carpeta = carpeta_id_val;
END;
//
DELIMITER ;



-- {{PROCEDIMIENTOS ALMACENADOS PARA ELIMINAR DATOS}}

-- 1. De la Tabla Sede

DELIMITER //
CREATE PROCEDURE eliminar_sede(IN id INT)
BEGIN
    DELETE FROM Sede WHERE id_sede = id;
END;
//
DELIMITER ;



-- 2. De la Tabla Formato

DELIMITER //
CREATE PROCEDURE eliminar_formato(IN id INT)
BEGIN
    DELETE FROM Formato WHERE formato_id = id;
END;
//
DELIMITER ;



-- 3. De la Tabla Areas 

DELIMITER //
CREATE PROCEDURE eliminar_area(IN id INT)
BEGIN
    DELETE FROM Areas WHERE area_id = id;
END;
//
DELIMITER ;



-- 4. De la Tabla Carpeta 

DELIMITER //
CREATE PROCEDURE eliminar_carpeta(IN id INT)
BEGIN
    DELETE FROM Carpeta WHERE id_carpeta = id;
END;
//
DELIMITER ;
