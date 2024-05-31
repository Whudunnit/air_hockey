<?php
    session_start();
    if ( ! isset($_SESSION["id"])) {
        header("Location: login.php");
    }
    require('update-score.php');
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Air Hockey</title>
</head>
<body>
    <div id="text">
        <br><br>
        <button><a href="https://rzsombor.web.elte.hu/air-hockey/">Air Hockey</a></button>
        <br><br>
        <button><a href="https://github.com/Whudunnit/air_hockey">Github</a></button>
        <br><br>
        <H4 id="score">Player score: 0</H4>
        <H4 id="computer_score">Computer score: 0</H4><br><br>
        <h3 id="instructions">First to 7 wins! <br><br>
            If the puck gets stuck <br> use the reset puck button! <br> Make sure the whole board <br> is on the screen! <br> </h3>
        <button><a href="https://rzsombor.web.elte.hu/air-hockey/scoreboard.php">Scoreboard</a></button>
        <button id="resetButton">Reset Puck</button>
        <button onclick="window.location.href='logout.php'">Logout</button>  
    </form>
    </label>
    </div>
    <canvas></canvas>

    <script src="handle_win.js"></script>
    <script src="Classes/Computer.js"></script>
    <script src="Classes/Player.js"></script>
    <script src="Classes/Puck.js"></script>
    <script src="index.js"></script>
</body>
</html>