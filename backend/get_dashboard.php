<?php
include 'db.php';

// Total products
$p = $conn->query("SELECT COUNT(*) as total FROM products")->fetch_assoc()['total'];

// Total orders
$o = $conn->query("SELECT COUNT(*) as total FROM orders")->fetch_assoc()['total'];

// Total sales
$s = $conn->query("SELECT SUM(total) as total FROM orders")->fetch_assoc()['total'];

if (!$s) $s = 0;

echo json_encode([
    "products" => (int)$p,
    "orders" => (int)$o,
    "sales" => (int)$s
]);
?>