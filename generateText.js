let text;
let textLength;
let newList = [];

function generateText(textWordLength, maxWordLength) {
    text = "";
    currentKey = 1;
    for (let i = 0; i < wordList.length; i++) {
        console.log("wordlength", maxWordLength);
        if (wordList[i].length <= maxWordLength) {
            newList.push(wordList[i]);
        }
    }
    console.log(newList)
    for (let index = 0; index < textWordLength; index++) {
        let temp = newList[getRandomIntInclusive(0, newList.length)];
        console.log(temp, index);
        text += " " + temp;
    }
    textLength = text.length;
    createVisuals();
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}