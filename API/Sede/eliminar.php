<?php
header('Content-Type: application/json; charset=utf-8');
require '../db.php';
require '../cors.php';


$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id_sede'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Falta el ID de la sede']);
    exit;
}

$id = intval($data['id_sede']);

try {
    $stmt = $pdo->prepare("CALL eliminar_sede(:id)");
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    echo json_encode(['mensaje' => 'Sede eliminada correctamente']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
