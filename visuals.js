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
    letters[currentKey - 1].classList.add("current");
}

function rightKeyPressed() {
    letters[currentKey - 1].classList.add("right");
    if (altVisuals == true) {
        letters[currentKey - 1].classList.add("rightAlt");
    }

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
    console.log(currentKey)
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


