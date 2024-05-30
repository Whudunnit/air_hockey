<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Scoreboard</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="scoreboard.css">
</head>
<body>
<div class= flex-box>
        <div class="scroll-box">
            <p>Scoreboard</p>
            <p></p>
            <?php
            require('connect.php');
            
            $stmt = $kapcsolat->query("SELECT felhasznalonev, score FROM felhasznalok ORDER BY score DESC");
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            if ($users) {
                foreach ($users as $user) {
                    echo '<div class="user-entry">';
                    echo '<div class="user-name">' . htmlspecialchars($user['felhasznalonev']) . '</div>';
                    echo '<div class="user-score">' . htmlspecialchars($user['score']) . '</div>';
                    echo '</div>';
                }
            } else {
                echo '<p>There are no players.</p>';
            }
            ?>
        </div>
        <button><a href="https://rzsombor.web.elte.hu/air-hockey/game.php">Go Back</a></button>
        
    </div>
</body>
</html>