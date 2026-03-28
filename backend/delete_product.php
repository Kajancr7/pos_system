<?php
include 'db.php';

$id = (int)$_GET['id'];

if ($id <= 0) {
    echo "Invalid ID";
    exit;
}

$stmt = $conn->prepare("DELETE FROM products WHERE id=?");
$stmt->bind_param("i", $id);
$stmt->execute();

echo "Deleted";
?>