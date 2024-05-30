function handleWin() {
    var playerScore = document.getElementById("score").innerText.split(": ")[1];
    if (parseInt(playerScore) === 7) {
        
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "update-score.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(xhr.responseText); 
            }
        };
        xhr.send();
    }
}


setInterval(handleWin, 1000); 
