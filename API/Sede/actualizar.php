<?php
header('Content-Type: application/json; charset=utf-8');
require '../db.php';
require '../cors.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id_sede'], $data['nombre_sede'], $data['ciudad'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Faltan datos: id_sede, nombre sede y ciudad son obligatorios']);
    exit;
}

try {
    $stmt = $pdo->prepare("CALL actualizar_sede(:id, :nombre, :ciudad)");
    $stmt->bindParam(':id', $data['id_sede'], PDO::PARAM_INT);
    $stmt->bindParam(':nombre', $data['nombre_sede']);
    $stmt->bindParam(':ciudad', $data['ciudad']);
    $stmt->execute();

    echo json_encode(['mensaje' => 'Sede actualizada correctamente']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
