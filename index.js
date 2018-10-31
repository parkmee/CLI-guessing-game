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
                //console.log(`${this.word}: ${this.definition}`);
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

// run to start game from beginning
function init() {
    // selects new random word for guessing
    const randomWord = new RandomWord();

    string = "";
    guesses = 9;
    matchedLetters = 0;
    inquirer.prompt([
        {
            type: "confirm",
            message: "Do you want to play a guessing game?\n",
            name: "playGame"
        },
    ]).then(res => {
        if (res.playGame) {
            //console.log(word.wordArr);
            word.showWord();
            guessALetter();
        } else {
            console.log("Good bye!");
        }
    });
}
const guessALetter = () => {
    const [...w] = word.wordArr;
    let letter = "";
    if (guesses > 0) {
        inquirer.prompt([
            {
                message: "Guess a letter\n",
                name: "letterGuess"
            }
        ]).then(res => {
            letter = res.letterGuess.toLowerCase();

            if (letter >= "a" && letter <= "z") {
                word.guessWord(letter);
                word.showWord();
                string = "";
                for (i in w) {
                    if (w[i].match) {
                        string += w[i].str;
                    }
                }
                /* console.log(string);
                console.log(selectedWord);
                console.log(string.length); */
            }

            //console.log(`matched letters: ${matchedLetters}`);

            if (string.length === matchedLetters) {
                guesses--;
                console.log(`You have ${guesses} guess(es) left`);
            } else {
                matchedLetters = string.length;
            }

            if (guesses === 0) {
                console.log(`You lose! The word was ${selectedWord}: ${definition}`);
                init();
            }

            if (string === selectedWord) {
                console.log(`You win! The word was ${selectedWord}: ${definition}`);
                init();
            } else {
                guessALetter();
            }

        });
    }
}

init();
