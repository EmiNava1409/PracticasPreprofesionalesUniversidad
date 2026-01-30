<?php
header('Content-Type: application/json; charset=utf-8');
require '../db.php';
require '../cors.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['area_id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Falta el área_id']);
    exit;
}

try {
    $stmt = $pdo->prepare("CALL eliminar_area(:area_id)");
    $stmt->bindParam(':area_id', $data['area_id'], PDO::PARAM_INT);
    $stmt->execute();

    echo json_encode(['mensaje' => 'Área eliminada correctamente']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
