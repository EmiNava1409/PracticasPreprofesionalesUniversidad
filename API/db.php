<?php
$host = 'localhost'; 
$port = 3306;
$db   = 'plantilla_automatizada';
$user = 'root';
$pass = '';     

try {
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo " Error en la conexión: " . $e->getMessage();
}
?>
