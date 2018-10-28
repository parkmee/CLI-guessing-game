// import letter constructor
const letter = require("./letter.js");

// constructor for a Word that depends on the letter constructor
class Word {
    constructor(word) {
        this.wordArr = []; // empty array to hold letters of word
        this.createWord(word); // call function to populate wordArr
    }
    createWord(word) { // function to populate wordArr
        for(let i in word) {
            const char = word.charAt(i);
            const newLetter = new letter(char.toLowerCase());
            this.wordArr.push(newLetter);
        }
        console.log(this.wordArr);
    }
    showWord() {
        let wordView = [];
        for(let i in this.wordArr) {
            wordView.push(this.wordArr[i].showLetter());
        }
        console.log(wordView.join(" "));
    }
}
// array of new Letter objects representing letters of the underlying word
// function that returns a string representing the word. calls function on the letter of each object
// function that takes character as an argument and calls the guess function on each letter object

// testing
const newWord = new Word("cat");
newWord.showWord();