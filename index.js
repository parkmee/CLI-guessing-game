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

const randomWord = new RandomWord();

function init() {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Do you want to play a guessing game?",
            name: "playGame"
        },

    ])
}


