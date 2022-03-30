let wpm;
let accuracy;
let errors = 0;
let wrong;
let wrongEmpty;

function calculateStats() {
    errors = 0;
    textLength--;
    if (document.getElementsByClassName("wrong").length > 0) {
        errors += document.getElementsByClassName("wrong").length;
    }
    if (document.getElementsByClassName("wrongEmpty").length > 0) {
        errors += document.getElementsByClassName("wrongEmpty").length;
    }
    console.log("textlength", textLength, "errors:", errors)
    accuracy = (textLength - Math.max(errors, 0)) / textLength * 100;
    console.log("acurracy", accuracy);
    document.getElementById("accuracy").innerHTML = accuracy.toFixed(0) + "% Accuracy";



    console.log(timeTaken, textLength);
    wpm = (60 / timeTaken) * (textLength / 5);
    document.getElementById('speed').innerHTML = wpm.toFixed(0) + " WPM";

}