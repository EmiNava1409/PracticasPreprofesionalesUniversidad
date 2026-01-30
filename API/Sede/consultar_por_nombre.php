<?php
header('Content-Type: application/json; charset=utf-8');
require '../cors.php';
require '../db.php';

if (!isset($_GET['nombre_sede'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Falta el parámetro nombre_sede']);
    exit;
}

$nombre_sede = $_GET['nombre_sede'];

try {
    $stmt = $pdo->prepare("CALL consultar_sedes_por_nombre(:nombre)");
    $stmt->bindParam(':nombre', $nombre_sede, PDO::PARAM_STR);
    $stmt->execute();
    $sede = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($sede) {
        echo json_encode($sede);
    } else {
        http_response_code(404);
        echo json_encode(['message' => 'No se encontró la sede con ese nombre']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
