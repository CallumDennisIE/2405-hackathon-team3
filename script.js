document.addEventListener("DOMContentLoaded", function () {
    const countdownElement = document.getElementById('countdown');
    const gameContainer = document.getElementById('gameContainer');
    let timer;
    let timeLeft = 10;
    let isPaused = false;
    let currentPlayer = 'player';  // Track whose turn it is
    let userCredits = 1000;
    const cardPackCost = 500;
    const upgradeCost = 500;
    const creditsPerRoundWin = 50;
    const creditsPerGameEndWin = 300;
    let purchasedCards = [];

    const characters = [
        'Luke Skywalker',
        'Darth Vader',
        'Grogu',
        'Obi-Wan Kenobi',
        'Emperor Palpatine',
        'Han Solo',
        'Leia Organa',
        'Chewbacca',
        'Boba Fett',
        'Rey'
    ];

    function startCountdown() {
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
        }, 1000); // 1000ms = 1 second
    }

    function endTurn() {
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
            }, 3000); // 3-sec delay for the computer's turn
        } else {
            startCountdown();
        }
    }

    const pauseCountdown = () => { isPaused = true; };
    const resumeCountdown = () => { isPaused = false; };

    document.addEventListener('click', (event) => {
        // Resume countdown if user clicks inside the game container, else pause it
        gameContainer.contains(event.target) ? resumeCountdown() : pauseCountdown();
    });

    // Define the cards
    class Card {
        constructor(name, attack, defense, force, side, imageName) {
            // Set the card's properties with object = cards - assign with "this" method
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
    const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min; // Pick random stats for each rarity (within the min-max values)

    // Store the cards
    const deck = [];
    characters.forEach(character => {
        const attack = getRandomCommonValue(); // Common value
        const defense = getRandomCommonValue();
        const force = getRandomCommonValue();
        const side = character.includes('Darth') || character.includes('Emperor') ? 'Dark' : 'Light';

        // Create the image for the character based on the side
        const imageName = `${character.toLowerCase().replace(/\s+/g, '_')}_${side.toLowerCase()}.png`;

        // Create a new card for the character with these attributes - img and push it to the deck
        deck.push(new Card(character, attack, defense, force, side, imageName));
    });

    // Log the names of all cards in the deck separated by a comma and space
    console.log(deck.map(card => card.name).join(', '));

    shuffleDeck(deck);

    let playerDeck = deck.slice(0, 5);
    let computerDeck = deck.slice(5, 10);

    // Choose user side
    let userSide = '';
    while (!['light', 'dark'].includes(userSide)) {
        userSide = prompt("Choose your side: Light or Dark Side").trim().toLowerCase();
    }

    const playRound = (playerDeck, computerDeck, attribute, userSide) => {
        // Draw a card from both player and computer deck
        const playerCard = playerDeck.shift();
        const computerCard = computerDeck.shift();
        // Display the details of the cards
        console.log(`Player's card: ${playerCard.name} (Attack=${playerCard.attack}, Defense=${playerCard.defense}, Force=${playerCard.force})`);
        console.log(`Computer's card: ${computerCard.name} (Attack=${computerCard.attack}, Defense=${computerCard.defense}, Force=${computerCard.force})`);

        // Compare the drawn cards based on the attribute
        const result = compareCards(playerCard, computerCard, attribute);

        if (result === 'A') {
            // Player wins
            console.log(`${userSide === 'light' ? 'The Force is strong' : 'The Dark side prevails'} with ${playerCard.name}! ${userSide === 'light' ? 'Light' : 'Dark'} Side wins the round with ${attribute}.`);
            playerDeck.push(playerCard, computerCard);
            userCredits += creditsPerRoundWin;
            updateCreditsDisplay();
            updateMessageDisplay(`Awesome work, here is ${creditsPerRoundWin} credits!`);
            console.log(`Awesome work, here is ${creditsPerRoundWin} credits!`);
        } else if (result === 'B') {
            // Computer wins
            console.log(`${userSide === 'light' ? 'The Dark side prevails' : 'The Force is strong'} with ${computerCard.name}! ${userSide === 'light' ? 'Dark' : 'Light'} Side wins the round with ${attribute}.`);
            computerDeck.push(playerCard, computerCard);
        } else {
            // None wins
            console.log("It's a tie! Both cards are discarded into the Sarlacc pit.");
        }

        // Display the updated decks
        console.log(`Player's deck size: ${playerDeck.length}`);
        console.log(`Computer's deck size: ${computerDeck.length}`);
    };

    const compareCards = (playerCard, computerCard, attribute) => playerCard[attribute] > computerCard[attribute] ? 'A' : playerCard[attribute] < computerCard[attribute] ? 'B' : 'Tie';

    const playComputerTurn = () => {
        // Check if both player and computer decks are not empty
        if (playerDeck.length > 0 && computerDeck.length > 0) {
            // Choose a random attribute for the computer's turn
            const attribute = ['attack', 'defense', 'force'][Math.floor(Math.random() * 3)];
            console.log(`\n--- Next Round ---`);
            console.log(`Attribute for this round: ${attribute.toUpperCase()}`);
            playRound(playerDeck, computerDeck, attribute, userSide);
        }
        checkGameEnd();
    };

    const checkGameEnd = () => {
        // Check if either player or computer deck is empty
        if (playerDeck.length === 0 || computerDeck.length === 0) {
            const playerWins = playerDeck.length > computerDeck.length;
            const computerWins = playerDeck.length < computerDeck.length;

            const message = playerWins ?
                (userSide === 'light' ? 'May the Force be with you! You have emerged victorious for the Light Side.' : 'The power of the Dark Side prevails! Victory is yours!') :
                (computerWins ?
                    (userSide === 'light' ? 'The Dark Side has triumphed! The balance has shifted.' : 'The Light Side has been extinguished! The Dark Side reigns supreme!') :
                    'A tie! The Force remains in balance.');

            console.log(message);

            if (playerWins) {
                userCredits += creditsPerGameEndWin;
                updateCreditsDisplay();
                updateMessageDisplay(`You earned ${creditsPerGameEndWin} credits for winning this game!`);
                // remove console.log once happy update message is working
                console.log(`You earned ${creditsPerGameEndWin} credits for winning this game!`);
            }
        }
    };

    // Purchase extra card pack function
    function purchaseCardPack() {
        if (userCredits >= cardPackCost) {
            userCredits -= cardPackCost;
            updateCreditsDisplay();
    
            const newCards = getRandomCards(3); // Generate 3 cards for each new pack
            purchasedCards.push(...newCards);
    
             updatePurchasedCardsDisplay(); // Future UI display for purchased cards
        } else {
            console.log("Insufficient credits to purchase a card pack.");
        }
    }

    // Function to purchase an upgrade
    function purchaseUpgrade(card) {
        if (userCredits >= upgradeCost) {
            card.upgrade();
            userCredits -= upgradeCost;
            console.log(`${card.name} has been upgraded to Rare`);
        } else {
            console.log("Insufficient credits to purchase this upgrade.");
        }
    }

    // Function to generate random cards upon purchasing
    function getRandomCards(numCards) {
        let newCards = [];
        for (let i = 0; i < numCards; i++) {
            let randomCharacterIndex = Math.floor(Math.random() * characters.length);
            let character = characters[randomCharacterIndex];
            const attack = getRandomCommonValue();
            const defense = getRandomCommonValue();
            const force = getRandomCommonValue();
            const side = character.includes('Darth') || character.includes('Emperor') ? 'Dark' : 'Light';
            const imageName = `${character.toLowerCase().replace(/\s+/g, '_')}_${side.toLowerCase()}.png`;
            newCards.push(new Card(character, attack, defense, force, side, imageName));
        }
        return newCards;
    }

    // Function to update the display of user credits
    function updateCreditsDisplay() {
        document.getElementById('creditsDisplay').textContent = `Credits: ${userCredits}`;
    }

    // Gives feedback to the user
    function updateMessageDisplay(message) {
        document.getElementById('messageDisplay').textContent = message;
    }

    startCountdown();

    // Event listener for purchasing card pack
    document.getElementById('purchaseCardPackBtn').addEventListener('click', purchaseCardPack);
});
