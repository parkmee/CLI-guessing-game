// construct for Letter to display underlying character or blank placeholder
class Letter {
    constructor (str) {
        this.str = str; // define string to store underlying character for the letter
        this.match = false; // boolean value to store if letter has been guessed
    }
    // function to return the underlying character if the letter has been guessed or a place holder otherwise
    showLetter() {
        //console.log(this.str, this.match);
        if (this.match) {
            return this.str;
        } else {
            return " __ ";
        }
    }
    // function to take character as an argument and check it against the underlying character
    guessLetter(userGuess) {
        if (userGuess === this.str) {
            return this.match = true; // update stored boolean value to true
        }
        console.log("no match");
    }
}

// export class Letter
module.exports = Letter;

// testing
/* const a = new Letter("a");
console.log(a.str, a.match);
//a.guessLetter("b");
a.showLetter(); */
