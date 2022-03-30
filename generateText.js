let text;
let textLength;
let newList;

function generateText(textWordLength, maxWordLength, minWordLength) {
    let wordrange = getDifficulty();
    console.log(wordrange);
    text = "";
    newList = [];
    currentKey = 1;
    for (let i = 0; i < wordrange; i++) {
        if (wordList[i].length <= maxWordLength && wordList[i].length >= minWordLength) {
            newList.push(wordList[i]);
        }
    }
    for (let index = 0; index < textWordLength; index++) {
        let temp = newList[getRandomIntInclusive(0, newList.length - 1)];
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