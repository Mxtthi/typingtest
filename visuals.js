let letters = [];
let parentElem;
function createVisuals() {
    for (let i = 1; i < text.length; i++) {
        let span = document.createElement("span");
        parentElem = document.getElementById("container");
        span.innerHTML = text[i];
        span.classList.add("letter");
        parentElem.appendChild(span);
    }
    letters = document.getElementsByClassName("letter");
}

function rightKeyPressed() {
    letters[currentKey - 1].classList.add("right");
    if (letters[currentKey - 1].innerHTML == " ") {
        letters[currentKey - 1].classList.remove("wrongEmpty");
    } else {
        letters[currentKey - 1].classList.remove("wrong");
    }
    console.log("right key pressed");
    currentKey++;
    if (currentKey >= text.length) {
        finished();
    }
}

function wrongKeyPressed() {
    if (letters[currentKey - 1].innerHTML == " ") {
        letters[currentKey - 1].classList.add("wrongEmpty");
    } else {
        letters[currentKey - 1].classList.add("wrong");
    }
    currentKey++;
    console.log("wrong key pressed");
    if (currentKey >= text.length) {
        finished();
    }
}

function markPosition() {
    if (letters != undefined) {
        letters[currentKey - 1].classList.add("current");
        if (currentKey > 1) {
            lastKey = currentKey - 1;
            if (lastKey != undefined) {
                letters[lastKey - 1].classList.remove("current");
            }
        }
        if (document.getElementsByClassName("current").length > 1) {
            console.log(document.getElementsByClassName("current"));
            document.getElementsByClassName("current")[document.getElementsByClassName("current").length - 1].classList.remove("current");
        }
    }
}

function finished() {
    alert("finished");
    stopGame();
    calculateStats();
}

function focusText() {
    document.getElementById("container").focus();
}



