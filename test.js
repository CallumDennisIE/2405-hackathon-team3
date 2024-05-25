/* jshint esversion: 6 */
/**
 * Add an event listener to the document and run the main screen with user log-in
 */
document.addEventListener('DOMContentLoaded', function () {
    runMainScreen();
});

/**
 * Set up of game variables to vary display/hide
 */
let mainLoginScreen = document.getElementById("login-screen");
let getInstructions = document.getElementById("instructions-icon");
let errorMessage = document.getElementById("error-message");
let mainGameScreen = document.getElementById("main-game-container");
let modal = document.getElementById("myModal");
let closeBtn = document.getElementById("close-btn");
let closeXBtn = document.getElementById("close-x-btn");


/**
* Show the main screen with user log-in and instruction icon
*/
function runMainScreen() {
    mainLoginScreen.style.display = "block";
    errorMessage.style.display = "none";
    mainGameScreen.style.display = "none";
    document.getElementById("user-icon").style.display = "none";
    document.getElementById("username").innerText = "";
    document.getElementById("user").focus(); //focus on input element with cursor ready for username input
}

/**
 * Verification of the user name input on the log-in screen
 */
document.getElementById("user-log").addEventListener("click", checkUsername);

function checkUsername() {
    let username = document.getElementById("user").value.trim();

    if (username.length >= 1 && username.length <= 12) {
        mainGameScreen.style.display = "block";
        mainLoginScreen.style.display = "none";
        document.getElementById("user-icon").style.display = "block";
        document.getElementById("username").innerText = username;
    } else {
        errorMessage.style.display = "block";
        //document.getElementById("user").focus(); 
        document.getElementById("user").value = "";
    }
}
checkUsername();


/**
 * Show and close modal with game instructions
 */
getInstructions.addEventListener("click", showInstructions);

function showInstructions() {
    modal.classList.add("show-modal");
    document.body.classList.add('greyout-background'); //grey out the background picture when modal pops-up.
}

closeBtn.addEventListener("click", closeInstructions);
closeXBtn.addEventListener("click", closeInstructions);

function closeInstructions() {
    modal.classList.remove("show-modal");
    document.body.classList.remove('greyout-background');
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        if (modal.classList.contains("show-modal")) {
            closeInstructions();
        }
    }
});



/**
 * Allow users to input their username by pressing the enter key
 */
document.getElementById("user").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        checkUsername();
    }
});

// Define the cards
class Card {
    constructor(name, attack, defense, force, side, imageName) {
        // Set the card's properties with object = cards - assign with "this" method
        Object.assign(this, { name, attack, defense, force, side, imageName, rarity: 'common' });
    }
    upgrade() { this.rarity = 'rare'; }
}

const getRandomCommonValue = () => getRandomNumber(10, 100); // Common value
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min; // Pick random stats for each rarity (within the min-max values)



// function shuffleDeck(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         let j = Math.floor(Math.random() * (i + 1)); // Pick a random index
//         // [array[i], array[j]] = [array[j], array[i]]; // Swap cards(elements) at i and j
//         array[i] = array[j]
//         array[j] = array[i]

//         console.log(array[i], array[j])
//     }

// };



const characters = [

    { name: 'Luke Skywalker', attack: 1, defense: 2, force: 3, side: "Light", imageName: "card_basic_front_luke.png" },
    { name: 'Lu per', attack: 1, defense: 2, force: 3, side: "Light", imageName: "card_basic_front_luke.png" },
    { name: 'Lu er', attack: 1, defense: 2, force: 3, side: "Light", imageName: "card_basic_front_luke.png" },
    { name: 'Lu ker', attack: 3, defense: 2, force: 3, side: "Light", imageName: "card_basic_front_luke.png" },
    { name: 'Lu walker', attack: 2, defense: 10, force: 3, side: "Light", imageName: "card_basic_front_luke.png" }
    // 'Darth Vader',
    // 'Grogu',
    // 'Obi-Wan Kenobi',
    // 'Emperor Palpatine',
    // 'Han Solo',
    // 'Leia Organa',
    // 'Chewbacca',
    // 'Boba Fett',
    // 'Rey'

];


function initCards() {
    let deck = [];
    characters.forEach(character => {
        // const attack = getRandomCommonValue(); // Common value
        // const defense = getRandomCommonValue();
        // const force = getRandomCommonValue();
        // const side = character.includes('Darth') || character.includes('Emperor') ? 'Dark' : 'Light';

        // Create the image for the character based on the side
        // const imageName = `${character.toLowerCase().replace(/\s+/g, '_')}_${side.toLowerCase()}.png`;

        // Create a new card for the character with these attributes - img and push it to the deck
        deck.push(new Card(character.name, character.attack, character.defense, character.force, character.side, character.imageName));
    });

    let playerDeck = deck.slice(0, 2);
    let computerDeck = deck.slice(2, 5);


    console.log(playerDeck, computerDeck);
    // shuffleDeck(deck)
    // console.log(shuffleDeck(deck))

    // Log the names of all cards in the deck separated by a comma and space
    // console.log(deck.map(card => card.name).join(', '));

    // shuffleDeck(deck);



}


function playRound() {
    initCards();
}


document.getElementById("next-round").addEventListener("click", playRound);





// document.addEventListener("DOMContentLoaded", function () {
//     const countdownElement = document.getElementById('countdown');
//     const gameContainer = document.getElementById('gameContainer');
//     let timer;
//     let timeLeft = 10;
//     let isPaused = false;
//     let currentPlayer = 'player';  // Track whose turn it is
//     let userCredits = 1000;
//     const cardPackCost = 500;
//     const upgradeCost = 500;
//     const creditsPerRoundWin = 50;
//     const creditsPerGameEndWin = 300;
//     let purchasedCards = [];



//     function startCountdown() {
//         timeLeft = 10;
//         countdownElement.textContent = timeLeft;
//         timer = setInterval(() => {
//             if (!isPaused) {
//                 countdownElement.textContent = --timeLeft; // Decrement and update the countdown
//                 if (timeLeft <= 0) {
//                     clearInterval(timer); // Stop the timer when time runs out
//                     endTurn(); // End the current turn
//                 }
//             }
//         }, 1000); // 1000ms = 1 second
//     }

//     function endTurn() {
//         console.log("Turn ended");

//         // Switch the current player
//         currentPlayer = currentPlayer === 'player' ? 'computer' : 'player';

//         // If it's the computer's turn
//         if (currentPlayer === 'computer') {
//             clearInterval(timer); // Clear any running timer
//             setTimeout(() => {
//                 playComputerTurn(); // Run the computer's turn
//                 currentPlayer = 'player'; // Switch back to the player's turn
//                 startCountdown(); // Restart countdown for player's turn
//             }, 3000); // 3-sec delay for the computer's turn
//         } else {
//             startCountdown();
//         }
//     }

//     // const pauseCountdown = () => { isPaused = true; };
//     // const resumeCountdown = () => { isPaused = false; };

//     // document.addEventListener('click', (event) => {
//     //     // Resume countdown if user clicks inside the game container, else pause it
//     //     gameContainer.contains(event.target) ? resumeCountdown() : pauseCountdown();
//     // });



//     // Fisher-Yates shuffle algorithm 
//     const shuffleDeck = (array) => {
//         for (let i = array.length - 1; i > 0; i--) {
//             const j = Math.floor(Math.random() * (i + 1)); // Pick a random index
//             [array[i], array[j]] = [array[j], array[i]]; // Swap cards(elements) at i and j
//         }
//     };


//     // Store the cards
//     



//     // Choose user side
//     let userSide = '';
//     while (!['light', 'dark'].includes(userSide)) {
//         userSide = prompt("Choose your side: Light or Dark Side").trim().toLowerCase();
//     }
//     const playRound = (playerDeck, computerDeck, attribute, userSide) => {
//         // Draw a card from both player and computer deck
//         const playerCard = playerDeck.shift();
//         const computerCard = computerDeck.shift();
//         // Display the details of the cards
//         console.log(`Player's card: ${playerCard.name} (Attack=${playerCard.attack}, Defense=${playerCard.defense}, Force=${playerCard.force})`);
//         console.log(`Computer's card: ${computerCard.name} (Attack=${computerCard.attack}, Defense=${computerCard.defense}, Force=${computerCard.force})`);

//         // Compare the drawn cards based on the attribute
//         const result = compareCards(playerCard, computerCard, attribute);

//         if (result === 'A') {
//             // Player wins
//             console.log(`${userSide === 'light' ? 'The Force is strong' : 'The Dark side prevails'} with ${playerCard.name}! ${userSide === 'light' ? 'Light' : 'Dark'} Side wins the round with ${attribute}.`);
//             playerDeck.push(playerCard, computerCard);
//             userCredits += creditsPerRoundWin;
//             updateCreditsDisplay();
//             updateMessageDisplay(`Awesome work, here is ${creditsPerRoundWin} credits!`);
//             console.log(`Awesome work, here is ${creditsPerRoundWin} credits!`);
//         } else if (result === 'B') {
//             // Computer wins
//             console.log(`${userSide === 'light' ? 'The Dark side prevails' : 'The Force is strong'} with ${computerCard.name}! ${userSide === 'light' ? 'Dark' : 'Light'} Side wins the round with ${attribute}.`);
//             computerDeck.push(playerCard, computerCard);
//         } else {
//             // None wins
//             console.log("It's a tie! Both cards are discarded into the Sarlacc pit.");
//         }

//         // Display the updated decks
//         console.log(`Player's deck size: ${playerDeck.length}`);
//         console.log(`Computer's deck size: ${computerDeck.length}`);
//     };

//     const compareCards = (playerCard, computerCard, attribute) => playerCard[attribute] > computerCard[attribute] ? 'A' : playerCard[attribute] < computerCard[attribute] ? 'B' : 'Tie';

//     const playComputerTurn = () => {
//         // Check if both player and computer decks are not empty
//         if (playerDeck.length > 0 && computerDeck.length > 0) {
//             // Choose a random attribute for the computer's turn
//             const attribute = ['attack', 'defense', 'force'][Math.floor(Math.random() * 3)];
//             console.log(`\n--- Next Round ---`);
//             console.log(`Attribute for this round: ${attribute.toUpperCase()}`);
//             playRound(playerDeck, computerDeck, attribute, userSide);
//         }
//         checkGameEnd();
//     };

//     const checkGameEnd = () => {
//         // Check if either player or computer deck is empty
//         if (playerDeck.length === 0 || computerDeck.length === 0) {
//             const playerWins = playerDeck.length > computerDeck.length;
//             const computerWins = playerDeck.length < computerDeck.length;

//             const message = playerWins ?
//                 (userSide === 'light' ? 'May the Force be with you! You have emerged victorious for the Light Side.' : 'The power of the Dark Side prevails! Victory is yours!') :
//                 (computerWins ?
//                     (userSide === 'light' ? 'The Dark Side has triumphed! The balance has shifted.' : 'The Light Side has been extinguished! The Dark Side reigns supreme!') :
//                     'A tie! The Force remains in balance.');

//             console.log(message);

//             if (playerWins) {
//                 userCredits += creditsPerGameEndWin;
//                 updateCreditsDisplay();
//                 updateMessageDisplay(`You earned ${creditsPerGameEndWin} credits for winning this game!`);
//                 // remove console.log once happy update message is working
//                 console.log(`You earned ${creditsPerGameEndWin} credits for winning this game!`);
//             }
//         }
//     };

//     // Purchase extra card pack function
//     function purchaseCardPack() {
//         if (userCredits >= cardPackCost) {
//             userCredits -= cardPackCost;
//             updateCreditsDisplay();

//             const newCards = getRandomCards(3); // Generate 3 cards for each new pack
//             purchasedCards.push(...newCards);

//             updatePurchasedCardsDisplay(); // Future UI display for purchased cards
//         } else {
//             console.log("Insufficient credits to purchase a card pack.");
//         }
//     }

//     // Function to purchase an upgrade
//     function purchaseUpgrade(card) {
//         if (userCredits >= upgradeCost) {
//             card.upgrade();
//             userCredits -= upgradeCost;
//             console.log(`${card.name} has been upgraded to Rare`);
//         } else {
//             console.log("Insufficient credits to purchase this upgrade.");
//         }
//     }

//     // Function to generate random cards upon purchasing
//     function getRandomCards(numCards) {
//         let newCards = [];
//         for (let i = 0; i < numCards; i++) {
//             let randomCharacterIndex = Math.floor(Math.random() * characters.length);
//             let character = characters[randomCharacterIndex];
//             const attack = getRandomCommonValue();
//             const defense = getRandomCommonValue();
//             const force = getRandomCommonValue();
//             const side = character.includes('Darth') || character.includes('Emperor') ? 'Dark' : 'Light';
//             const imageName = `${character.toLowerCase().replace(/\s+/g, '_')}_${side.toLowerCase()}.png`;
//             newCards.push(new Card(character, attack, defense, force, side, imageName));
//         }
//         return newCards;
//     }

//     // Function to update the display of user credits
//     function updateCreditsDisplay() {
//         document.getElementById('creditsDisplay').textContent = `Credits: ${userCredits}`;
//     }

//     // Gives feedback to the user
//     function updateMessageDisplay(message) {
//         document.getElementById('messageDisplay').textContent = message;
//     }

//     startCountdown();

//     // Event listener for purchasing card pack
//     document.getElementById('purchaseCardPackBtn').addEventListener('click', purchaseCardPack);
// });