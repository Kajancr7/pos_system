<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$name = $data['name'];
$price = (int)$data['price'];
$qty = (int)$data['qty'];

if (!$name || $price <= 0 || $qty < 0) {
    echo "Invalid";
    exit;
}

$stmt = $conn->prepare("INSERT INTO products (name, price, qty) VALUES (?, ?, ?)");
$stmt->bind_param("sii", $name, $price, $qty);
$stmt->execute();

echo "Product added";
?>