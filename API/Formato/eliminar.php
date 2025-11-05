<?php
require '../db.php';
require '../cors.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['formato_id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Falta el campo formato_id']);
    exit;
}

try {
    $stmt = $pdo->prepare("CALL eliminar_formato(:formato_id)");
    $stmt->bindParam(':formato_id', $data['formato_id'], PDO::PARAM_INT);
    $stmt->execute();

    echo json_encode(['mensaje' => 'Formato eliminado correctamente']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al eliminar el formato: ' . $e->getMessage()]);
}
?>
