// require npm packages
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
                return {
                    word: this.word, 
                    definition: this.definition
                };
            }
        });
        
    }
}

// exports class
module.exports = RandomWord;

// testing
//const getWord = new RandomWord();