<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <form action="handle_login.php" method="post">
        <label for="username">Felhasználónév:</label>
        <input type="text" name="username" id="username" required><br>
        <label for="password">Jelszó:</label>
        <input type="password" name="password" id="password" required><br>
        <input type="submit" value="Bejelentkezés" class="button">
    </form>
</body>
</html>