document.addEventListener('DOMContentLoaded', function () {
    const Categories = ["Sports", "Superheroes", "Animals"];
    const Sports = ["Basket-ball", "Volley-ball", "Soccer"];
    const Superheroes = ["Thor", "Spider Man", "Aquaman"];
    const Animals = ["Cat", "Zebra"];

    //for getting the length of the chosen cateory
    const categMap = {
        "Sports": Sports,
        "Superheroes": Superheroes,
        "Animals": Animals,
    }

    const letters =
        [
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
            'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
            'w', 'x', 'y', 'z'
        ]

    let lettersUsed = []
    let guess = "";
    let chosenWord;
    let chosenTopic;
    let secretWord;
    let lives = 6;

    let isGameRunning = true

    //getting elements
    const gameDisplay = document.getElementById('game-display');
    const menuContainer = document.getElementById('menu-container');
    const msgContainer = document.getElementById('msg-container');
    //const figureContainer = document.getElementById('hangman-figure-container') //future used

    let startBtn = document.getElementById('start-btn')
    let resetBtn = document.getElementById('reset-btn')
    let letterBtns = Array.from(document.querySelectorAll('.letter'));
    let hangmanFigures = Array.from(document.querySelectorAll('.figure-part'))
    let lblCategory = document.getElementById('category')
    let lblWordToGuess = document.getElementById('guess')
    let lblMsg = document.getElementById('lblMsg')

    letterBtns.forEach((letterBtn, index) => {
        letterBtn.addEventListener('click', () => userAction(letterBtn, index))
    })


    startBtn.addEventListener('click', () => {
        console.log('starting game')
        startGame()
    })

    resetBtn.addEventListener('click', () => {
        console.log('starting game')
        resetGame()
    })


    function startGame() {
        gameDisplay.classList.remove('disabled')
        menuContainer.classList.add('disabled')
        msgContainer.classList.add('disabled')
        startBtn.style.display = "none"

        isGameRunning = true
        chooseACategory()
        choosingAWord()
    }


    function userAction(letterBtn, index) {
        guess = letters[index]
        if (lives != 0 && isGameRunning) {
            if (!lettersUsed.includes(guess)) {
                lettersUsed.push(guess); // add guessed letter to array if not already guessed
                letterBtn.classList.add('disabled') //add classlist of disabling the btn

                updateGuessWord()

                if (!chosenWord.includes(guess)) {
                    updateHangMan(); // deduct a life if guessed letter is incorrect
                }
            }
        }

    }

    function chooseACategory() {
        let ranNum = Math.floor((Math.random() * Categories.length))
        chosenTopic = Categories[ranNum]

        console.log('chosen topic is' + chosenTopic)

        //dispaly the category
        lblCategory.innerText = "Category: " + chosenTopic


    }

    function choosingAWord() {
        let chosenCategArray = categMap[chosenTopic];
        let ranNum = Math.floor((Math.random() * chosenCategArray.length))
        chosenWord = chosenCategArray[ranNum].toLowerCase()
        chosenWord = chosenWord.replace(/\s/g, "-") //replace space into a -
        //setting the chosenWord into a secretWord
        secretWord = chosenWord.split('').map(char => char === '-' ? '-' : '_').join(' ');

        console.log("chosen word from " + chosenTopic + ' is ' + chosenWord);

        //display the chosen word
        lblWordToGuess.innerText = secretWord
    }

    function updateGuessWord() {
        let displayWord = '';

        for (let i = 0; i < chosenWord.length; i++) {
            let currentChar = chosenWord[i]
            if (lettersUsed.includes(currentChar)) {
                displayWord += currentChar;
            } else if (currentChar === '-') {
                displayWord += '-';
            } else {
                displayWord += "_"
            }
            displayWord += ' ';
        }
        lblWordToGuess.innerText = displayWord.trim()

        console.log(chosenWord + '|' + displayWord.trim())

        //checks if secretword is guessed
        if ((displayWord.trim().replace(/\s/g, '')) === chosenWord) {
            gameWinner()
        }


    }

    function updateHangMan() {
        lives -= 1
        console.log("lives left: " + lives)
        if (lives >= 0 && lives < hangmanFigures.length) {
            // shows the figure
            hangmanFigures[5 - lives].style.display = 'block';
        }

        if (lives === 0) {
            gameOver()
        }

    }
    function gameOver() {
        console.log('Game OVER!!')
        lblMsg.innerText = "GAME OVER!!"
        msgContainer.classList.remove('disabled')
        gameDisplay.classList.add('disabled')
        isGameRunning = false
    }

    function gameWinner() {
        console.log('CONGRATSS!!')
        lblMsg.innerText = "VICTORY!!"
        msgContainer.classList.remove('disabled')
        gameDisplay.classList.add('disabled')
        isGameRunning = false
    }

    function resetGame() {
        // reset all variables
        lettersUsed = [];
        guess = "";
        chosenWord = undefined;
        chosenTopic = undefined;
        secretWord = undefined;
        lives = 6;

        // reset UI elements
        letterBtns.forEach(btn => btn.classList.remove('disabled'));
        hangmanFigures.forEach(part => part.style.display = 'none');
        lblWordToGuess.innerText = "";
        lblMsg.innerText = ""

        // start a new game
        startGame();
    }
})