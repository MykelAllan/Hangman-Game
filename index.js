document.addEventListener('DOMContentLoaded', function () {
    const Categories = ["Sports", "Superheroes", "Animals"];
    const Sports = ["Basketball", "Volleyball", "Soccer"];
    const Superheroes = ["Thor", "Spider Man", "Aquaman"];
    const Animals = ["Cat", "Zebra", "Anaconda"];

    const letters =
        [
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
            'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
            'w', 'y', 'x', 'z'
        ]

    let guess = "";
    let chosenWord;
    let word;
    let spacesInWord;

    //getting elements
    let letter = Array.from(document.querySelectorAll('.letter'));
    let backspace = document.getElementById('backspace');
    let lblCategory = document.getElementById('category');
    let lblWordToGuess = document.getElementById('guess');


    letter.forEach((letter, index) => {
        letter.addEventListener('click', () => userAction(letter, index))
    })

    backspace.addEventListener('click', () => {
        guess = guess.slice(0, -1);
        console.log((guess));
        updateGuessWord()
    })


    function userAction(letter, index) {
        guess = guess + letters[index]
        console.log((guess));
        updateGuessWord()

    }

    function updateGuessWord() {
        lblWordToGuess.innerText = guess;

    }





})