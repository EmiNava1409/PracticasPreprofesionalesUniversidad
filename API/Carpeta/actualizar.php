<?php
require '../db.php';
require '../cors.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id_carpeta'], $data['nombre'], $data['id_sede'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Faltan campos requeridos']);
    exit;
}

$id_sub_carpeta = $data['id_sub_carpeta'] ?? null;

try {
    $stmt = $pdo->prepare("CALL actualizar_carpeta(:id_carpeta, :nombre, :id_sede, :id_sub_carpeta)");
    $stmt->bindParam(':id_carpeta', $data['id_carpeta'], PDO::PARAM_INT);
    $stmt->bindParam(':nombre', $data['nombre']);
    $stmt->bindParam(':id_sede', $data['id_sede']);
    $stmt->bindParam(':id_sub_carpeta', $id_sub_carpeta);
    $stmt->execute();

    echo json_encode(['mensaje' => 'Carpeta actualizada correctamente']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
