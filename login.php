<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <form action="handle_login.php" method="post">
        <label for="username">Username:</label>
        <input type="text" name="username" id="username" maxlength="30" required><br>
        <label for="password">Password:</label>
        <input type="password" name="password" id="password" maxlength="20" required><br>
        <input type="submit" value="Login" class="button">
    </form>
</body>
</html>