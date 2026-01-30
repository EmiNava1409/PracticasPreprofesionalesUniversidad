<?php
header('Content-Type: application/json; charset=utf-8');
require '../db.php';
require '../cors.php';

try {
    $stmt = $pdo->prepare("CALL listar_areas()");
    $stmt->execute();
    $areas = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($areas);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
