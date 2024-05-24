document.addEventListener("DOMContentLoaded", function () {
    let countdownElement = document.getElementById('countdown');
    let gameContainer = document.getElementById('gameContainer');
    let timer;
    let timeLeft = 10;
    let isPaused = false;
    let currentPlayer = 'player';  // Track whose turn it is

    function startCountdown() {
        timeLeft = 10;
        countdownElement.textContent = timeLeft;
        timer = setInterval(() => {
            if (!isPaused) {
                timeLeft--;
                countdownElement.textContent = timeLeft;
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    endTurn();
                }
            }
        }, 1000);
    }

    function endTurn() {
        console.log("Turn ended");
        currentPlayer = currentPlayer === 'player' ? 'computer' : 'player';
        if (currentPlayer === 'computer') {
            clearInterval(timer); // Clear any running timer
            setTimeout(() => {
                playComputerTurn();
                currentPlayer = 'player';
                startCountdown();  // Restart countdown for player's turn
            }, 3000);  // 3-second timeout for computer's turn
        } else {
            startCountdown();  // Restart countdown for the next player's turn
        }
    }

    function pauseCountdown() {
        isPaused = true;
    }

    function resumeCountdown() {
        isPaused = false;
    }

    // Event listeners to pause and resume countdown
    document.addEventListener('click', function (event) {
        if (!gameContainer.contains(event.target)) {
            pauseCountdown();
        } else {
            resumeCountdown();
        }
    });

    // Define the cards
    class Card {
        constructor(name, attack, defense, force, side, imageName) {
            this.name = name;
            this.attack = attack;
            this.defense = defense;
            this.force = force;
            this.side = side;
            this.imageName = imageName;
            this.rarity = 'common';
        }

        upgrade() {
            this.rarity = 'rare';
        }
    }

    // Function to shuffle an array
    const shuffleDeck = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    // Set random values for attack, defense, and force
    const getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };


    // const getRandomCommonValue = () => {
    //     return getRandomNumber(10, 100);
    // };

    // const getRandomRareValue = () => {
    //     return getRandomNumber(70, 130);
    // };


    // Set the deck
    let deck = [];
    ['Luke Skywalker', 'Darth Vader', 'Grogu', 'Obi-Wan Kenobi', 'Emperor Palpatine', 'Han Solo', 'Leia Organa', 'Chewbacca', 'Boba Fett', 'Rey'].forEach(character => {
        const attack = getRandomCommonValue(); // Common value
        const defense = getRandomCommonValue();
        const force = getRandomCommonValue();
        const side = character.includes('Dark') ? 'Dark' : 'Light';
        const imageName = `${character.toLowerCase().replace(/\s+/g, '_')}_${side.toLowerCase()}.jpg`; // Convert the image name inside the card - might change
        deck.push(new Card(character, attack, defense, force, side, imageName));
    });

    console.log(deck.map(card => card.name).join(', '));

    // Placeholder for user credits
    // let userCredits = 1000;



    //  Function to purchase an upgrade - will see about that
    // function purchaseUpgrade(card) {
    //     const upgradeCost = 500;
    //     if (userCredits >= upgradeCost) {
    //         card.upgrade();
    //         userCredits -= upgradeCost;
    //         console.log(`${card.name} has been upgraded to Rare`);
    //     } else {
    //         console.log("Insufficient credits to purchase this upgrade.");
    //     }
    // }

    // Shuffle the deck
    shuffleDeck(deck);

    // Split the deck between the player and computer
    let playerDeck = deck.slice(0, 5);
    let computerDeck = deck.slice(5, 10);

    // Prompt the user to choose their side
    let userSide = '';
    while (userSide !== 'light' && userSide !== 'dark') {
        userSide = prompt("Choose your side: Light or Dark Side").trim().toLowerCase();
    }

    // Function to play a round
    function playRound(playerDeck, computerDeck, attribute, userSide) {
        let playerCard = playerDeck.shift();
        let computerCard = computerDeck.shift();
        console.table(`Player's card: ${playerCard.name} (Attack=${playerCard.attack}, Defense=${playerCard.defense}, Force=${playerCard.force})`);
        console.table(`Computer's card: ${computerCard.name} (Attack=${computerCard.attack}, Defense=${computerCard.defense}, Force=${computerCard.force})`);

        let result = compareCards(playerCard, computerCard, attribute);

        if (result === 'A') {
            if (userSide === 'light') {
                console.table(`The Force is strong with ${playerCard.name}! Light Side wins the round with ${attribute}.`);
            } else {
                console.table(`The Dark side prevails with ${playerCard.name}! Dark Side wins the round with ${attribute}.`);
            }
            playerDeck.push(playerCard, computerCard);
        } else if (result === 'B') {
            if (userSide === 'light') {
                console.table(`The Dark side prevails with ${computerCard.name}. Dark Side wins the round with ${attribute}.`);
            } else {
                console.table(`The Force is strong with ${computerCard.name}! Light Side wins the round with ${attribute}.`);
            }
            computerDeck.push(playerCard, computerCard);
        } else {
            console.log("It's a tie! Both cards are discarded into the Sarlacc pit.");
        }

        console.table(`Player's deck size: ${playerDeck.length}`);
        console.table(`Computer's deck size: ${computerDeck.length}`);
    }

    // Function to compare two cards
    function compareCards(playerCard, computerCard, attribute) {
        if (playerCard[attribute] > computerCard[attribute]) {
            return 'A';
        } else if (playerCard[attribute] < computerCard[attribute]) {
            return 'B';
        } else {
            return 'Tie';
        }
    }

    // Function to play computer's turn
    function playComputerTurn() {
        if (playerDeck.length > 0 && computerDeck.length > 0) {
            let attributes = ['attack', 'defense', 'force'];
            let attribute = attributes[Math.floor(Math.random() * attributes.length)];
            console.table(`\n--- Next Round ---`);
            console.log(`Attribute for this round: ${attribute.toUpperCase()}`);
            playRound(playerDeck, computerDeck, attribute, userSide);
        }

        // Check if the game has ended after the computer's turn
        checkGameEnd();
    }

    // Check if the game has ended
    function checkGameEnd() {
        if (playerDeck.length === 0 || computerDeck.length === 0) {
            const playerWins = playerDeck.length > computerDeck.length;

            if (playerWins) {
                const victoryMessage = userSide === 'light' ?
                    "\nYou emerge victorious! The Force will be with you, always." :
                    "\nYou emerge victorious! The dark side has triumphed.";
                console.log(victoryMessage);
            } else if (!playerWins && playerDeck.length < computerDeck.length) {
                const victoryMessage = userSide === 'light' ?
                    "\nBT-1 wins! The dark side has triumphed." :
                    "\nR2D2 wins! The light side prevails.";
                console.log(victoryMessage);
            } else {
                console.log("\nThe game is a tie! Balance has been restored to the Force.");
            }

            clearInterval(timer);  // Stop the countdown
        }
    }

    // Start the game
    startCountdown();
});
