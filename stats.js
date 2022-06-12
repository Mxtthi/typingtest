let wpm, accuracy, errors = 0, wrong, wrongEmpty, difficulty;

function calculateStats() {
    errors = 0, textLength--;
    if (document.getElementsByClassName("wrong").length > 0) {
        errors += document.getElementsByClassName("wrong").length;
    }
    if (document.getElementsByClassName("wrongEmpty").length > 0) {
        errors += document.getElementsByClassName("wrongEmpty").length;
    }
    accuracy = (textLength - Math.max(errors, 0)) / textLength * 100;
    document.getElementById("accuracy").innerHTML = accuracy.toFixed(0) + "% Accuracy";
    wpm = (60 / timeTaken) * (textLength / 5);
    speed = (wpm * accuracy / 100).toFixed(0);
    document.getElementById('speed').innerHTML = speed + " WPM";
}

function showResult() {
    document.getElementById("container").style.display = "none";
    document.getElementById("statsDiv").style.display = "block";
}

function hideResult() {
    document.getElementById("container").style.display = "block";
    document.getElementById("statsDiv").style.display = "none";
}

function getDifficulty() {
    let radios = document.getElementsByName("difficulty");
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked == true) {
            difficulty = radios[i].value;
        }
    }

    switch (difficulty) {
        case "easy":
            return 100;
        case "intermediate":
            return 1000;
        case "hard":
            return 10000;
    }
}

function uploadResults() {
    if (textWordLength >= 15) {
        let data = { "speed": speed, "accuracy": accuracy, "difficulty": difficulty };
        sendData(data);
    }
}