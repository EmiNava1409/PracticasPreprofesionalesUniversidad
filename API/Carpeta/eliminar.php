<?php
header('Content-Type: application/json; charset=utf-8');
require '../db.php';
require '../cors.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id_carpeta'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Falta el id_carpeta']);
    exit;
}

try {
    $stmt = $pdo->prepare("CALL eliminar_carpeta(:id_carpeta)");
    $stmt->bindParam(':id_carpeta', $data['id_carpeta'], PDO::PARAM_INT);
    $stmt->execute();

    echo json_encode(['mensaje' => 'Carpeta eliminada correctamente']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
