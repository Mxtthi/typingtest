let slider;
let output;
let maxWordLength;
let textWordLength;
let keyPressed;
let currentKey;
let lastKey;
let isRunning = false;
let tries = 0;
let allowedKeys = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' '];

window.onload = function () {
    startGame();
    window.addEventListener('keydown', validateKey);
    slider = document.getElementById("slider");
    slider.addEventListener('change', changeFontSize);
    initiateSlider();
};

function changeFontSize() {
    for (let i = 0; i < document.getElementById("container").children.length; i++) {
        const element = document.getElementById("container").children[i];
        element.style.fontSize = output.innerHTML;
    }
}

function initiateSlider() {
    output = document.getElementById("output");
    output.innerHTML = slider.value + "px";

    slider.oninput = function () {
        output.innerHTML = this.value + "px";
    }
    changeFontSize();
}

function startGame() {
    getInputs();
    focusText();
    setCurrentPosition = setInterval(markPosition, 5);
    if (tries > 0) {
        while (parentElem.firstChild) {
            parentElem.removeChild(parentElem.firstChild)
        }
        clearCurrentTime();
    }
    generateText(textWordLength, maxWordLength);
}

function getInputs() {
    maxWordLength = document.getElementById("wordLength").value;
    textWordLength = document.getElementById("textWordLength").value
}

function validateKey(e) {
    console.log(e);
    keyPressed = e.key;
    console.log(keyPressed);
    for (let i = 0; i < allowedKeys.length; i++) {
        if (keyPressed == allowedKeys[i]) {
            if (isRunning == false) {
                startTimer();
                isRunning = true;
            }
            processKey();
            return;
        }
    }
    if (e.key == "Backspace" || e.key == "Delete") {
        currentKey--;
    }
    console.log(currentKey);
    if (e.key == "Tab") {
        e.preventDefault();
        stopGame();
        startGame();
    }
}

function processKey() {
    if (keyPressed == text[currentKey]) {
        rightKeyPressed();
    } else {
        wrongKeyPressed();
    }
    console.log("accepted");
}

function clearCurrentTime() {
    document.getElementById("lastTry").innerHTML = "0:00:00";
}

function stopGame() {
    tries++;
    currentKey = 1;
    lastKey = "";
    clearInterval(setCurrentPosition);
    if (isRunning == true) {
        endTimer();
    }
}