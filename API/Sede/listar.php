<?php
header('Content-Type: application/json; charset=utf-8');
require '../cors.php';
require '../db.php';

try {
    $stmt = $pdo->prepare("CALL listar_sedes()");
    $stmt->execute();
    $sedes = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($sedes);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>     