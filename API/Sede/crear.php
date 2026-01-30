<?php
header('Content-Type: application/json; charset=utf-8');
require '../cors.php';
require '../db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['nombre_sede'], $data['ciudad'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Faltan datos: nombre de sede y ciudad son obligatorios']);
    exit;
}

try {
    $stmt = $pdo->prepare("CALL insertar_sede(:nombre, :ciudad)");
    $stmt->bindParam(':nombre', $data['nombre_sede']);
    $stmt->bindParam(':ciudad', $data['ciudad']);
    $stmt->execute();

    echo json_encode(['mensaje' => 'Sede creada exitosamente']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
