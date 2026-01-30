<?php
header('Content-Type: application/json; charset=utf-8');
require '../db.php';
require '../cors.php';

if (!isset($_GET['formato_id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Falta el parámetro formato_id']);
    exit;
}

$formato_id = intval($_GET['formato_id']);

try {
    $stmt = $pdo->prepare("CALL consultar_formato_por_id(:formato_id)");
    $stmt->bindParam(':formato_id', $formato_id, PDO::PARAM_INT);
    $stmt->execute();
    $formato = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (empty($formato)) {
        http_response_code(404);
        echo json_encode(['mensaje' => 'No se encontró el formato con ese ID']);
    } else {
        echo json_encode($formato);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
