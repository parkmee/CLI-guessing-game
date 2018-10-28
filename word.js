// import letter constructor
const letter = require("./letter.js");

// constructor for a Word that depends on the letter constructor
class Word {
    constructor(word) {
        this.word = word;
    }
    createWord() {
        for(let i = 0; i < this.word.length; i++) {
            const char = this.word.charAt(i);
            const newLetter = new letter(char.toLowerCase());
            console.log(newLetter);
        }
    }
}
// array of new Letter objects representing letters of the underlying word
// function that returns a string representing the word. calls function on the letter of each object
// function that takes character as an argument and calls the guess function on each letter object

const newWord = new Word("cat");
newWord.createWord();