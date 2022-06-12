let letters = [], parentElem, lines;
function createVisuals() {
    for (let i = 1; i < text.length; i++) {
        let span = document.createElement("span");
        parentElem = document.getElementById("container");
        span.innerHTML = text[i];
        span.classList.add("letter");
        parentElem.appendChild(span);
    }
    letters = document.getElementsByClassName("letter");
    letters[currentKey - 1].classList.add("current");
}

function rightKeyPressed() {
    letters[currentKey - 1].classList.add("right");

    if (letters[currentKey - 1].innerHTML == " ") {
        letters[currentKey - 1].classList.remove("wrongEmpty");
    } else {
        letters[currentKey - 1].classList.remove("wrong");
    }
    if (currentKey + 1 >= text.length) {
        finished();
        return;
    }
    if (getCurrentLine() == 2) removeLine();
    lines = getLines();
    currentKey++;
}

function getLines() {
    let lines = 1, y;
    for (let i = 0; i < document.getElementsByClassName("letter").length; i++) {
        if (y == undefined) y = document.getElementsByClassName("letter")[i].getBoundingClientRect().y;
        if (y != document.getElementsByClassName("letter")[i].getBoundingClientRect().y) {
            lines++; 
            y = document.getElementsByClassName("letter")[i].getBoundingClientRect().y
        }
    }
    return lines;
}

function getCurrentLine() {
    if (lines != 1) {
        let elem = document.getElementsByClassName("letter")[currentKey - 1];
        let lastElem = document.getElementsByClassName("letter")[currentKey];
        if (elem.getBoundingClientRect().y != lastElem.getBoundingClientRect().y) return 2;
    }
    return 1;
}

function removeLine() {
    if (lines <= 2) return;
    for (let i = currentKey - 1; i >= 0; i--) {
        let elem = document.getElementsByClassName("letter")[i];
        text = text.slice(0, i) + text.slice(i+1);
        elem.remove();
    }
    currentKey = 0;
}

function wrongKeyPressed() {
    if (letters[currentKey - 1].innerHTML == " ") {
        letters[currentKey - 1].classList.add("wrongEmpty");
    } else {
        letters[currentKey - 1].classList.add("wrong");
    }
    currentKey++;
    if (currentKey >= text.length) {
        finished();
    }
}

function goForward() {
    if (letters != undefined && currentKey - 1 < textLength) {
        letters[currentKey - 1].classList.add("current");
        if (currentKey > 1) {
            lastKey = currentKey - 1;
            if (lastKey != undefined) {
                letters[lastKey - 1].classList.remove("current");
            }
        }
    }
}

function goBackwards() {
    if (letters != undefined && currentKey > 0) {
        letters[currentKey - 1].classList.add("current");
        lastKey = currentKey + 1;
        letters[lastKey - 1].classList.remove("current");
    }
}

function finished() {
    stopGame();
    calculateStats();
    showResult();
    uploadResults();
}

function focusText() {
    document.getElementById("container").focus();
}

//open/close sidebar
function openNav() {
    document.getElementById("mySidebar").style.width = "25%";
    document.getElementById("main").style.marginLeft = "25%";
    document.getElementById("openButton").style.display = "none";
    NavOpen = true;
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("openButton").style.display = "block";
    NavOpen = false;
}

// collapsible for settings
function collapsible() {
    let coll = document.getElementsByClassName("collapsible");
    let i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
            console.log(this.nextElementSibling);
            this.classList.toggle("active");
            var content = this.nextElementSibling.nextElementSibling;

            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    }
}


