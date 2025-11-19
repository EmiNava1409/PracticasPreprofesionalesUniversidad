<?php
require '../db.php';
require '../cors.php';

// Obtenemos los datos enviados desde Angular
$data = json_decode(file_get_contents("php://input"), true);

// Verificamos que exista el ID del formato
if (!isset($data['formato_id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Falta el campo formato_id']);
    exit;
}

// Preparamos los campos que pueden actualizarse
$campos = [
    'activo_de_informacion', 'id_area', 'periodo_de_conservacion_anio', 
    'ubicacion_descripcion', 'tipo_documento', 'tipo_grupo', 'tamano', 
    'nombre_archivo', 'fecha_subida', 'tipo_etiqueta', 'id_carpeta', 
    'tipo_activo', 'confidencialidad', 'criticidad'
];

// Creamos un array para los valores que se van a bindear
$valores = [];
$asignaciones = [];
foreach ($campos as $campo) {
    // Si el campo no existe, lo ponemos como NULL
    $val = array_key_exists($campo, $data) ? $data[$campo] : null;
    $valores[$campo] = $val;
    $asignaciones[] = "$campo = :$campo";
}

// Preparamos la consulta UPDATE
$sql = "UPDATE formatos SET " . implode(', ', $asignaciones) . " WHERE formato_id = :formato_id";

try {
    $stmt = $pdo->prepare($sql);

    // Bind de todos los valores
    foreach ($valores as $campo => $valor) {
        // Determinamos el tipo de dato
        if (is_int($valor)) {
            $stmt->bindValue(":$campo", $valor, PDO::PARAM_INT);
        } elseif (is_bool($valor)) {
            $stmt->bindValue(":$campo", $valor, PDO::PARAM_BOOL);
        } else {
            $stmt->bindValue(":$campo", $valor, PDO::PARAM_STR);
        }
    }

    // Bind del ID
    $stmt->bindValue(':formato_id', $data['formato_id'], PDO::PARAM_INT);

    $stmt->execute();

    echo json_encode(['mensaje' => 'Formato actualizado correctamente']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al actualizar el formato: ' . $e->getMessage()]);
}
?>
