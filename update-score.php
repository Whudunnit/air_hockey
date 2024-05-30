<?php
session_start();
require('connect.php');

if (!isset($_SESSION['id'])) {
    echo json_encode(['error' => 'User not logged in']);
    exit;
}

$userId = $_SESSION['id'];

try{
        $updateStmt = $kapcsolat->prepare("UPDATE felhasznalok SET score = score + 1 WHERE id = :id");
        $updateStmt->execute(['id' => $userId]);
} 
catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
