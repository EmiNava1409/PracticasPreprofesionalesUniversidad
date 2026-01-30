<?php
header('Content-Type: application/json; charset=utf-8');
require '../db.php';
require '../cors.php';

if (!isset($_GET['id_carpeta'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Falta el parámetro id_carpeta']);
    exit;
}

$id_carpeta = intval($_GET['id_carpeta']);

try {
    $stmt = $pdo->prepare("CALL consultar_carpeta_por_id(:id_carpeta)");
    $stmt->bindParam(':id_carpeta', $id_carpeta, PDO::PARAM_INT);
    $stmt->execute();
    $carpeta = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (empty($carpeta)) {
        http_response_code(404);
        echo json_encode(['mensaje' => 'No se encontró la carpeta con ese ID']);
    } else {
        echo json_encode($carpeta);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
