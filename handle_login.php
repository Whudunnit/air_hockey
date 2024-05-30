<?php
session_start();

require('connect.php');

$stmt = $kapcsolat->prepare("SELECT id, felhasznalonev FROM felhasznalok WHERE felhasznalonev = :username AND jelszo = :password");
$stmt->execute([
    "username" => $_POST["username"],
    "password" => md5($_POST["password"])
]);

$user = $stmt->fetchAll();

// var_dump( $user );

if( $user[0]["id"] != null ) {
    echo "sikeres bejelentkezés";
    $_SESSION["id"] = $user[0]["id"];
    $_SESSION["username"] = $user[0]["felhasznalonev"];
    header("Location: game.php");
}
else {
    echo "hibás felhasználónév vagy jelszó";
}
