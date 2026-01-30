<?php
header('Content-Type: application/json; charset=utf-8');
require '../db.php';
require '../cors.php';

try {
    $stmt = $pdo->prepare("CALL listar_carpetas()");
    $stmt->execute();
    $carpetas = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($carpetas);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
