<?php

require('connect.php');

$kapcsolat
    ->prepare("INSERT INTO felhasznalok (felhasznalonev, jelszo) VALUES (:felhasznalonev, :jelszo)")
    ->execute([
        'felhasznalonev' => $_POST["username"],
        'jelszo' => md5($_POST["password"]),
    ]);

echo "Sikeres regisztráció";
header("Location: index.php");
