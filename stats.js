let wpm;
let accuracy;
let errors = 0;
let wrong;
let wrongEmpty;
let difficulty;

function calculateStats() {
    errors = 0;
    textLength--;
    if (document.getElementsByClassName("wrong").length > 0) {
        errors += document.getElementsByClassName("wrong").length;
    }
    if (document.getElementsByClassName("wrongEmpty").length > 0) {
        errors += document.getElementsByClassName("wrongEmpty").length;
    }
    accuracy = (textLength - Math.max(errors, 0)) / textLength * 100;
    document.getElementById("accuracy").innerHTML = accuracy.toFixed(0) + "% Accuracy";
    wpm = (60 / timeTaken) * (textLength / 5);
    document.getElementById('speed').innerHTML = wpm.toFixed(0) + " WPM";
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
        default:
            console.log("unknown difficulty");
            break;
    }
}