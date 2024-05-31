<?php
require('connect.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST["username"];
    $password = $_POST["password"];

    $stmt = $kapcsolat->prepare("SELECT COUNT(*) FROM felhasznalok WHERE felhasznalonev = :username");
    $stmt->execute(['username' => $username]);
    if ($stmt->fetchColumn() > 0) {
        echo 'Username is taken!';
        exit;
    }

    $stmt = $kapcsolat->prepare("INSERT INTO felhasznalok (felhasznalonev, jelszo, score) VALUES (:felhasznalonev, :jelszo, 0)");
    $stmt->execute([
        'felhasznalonev' => $username,
        'jelszo' => md5($password),
    ]);

    echo 'Sucsessfull registration!';
    header('index.php');
}
