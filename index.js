// refer to word.js
const Word = require("./word.js");
let word = "";
let selectedWord = "";
let definition = "";

// require npm packages
const inquirer = require('inquirer');
const request = require('request');
const cheerio = require('cheerio');

// class to select random word using webcrawler from www.randomword.com
class RandomWord {
    constructor() {
        this.word = "";
        this.getRandomWord();
    }
    getRandomWord() {
        const queryURL = "https://randomword.com/";
        request(queryURL, function(error, response, body) {
            if(error) { // if error, log error
                console.log(`Error: ${error}`);
            }
            if(response.statusCode === 200) { // if OK, return random word from website
                const $ = cheerio.load(body); // run cheerio to parse body to jquery
                this.word = $("#random_word").text(); // store random word
                word = new Word(this.word);
                selectedWord = $("#random_word").text();
                definition = $("#random_word_definition").text();
            }
        })
    }
}

// set global variables
let string = "";
let guesses = 0;
let matchedLetters = 0;
let lettersUsed = [];

// run to start game from beginning
function init() {
    // selects new random word for guessing
    const randomWord = new RandomWord();

    // reset values for global variables
    string = "";
    guesses = 9;
    matchedLetters = 0;
    lettersUsed = [];

    // prompt user to start game
    inquirer.prompt([
        {
            type: "confirm",
            message: "Do you want to play a guessing game?\n",
            name: "playGame"
        },
    ]).then(res => {
        if (res.playGame) {
            //console.log(word.wordArr);
            word.showWord(); // show blanks equal to the number of letters in word
            guessALetter(); // run guessing function
        } else {
            console.log("Good bye!");
        }
    });
}

// function for guessing letters of word
const guessALetter = () => {
    const [...w] = word.wordArr;
    console.log(selectedWord);
    let letter = ""; // local variable to store user's guess
    if (guesses > 0) {
        inquirer.prompt([ // prompt user for letter
            {
                message: "Guess a letter\n",
                name: "letterGuess"
            }
        ]).then(res => {
            letter = res.letterGuess.toLowerCase(); // store letter

            if (letter.length > 1 || letter.length < 1) {
                console.log("Guess one letter, please");
            } else if (letter >= "a" && letter <= "z") { // make sure selected key is a letter
                lettersUsed.push(letter); // store used letters in array
                word.guessWord(letter); // run guessWord function to mark any correctly guessed letters
                string = ""; // reset string to empty

                for (i in w) { // for each letter in the word
                    if (w[i].match) { // if the letter is matched
                        string += w[i].str; // concatenate value to string
                    }
                }
                console.log(`\nLetters used: ${lettersUsed.join(" ")}\n`); // display letters used
                // if string length matches number of matched letters, decrement guesses - indicates no additional letters were guessed in this turn
                if (string.length === matchedLetters) {
                    guesses--;
                } else {
                    matchedLetters = string.length; // otherwise, update number of matched letters to string length
                }
            } else {
                console.log("Guess a letter"); // error message if value other than a - z is selected
            }

            // player loses if guesses run out
            if (guesses === 0) {
                console.log(`You lose! The word was ${selectedWord}: ${definition}`);
                console.log(`\n*******************************************\n`)
                init();
                return;
            }

            // if concatenated string of guessed letters equals the selected random word, player wins
            if (string === selectedWord) {
                console.log(`You win! The word was ${selectedWord}: ${definition}`);
                console.log(`\n*******************************************\n`)
                init();
                return;
            } else {
                word.showWord(); // update guessed letters on terminal
                console.log(`You have ${guesses} guess(es) left`);
                guessALetter(); // otherwise, prompt player for another guess
            }
        });
    }
}

init();
