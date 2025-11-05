<?php
require '../db.php';
require '../cors.php';

$data = json_decode(file_get_contents("php://input"), true);

$campos = ['activo_de_informacion', 'id_area', 'periodo_de_conservacion_anio', 'ubicacion_descripcion', 'tipo_documento',
'tipo_grupo', 'tamano', 'nombre_archivo', 'fecha_subida', 'tipo_etiqueta', 'id_carpeta', 'tipo_activo', 'confidencialidad', 'criticidad'];

foreach ($campos as $campo) {
    if (!isset($data[$campo])) {
        http_response_code(400);
        echo json_encode(['error' => "Falta el campo requerido: $campo"]);
        exit;
    }
}

try {
    $stmt = $pdo->prepare("CALL insertar_formato(
        :activo, :id_area, :periodo, :ubicacion, :tipo_doc, :grupo, :tamano,
        :nombre_archivo, :fecha_subida, :etiqueta, :id_carpeta, :tipo_activo, :confidencial, :criticidad)");

    $stmt->bindParam(':activo', $data['activo_de_informacion']);
    $stmt->bindParam(':id_area', $data['id_area'], PDO::PARAM_INT);
    $stmt->bindParam(':periodo', $data['periodo_de_conservacion_anio'], PDO::PARAM_INT);
    $stmt->bindParam(':ubicacion', $data['ubicacion_descripcion']);
    $stmt->bindParam(':tipo_doc', $data['tipo_documento']);
    $stmt->bindParam(':grupo', $data['tipo_grupo']);
    $stmt->bindParam(':tamano', $data['tamano']);
    $stmt->bindParam(':nombre_archivo', $data['nombre_archivo']);
    $stmt->bindParam(':fecha_subida', $data['fecha_subida']);
    $stmt->bindParam(':etiqueta', $data['tipo_etiqueta']);
    $stmt->bindParam(':id_carpeta', $data['id_carpeta'], PDO::PARAM_INT);
    $stmt->bindParam(':tipo_activo', $data['tipo_activo']);
    $stmt->bindParam(':confidencial', $data['confidencialidad'], PDO::PARAM_BOOL);
    $stmt->bindParam(':criticidad', $data['criticidad']);

    $stmt->execute();

    echo json_encode(['mensaje' => 'Formato creado correctamente']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al crear el formato: ' . $e->getMessage()]);
}
?>
