<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$total = (int)$data['total'];
$items = $data['items']; // NEW

if ($total <= 0 || !is_array($items)) {
    echo "Invalid";
    exit;
}

// Save order
$stmt = $conn->prepare("INSERT INTO orders (total) VALUES (?)");
$stmt->bind_param("i", $total);
$stmt->execute();

// Reduce stock
foreach ($items as $item) {
    $id = (int)$item['id'];
    $qty = (int)$item['qty'];

    if ($id > 0 && $qty > 0) {
        $update = $conn->prepare("UPDATE products SET qty = qty - ? WHERE id = ?");
        $update->bind_param("ii", $qty, $id);
        $update->execute();
    }
}

echo "Order saved";
?>