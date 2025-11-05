<?php
require '../db.php';
require '../cors.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['area_id'], $data['nombre'], $data['departamento'], $data['id_sede'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Faltan campos requeridos']);
    exit;
}

$id_sub_area = $data['id_sub_area'] ?? null;

try {
    $stmt = $pdo->prepare("CALL actualizar_area(:area_id, :nombre, :id_sub_area, :departamento, :id_sede)");
    $stmt->bindParam(':area_id', $data['area_id'], PDO::PARAM_INT);
    $stmt->bindParam(':nombre', $data['nombre']);
    $stmt->bindParam(':id_sub_area', $id_sub_area);
    $stmt->bindParam(':departamento', $data['departamento']);
    $stmt->bindParam(':id_sede', $data['id_sede']);
    $stmt->execute();

    echo json_encode(['mensaje' => 'Área actualizada correctamente']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
