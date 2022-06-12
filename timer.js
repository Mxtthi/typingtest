let start, currentTime, timeTaken;

function startTimer() {
    start = Date.now();
    timerInterval = setInterval(changeTime, 25);
}

function endTimer() {
    currentTime = Date.now();
    timeTaken = (currentTime - start) / 1000;
    clearInterval(timerInterval);
    isRunning = false;
}

function changeTime() {
    if (
        document.getElementById("lastTry").innerHTML == "" ||
        document.getElementById("lastTry").innerHTML == undefined
    ) {
        document.getElementById("lastTry").innerHTML = "57.1s";
    } else {
        currentTime = Date.now();
        newTime = (currentTime - start) / 1000;
        let min = Math.floor(newTime / 60);
        let s = Math.floor(newTime) - 60 * min;
        let ms = (newTime - s - min * 60).toFixed(1) * 10;
        if (ms == 10) ms = 0;
        if (s < 10) s = "0" + s;
        // console.log(min + ":" + s + ":" + ms, "test ", (newTime - s - min * 60) * 10);
        document.getElementById("lastTry").innerHTML = min + ":" + s + ":" + ms;
    }
}

