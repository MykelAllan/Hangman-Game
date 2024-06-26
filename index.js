document.addEventListener('DOMContentLoaded', function () {
    const Categories = ["Sports", "Superheroes","Animals"];
    const Sports = ["Basketball", "Volleyball", "Soccer"];
    const Superheroes = ["Thor", "Spider Man", "Aquaman"];
    const Animals = ["Cat", "Zebra"];

    //for getting the length of the chosen cateory
    const categMap = {
        "Sports" : Sports,
        "Superheroes" : Superheroes,
        "Animals" : Animals,
    }

    const letters =
        [
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
            'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
            'w', 'x', 'y', 'z'
        ]

    let guess = "";
    let chosenWord;
    let chosenTopic;
    let word;
    let spacesInWord;

    //getting elements
    const gameDisplay = document.getElementById('game-display');
    const menuContainer = document.getElementById('menu-container');
    let startBtn = document.getElementById('start-btn')
    let letter = Array.from(document.querySelectorAll('.letter'));
    let lblCategory = document.getElementById('category');
    let lblWordToGuess = document.getElementById('guess');

    letter.forEach((letter, index) => {
        letter.addEventListener('click', () => userAction(letter, index))
    })


    startBtn.addEventListener('click', () => {
        console.log('starting game')
        startGame()
    })

    function startGame() {
        gameDisplay.classList.remove('disabled')
        menuContainer.classList.add('disabled')

        startBtn.style.display = "none"

        chooseACategory();
        choosingAWord() 
    }


    function userAction(letter, index) {
        guess = guess + letters[index]
        console.log((guess));
        updateGuessWord()

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
        chosenWord = chosenCategArray[ranNum]

        console.log("chosen word from " +chosenTopic + ' is '+chosenWord);

        //display the chosen word
        lblWordToGuess.innerText = chosenWord
    }

    function updateGuessWord() {
        lblWordToGuess.innerText = guess;
    }

})