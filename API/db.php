<?php
$host = 'db';
$port = 3306;
$db   = 'plantilla_automatizada';
$user = 'root';
$pass = 'rootpass';

try {
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$db;charset=utf8", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo "Error en la conexión a la base de datos: " . $e->getMessage();
    exit;
}
?>
