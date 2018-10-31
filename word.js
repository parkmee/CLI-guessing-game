// import letter constructor
const letter = require("./letter.js");

// constructor for a Word that depends on the letter constructor
class Word {
    constructor(word) {
        this.wordArr = []; // empty array to hold letters of word
        this.createWord(word); // call function to populate wordArr
    }
    createWord(word) { // function to populate wordArr representing new Letter objects
        for(let i in word) {
            const char = word.charAt(i);
            const newLetter = new letter(char.toLowerCase());
            this.wordArr.push(newLetter);
        }
        //console.log(this.wordArr);
    }
    showWord() { // run showLetter function for each wordArr character to display as letters or blanks
        let wordView = [];
        for(let i in this.wordArr) { // for every letter in word
            wordView.push(this.wordArr[i].showLetter()); // run showLetter function to display as letter or blank
        }
        console.log(wordView.join(" ")); // display letters or blanks to command line
    }
    guessWord(userGuess) { // function that takes character as an argument and calls the guess function on each letter object
        for(let i in this.wordArr) {
            console.log(this.wordArr[i].str);
            this.wordArr[i].guessLetter(userGuess);
        }
    }
}

// exports class
module.exports = Word;

// testing
/* const newWord = new Word("cat");
newWord.guessWord("a");
newWord.showWord(); */
