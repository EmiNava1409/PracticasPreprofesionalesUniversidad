<?php
header('Content-Type: application/json; charset=utf-8');
require '../db.php';
require '../cors.php';

if (!isset($_GET['area_id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Falta el parámetro area_id']);
    exit;
}

$area_id = intval($_GET['area_id']);

try {
    $stmt = $pdo->prepare("CALL consultar_area_por_id(:area_id)");
    $stmt->bindParam(':area_id', $area_id, PDO::PARAM_INT);
    $stmt->execute();
    $area = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (empty($area)) {
        http_response_code(404);
        echo json_encode(['mensaje' => 'No se encontró el área con ese ID']);
    } else {
        echo json_encode($area);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
