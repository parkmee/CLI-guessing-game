// refer to word.js
const Word = require("./word.js");
let word = "";

// require npm packages
const inquirer = require('inquirer');
const request = require('request');
const cheerio = require('cheerio');

class RandomWord {
    constructor() {
        this.word = "";
        this.definition = "";
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
                this.definition = $("#random_word_definition").text(); // store definition of word
                console.log(`${this.word}: ${this.definition}`);
                word = new Word(this.word);
            }
        })
    }
}

let guesses = 3;
let matches = 0;
let usedLetters = [];
const randomWord = new RandomWord();

function init() {
    matches = 0;
    guesses = 3;
    usedLetters = [];
    inquirer.prompt([
        {
            type: "confirm",
            message: "Do you want to play a guessing game?\n",
            name: "playGame"
        },
    ]).then(res => {
        if (res.playGame) {
            console.log(word.wordArr);
            word.showWord();
            guessALetter();
        } else {
            console.log("Good bye!");
        }
    });
}

const guessALetter = () => {
    let atLeastOneMatch = false;
    if (guesses > 0) {
        inquirer.prompt([
            {
                message: "Guess a letter\n",
                name: "letterGuess"
            }
        ]).then(res => {
            


            /* for (const i in word.wordArr) {
                if (res.letterGuess === word.wordArr[i].str) {
                    for (const j in usedLetters) {
                        if (res.letterGuess.toLowerCase() === usedLetters[j])
                    }
                    atLeastOneMatch = true;
                    matches++;
                }
            }
            if (atLeastOneMatch) {
                usedLetters.push(res.letterGuess);
                console.log(usedLetters);
                word.guessWord(res.letterGuess);
                word.showWord();
                if (matches === word.wordArr.length) {
                    console.log(`You won! The definition of ${word.str} is "${word.definition}`);
                    init();
                } else {
                    guessALetter();
                }
            } else {
                guesses--;
                console.log("Wrong!");
                if (guesses === 0) {
                    console.log(`Sorry. You lost. The word was ${word.str}: ${word.definition}`);
                    init();
                } else {
                    guessALetter();
                }
            } */
        });
    }
}

init();
