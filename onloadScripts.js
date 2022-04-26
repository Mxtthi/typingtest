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
    collapsible();
    window.addEventListener('keydown', validateKey);
    window.addEventListener('click', function (e) {
        if (!document.getElementById('mySidebar').contains(e.target) && !document.getElementById('openButton').contains(e.target) && document.getElementById("mySidebar").style.width != "" && document.getElementById("mySidebar").style.width != "0px") {
            closeNav();
        }
    });
    slider = document.getElementById("slider");
    slider.addEventListener('change', changeFontSize);
    startGame();
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
    hideResult();
    getInputs();
    focusText();
    if (tries > 0) {
        while (parentElem.firstChild) {
            parentElem.removeChild(parentElem.firstChild)
        }
        clearCurrentTime();
    }
    generateText(textWordLength, maxWordLength, minWordLength);
    initiateSlider();
}

function getInputs() {
    maxWordLength = parseInt(document.getElementById("maxWordLength").value);
    minWordLength = parseInt(document.getElementById("minWordLength").value);
    textWordLength = document.getElementById("textWordLength").value;
    if (minWordLength > maxWordLength) {
        alert("min length is bigger than max");
    }
    console.log(maxWordLength, minWordLength, textWordLength);
}

function validateKey(e) {
    keyPressed = e.key;
    if (e.key == "Tab") {
        e.preventDefault();
        stopGame();
        startGame();
    }
    if (e.key == " ") {
        e.preventDefault();
    }
    for (let i = 0; i < allowedKeys.length; i++) {
        if (keyPressed == allowedKeys[i]) {
            if (isRunning == false && document.getElementById("statsDiv").style.display == "none") {
                closeNav();
                startTimer();
                isRunning = true;
            }
            if (document.getElementById("statsDiv").style.display == "none") {
                processKey();
                goForward();
                return;
            }
        }
    }
    if (e.key == "Backspace" || e.key == "Delete") {
        if (currentKey > 1 && document.getElementById("statsDiv").style.display == "none") {
            currentKey--;
            goBackwards();
        }
    }

}

function processKey() {
    if (keyPressed == text[currentKey]) {
        rightKeyPressed();
    } else {
        wrongKeyPressed();
    }
}

function clearCurrentTime() {
    document.getElementById("lastTry").innerHTML = "0:00:00";
}

function stopGame() {
    tries++;
    lastKey = "";
    if (isRunning == true) {
        endTimer();
    }
}