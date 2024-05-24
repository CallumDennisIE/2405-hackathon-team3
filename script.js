document.addEventListener("DOMContentLoaded", function () {
    const countdownElement = document.getElementById('countdown'); // Dummy - eligible to change
    const gameContainer = document.getElementById('gameContainer'); // Dummy - eligible to change
    let timer;
    let timeLeft = 10;
    let isPaused = false;
    let currentPlayer = 'player';
    // IDs above might change 
    const startCountdown = () => {
        timeLeft = 10;
        countdownElement.textContent = timeLeft;
        timer = setInterval(() => {
            if (!isPaused) {
                countdownElement.textContent = --timeLeft; // Decrement and update the countdown
                if (timeLeft <= 0) {
                    clearInterval(timer); // Stop the timer when time runs out
                    endTurn(); // End the current turn
                }
            }
        }, 1000); // 1000ms = 1second
    };


    const endTurn = () => {
        console.log("Turn ended");

        // Switch the current player
        currentPlayer = currentPlayer === 'player' ? 'computer' : 'player';

        // If it's the computer's turn
        if (currentPlayer === 'computer') {
            clearInterval(timer); // Clear any running timer
            setTimeout(() => {
                playComputerTurn(); // Run the computer's turn
                currentPlayer = 'player'; // Switch back to the player's turn
                startCountdown(); // Restart countdown for player's turn
            }, 3000); // 3sec delay for the computer's turn
        } else {
            startCountdown();
        }
    };


    const pauseCountdown = () => { isPaused = true; };
    const resumeCountdown = () => { isPaused = false; };

    document.addEventListener('click', (event) => {
        // Resume countdown if user clicks inside the game container, else pause it
        gameContainer.contains(event.target) ? resumeCountdown() : pauseCountdown();
    });

    // Define the cards
    class Card {
        constructor(name, attack, defense, force, side, imageName) {
            // Set the cards properties with object = cards - assign with "this" method
            Object.assign(this, { name, attack, defense, force, side, imageName, rarity: 'common' });
        }
        upgrade() { this.rarity = 'rare'; }
    }


    // Fisher-Yates shuffle algorithm 
    const shuffleDeck = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Pick a random index
            [array[i], array[j]] = [array[j], array[i]]; // Swap cards(elements) at i and j
        }
    };


    const getRandomCommonValue = () => getRandomNumber(10, 100); // Common value
    // const getRandomRareValue = () => getRandomNumber(70, 130); // Rare value
    const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min; // Pick random stats for each rarity (within the min-max values)



    // Stores the cards
    const deck = [];

    // Go through each name to create a card for it
    ['Luke Skywalker', 'Darth Vader', 'Grogu', 'Obi-Wan Kenobi', 'Emperor Palpatine', 'Han Solo', 'Leia Organa', 'Chewbacca', 'Boba Fett', 'Rey'].forEach(character => {
        const attack = getRandomNumber(10, 100); // Common
        const defense = getRandomNumber(10, 100); // Common
        const force = getRandomNumber(10, 100); // Common

        const side = character.includes('Dark') ? 'Dark' : 'Light';

        // Create the image for the character based on the side - will look to it further
        const imageName = `${character.toLowerCase().replace(/\s+/g, '_')}_${side.toLowerCase()}.png`;

        // Create new card for the character with these attributes - img and push it to the deck
        deck.push(new Card(character, attack, defense, force, side, imageName));
    });

    // Log the names of all cards in the deck separated by a comma and space
    console.log(deck.map(card => card.name).join(', '));


    // E X P E R I M E N T A L
    // let userCredits = 1000;

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

    shuffleDeck(deck);

    let playerDeck = deck.slice(0, 5);
    let computerDeck = deck.slice(5, 10);

    // We'll see about this - Side
    let userSide = '';
    while (!['light', 'dark'].includes(userSide)) {
        userSide = prompt("Choose your side: Light or Dark Side").trim().toLowerCase();
    }

    const playRound = (playerDeck, computerDeck, attribute, userSide) => {
        // Draw a card from both player and computer deck
        const playerCard = playerDeck.shift();
        const computerCard = computerDeck.shift();
        // Display the details of the cards
        console.table(`Player's card: ${playerCard.name} (Attack=${playerCard.attack}, Defense=${playerCard.defense}, Force=${playerCard.force})`);
        console.table(`Computer's card: ${computerCard.name} (Attack=${computerCard.attack}, Defense=${computerCard.defense}, Force=${computerCard.force})`);

        // Compare the drawn cards based on the attribute
        const result = compareCards(playerCard, computerCard, attribute);

        if (result === 'A') {
            // Player wins
            console.table(`${userSide === 'light' ? 'The Force is strong' : 'The Dark side prevails'} with ${playerCard.name}! ${userSide === 'light' ? 'Light' : 'Dark'} Side wins the round with ${attribute}.`);
            playerDeck.push(playerCard, computerCard);
        } else if (result === 'B') {
            // Computer wins
            console.table(`${userSide === 'light' ? 'The Dark side prevails' : 'The Force is strong'} with ${computerCard.name}! ${userSide === 'light' ? 'Dark' : 'Light'} Side wins the round with ${attribute}.`);
            computerDeck.push(playerCard, computerCard);
        } else {
            // None wins
            console.log("It's a tie! Both cards are discarded into the Sarlacc pit.");
        }

        // Display the updated decks (in a table format)
        console.table(`Player's deck size: ${playerDeck.length}`);
        console.table(`Computer's deck size: ${computerDeck.length}`);
    };

    // Compare the values of the attributes of player and computer cards
    const compareCards = (playerCard, computerCard, attribute) => playerCard[attribute] > computerCard[attribute] ? 'A' : playerCard[attribute] < computerCard[attribute] ? 'B' : 'Tie';

    const playComputerTurn = () => {
        // Check if both player and computer decks are not empty
        if (playerDeck.length > 0 && computerDeck.length > 0) {
            // Choose a random attribute for the computers turn
            const attribute = ['attack', 'defense', 'force'][Math.floor(Math.random() * 3)];
            console.table(`\n--- Next Round ---`);
            console.log(`Attribute for this round: ${attribute.toUpperCase()}`);
            playRound(playerDeck, computerDeck, attribute, userSide);
        }
        checkGameEnd();
    };

    const checkGameEnd = () => {
        // Check if either player or computer deck is empty
        if (playerDeck.length === 0 || computerDeck.length === 0) {
            // Player won
            const playerWins = playerDeck.length > computerDeck.length;
            // Computer won
            const computerWins = playerDeck.length < computerDeck.length;

            // Return the victory message adapted on the winner or tie
            return playerWins ?
                (userSide === 'light' ? 'May the Force be with you! You have emerged victorious for the Light Side.' : 'The power of the Dark Side prevails! Victory is yours!') :
                (computerWins ?
                    (userSide === 'light' ? 'The Dark Side has triumphed! The balance has shifted.' : 'The Light Side has been extinguished! The Dark Side reigns supreme!') :
                    'A tie! The Force remains in balance.');
        }
    };

    startCountdown();
});
