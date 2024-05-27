/* jshint esversion: 6 */
/**
 * Add an event listener to the document and run the main screen with user log-in
 */
document.addEventListener('DOMContentLoaded', function () {
    runMainScreen();
    checkGameEnd();
});

/**
 * Set up of game variables to vary display/hide
 */
let mainLoginScreen = document.getElementById("login-screen");
let getInstructions = document.getElementById("instructions-icon");
let errorMessage = document.getElementById("error-message");
let mainGameScreen = document.getElementById("main-game-container");
let victoryScreen = document.getElementById("victory-screen")
let modal = document.getElementById("myModal");
let closeBtn = document.getElementById("close-btn");
let closeXBtn = document.getElementById("close-x-btn");
let victoryScrren = document.getElementById("victory-screen");
let gameCount = document.getElementById("game-count");
let winCount = document.getElementsByClassName("win-count")[0];


/**
* Show the main screen with user log-in and instruction icon
*/
function runMainScreen() {
    mainLoginScreen.style.display = "block";
    errorMessage.style.display = "none";
    mainGameScreen.style.display = "none";
    victoryScrren.style.display = "none";
    gameCount.style.display = "none";
    winCount.style.display = "none";
    document.getElementById("user-icon").style.display = "none";
    document.getElementById("victory-screen").style.display = "none";
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
        victoryScrren.style.display = "none";
        gameCount.style.display = "block";
        winCount.style.display = "block";
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




let playerDeck;
let computerDeck;


let playerGameWins = 0;
let computerGameWins = 0;
let playerWins = 0;
let computerWins = 0;


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
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
    // Using the constructor method is faster than making each instance for each character 
    constructor(name, attack, defense, force, side, imageName) {
        // Set the card's properties with object = cards - assign with "this" method
        Object.assign(this, { name, attack, defense, force, side, imageName, rarity: 'common' });
    }
    upgrade() { this.rarity = 'rare'; }
}

const getRandomCommonValue = () => getRandomNumber(10, 100); // Common value
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min; // Pick random stats for each rarity (within the min-max values)



// Shuffle both Light and Dark side decks separately
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

const characters = [
    { name: 'Luke Skywalker', attack: 80, defense: 70, force: 70, side: "Light", imageName: "card_basic_front_luke.png", sfxName: "sfx_basic_luke.mp3" },
    { name: 'Han Solo', attack: 60, defense: 40, force: 10, side: "Light", imageName: "card_basic_front_han.png", sfxName: "sfx_basic_han.mp3" },
    { name: 'Leia Organa', attack: 50, defense: 30, force: 50, side: "Light", imageName: "card_basic_front_leia.png", sfxName: "sfx_basic_leia.mp3" },
    { name: 'Chewbacca', attack: 80, defense: 50, force: 10, side: "Light", imageName: "card_basic_front_chew.png", sfxName: "sfx_basic_chew.mp3" },
    { name: 'Boba Fett', attack: 70, defense: 70, force: 0, side: "Dark", imageName: "card_basic_front_boba.png", sfxName: "sfx_basic_blaster.mp3" },
    { name: 'Darth Vader', attack: 99, defense: 80, force: 90, side: "Dark", imageName: "card_basic_front_vader.png", sfxName: "sfx_basic_vader.mp3" },
    { name: 'Obi-Wan Kenobi', attack: 80, defense: 99, force: 80, side: "Light", imageName: "card_basic_front_obi.png", sfxName: "sfx_basic_obi.mp3" },
    { name: 'Yoda', attack: 80, defense: 90, force: 99, side: "Light", imageName: "card_basic_front_yoda.png", sfxName: "sfx_basic_yoda.mp3" },
    { name: 'Rey', attack: 70, defense: 80, force: 80, side: "Light", imageName: "card_basic_front_rey.png", sfxName: "sfx_basic_saber.mp3" },
    { name: 'Grogu', attack: 50, defense: 30, force: 99, side: "Light", imageName: "card_basic_front_grogu.png", sfxName: "sfx_basic_saber.mp3" },
    { name: 'R2-D2', attack: 50, defense: 50, force: 0, side: "Light", imageName: "card_basic_front_r2d2.png", sfxName: "sfx_basic_r2d2.mp3" },
    { name: 'C-3PO', attack: 10, defense: 10, force: 0, side: "Light", imageName: "card_basic_front_c3po.png", sfxName: "sfx_basic_c3po.mp3" },
    { name: 'Anakin Skywalker', attack: 90, defense: 80, force: 80, side: "Light", imageName: "card_basic_front_anakin.png", sfxName: "sfx_basic_anakin.mp3" },
    { name: 'Darth Sidious', attack: 70, defense: 70, force: 99, side: "Dark", imageName: "card_basic_front_sidious.png", sfxName: "sfx_basic_sidious.mp3" },
    { name: 'Jar Jar Binks', attack: 0, defense: 0, force: 0, side: "Light", imageName: "card_basic_front_binks.png", sfxName: "sfx_basic_binks.mp3" },
    { name: 'Grand Moff Tarkin', attack: 70, defense: 30, force: 0, side: "Dark", imageName: "card_basic_front_tarkin.png", sfxName: "sfx_basic_blaster.mp3" },
    { name: 'Mace Windu', attack: 80, defense: 70, force: 90, side: "Light", imageName: "card_basic_front_windu.png", sfxName: "sfx_basic_saber.mp3" },
    { name: 'Darth Maul', attack: 80, defense: 70, force: 70, side: "Dark", imageName: "card_basic_front_maul.png", sfxName: "sfx_basic_saber.mp3" },
    { name: 'Qui-Gon Jinn', attack: 70, defense: 70, force: 80, side: "Light", imageName: "card_basic_front_quigon.png", sfxName: "sfx_basic_saber.mp3" },
    { name: 'Padme Amidala', attack: 40, defense: 30, force: 10, side: "Light", imageName: "card_basic_front_padme.png", sfxName: "sfx_basic_blaster.mp3" },
    { name: 'General Grievous', attack: 70, defense: 80, force: 0, side: "Dark", imageName: "card_basic_front_grevious.png", sfxName: "sfx_basic_saber.mp3" },
    { name: 'Kylo Ren', attack: 80, defense: 70, force: 70, side: "Dark", imageName: "card_basic_front_kylo.png", sfxName: "sfx_basic_saber.mp3" },
    { name: 'Finn', attack: 60, defense: 50, force: 30, side: "Light", imageName: "card_basic_front_finn.png", sfxName: "sfx_basic_blaster.mp3" },
    { name: 'Poe Dameron', attack: 50, defense: 40, force: 0, side: "Light", imageName: "card_basic_front_poe.png", sfxName: "sfx_basic_blaster.mp3" },
    { name: 'Supreme Leader Snoke', attack: 60, defense: 50, force: 90, side: "Dark", imageName: "card_basic_front_snoke.png", sfxName: "sfx_basic_saber.mp3" },
    { name: 'General Hux', attack: 50, defense: 50, force: 0, side: "Dark", imageName: "card_basic_front_hux.png", sfxName: "sfx_basic_blaster.mp3" },
    { name: 'Maz Kanata', attack: 50, defense: 30, force: 40, side: "Light", imageName: "card_basic_front_kanata.png", sfxName: "sfx_basic_blaster.mp3" },
    { name: 'Captain Phasma', attack: 70, defense: 60, force: 40, side: "Dark", imageName: "card_basic_front_phasma.png", sfxName: "sfx_basic_blaster.mp3" },
    { name: 'Chief Chirpa', attack: 30, defense: 30, force: 0, side: "Light", imageName: "card_basic_front_chirpa.png", sfxName: "sfx_basic_blaster.mp3" },
    { name: 'Count Dooku', attack: 70, defense: 60, force: 60, side: "Dark", imageName: "card_basic_front_dooku.png", sfxName: "sfx_basic_saber.mp3" },
    { name: 'Lando Calrissian', attack: 80, defense: 60, force: 0, side: "Light", imageName: "card_basic_front_lando.png", sfxName: "sfx_basic_blaster.mp3" },
    { name: 'Nien Nunb', attack: 70, defense: 60, force: 0, side: "Light", imageName: "card_basic_front_nunb.png", sfxName: "sfx_basic_blaster.mp3" },
    { name: 'Jabba The Hutt', attack: 30, defense: 10, force: 0, side: "Dark", imageName: "card_basic_front_jabba.png", sfxName: "sfx_basic_jabba.mp3" },
    { name: 'BB-8', attack: 30, defense: 40, force: 0, side: "Light", imageName: "card_basic_front_bb8.png", sfxName: "sfx_basic_r2d2.mp3" },
    { name: 'Admiral Ackbar', attack: 70, defense: 50, force: 0, side: "Dark", imageName: "card_basic_front_ackbar.png", sfxName: "sfx_basic_ackbar.mp3" },
    { name: 'Jocasta Nu', attack: 0, defense: 10, force: 70, side: "Light", imageName: "card_basic_front_nu.png", sfxName: "sfx_basic_saber.mp3" }


];

function initCards() {
    let deck = [];
    characters.forEach(character => {
        deck.push(new Card(character.name, character.attack, character.defense, character.force, character.side, character.imageName));
    });

    shuffleDeck(deck);

    // Split decks - player / computer based on the side 
    var half_length = Math.ceil(deck.length / 2);
    
    playerDeck = deck.slice(0, 5);
    computerDeck = deck.slice(6,11);

    renderDeckToScreen(playerDeck, 'player-cards');
    renderDeckToScreen(computerDeck, 'computer-cards');

    console.log("Player Deck");
    console.table(playerDeck);
    console.log("Computer Deck");
    console.table(computerDeck);
}

function renderDeckToScreen(deck, containerId) {
    console.log("rendering deck to screen");
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    deck.forEach(function (card) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.id = 'player-card'
        cardElement.setAttribute('data-name', `${card.name}`)
        cardElement.setAttribute('data-attack', `${card.attack}`)
        cardElement.setAttribute('data-defense', `${card.defense}`)
        cardElement.setAttribute('data-force', `${card.force}`)
        cardElement.setAttribute('data-side', `${card.side}`)
        cardElement.innerHTML = `
                <div class="flip-card" tabIndex="0">
                    <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <img src="assets/images/cards/${card.imageName}" class="card-image" alt="Front of ${card.name}">
                    </div>
                    <div class="flip-card-back">
                        <img src="assets/images/cards/card_basic_back.png" class="card-image" alt="Back of Card">
                    </div>
                    </div>
                </div>
        `;
        container.appendChild(cardElement);
    });
}

// ---------------- 


// ----------------- DO select attribute values for each card 


function displayAttribute(attribute) {
    console.log(`Attribute ${attribute} selected`);
    const playerCard = document.querySelector("#player-cards .card:last-child");
    const computerCard = document.querySelector("#computer-cards .card:last-child");
    let playerValue;
    let computerValue;

    if (playerCard) {
        playerValue = playerCard.dataset[attribute];
        console.log(`${attribute} playerValue:`, playerValue);
    }
    if (computerCard) {
        computerValue = computerCard.dataset[attribute];
        console.log(`${attribute} computerValue:`, computerValue);
        const flipCard = document.querySelector("#computer-cards .card:last-child .flip-card");
        if (flipCard) {
          flipCard.classList.add("flipped");
        }
    }

    if (playerCard && computerCard) {
        const compareCards = (playerValue, computerValue) => playerValue > computerValue ? 'A' : playerValue < computerValue ? 'B' : 'Tie';
        let result = compareCards(playerValue, computerValue);
        console.log(result);

        if (result === 'A') {
            // Player wins
            playerWins++;
            console.log(`You win! Player wins: ${playerWins}, Computer wins: ${computerWins}`);
            // console.log(`${userSide === 'light' ? 'The Force is strong' : 'The Dark side prevails'} with ${playerCard.name}! ${userSide === 'light' ? 'Light' : 'Dark'} Side wins the round with ${attribute}.`);
            playerDeck.unshift(playerDeck.pop(), computerDeck.pop());
            console.log(`Awesome work, here is some money credits!`);
        } else if (result === 'B') {
            // Computer wins
            computerWins++;
            console.log(`Computer wins! Player wins: ${playerWins}, Computer wins: ${computerWins}`);
            // console.log(`${userSide === 'light' ? 'The Dark side prevails' : 'The Force is strong'} with ${computerCard.name}! ${userSide === 'light' ? 'Dark' : 'Light'} Side wins the round with ${attribute}.`);
            computerDeck.unshift(playerDeck.pop(), computerDeck.pop());
        } else {
            // None wins
            console.log("It's a tie! Both cards are discarded into the Sarlacc pit.");
            playerDeck.pop();
            computerDeck.pop();
        }

        document.getElementById("player-wins").innerText = playerWins;
        document.getElementById("computer-wins").innerText = computerWins;

        const attrButtons = document.getElementsByClassName("attr-button");
        for (let i = 0; i < attrButtons.length; i++) {
            attrButtons[i].style.display = "none";
        }
        
        setTimeout(() => {
            checkGameEnd();
            renderDeckToScreen(playerDeck, 'player-cards');
            renderDeckToScreen(computerDeck, 'computer-cards');
            
            document.getElementById("play-card").style.display = "block";
  
            console.log(`Player's deck size: ${playerDeck.length}`);
            console.log(`Computer's deck size: ${computerDeck.length}`);
        }, 3000);
    }
}


function displayAttributeButtons() {
    const buttonsContainer = document.querySelector('.buttons');
    const attributes = ['attack', 'defense', 'force'];

    //   attributes.forEach(attribute => {
    //     const button = document.querySelector(`.button[data-attribute="${attribute}"]`);
    //   });

    // Add event listener outside the loop
    buttonsContainer.addEventListener('click', function (event) {
        const button = event.target.closest('.button');
        if (button) {
            const attribute = button.dataset.attribute;
            button.addEventListener('click', () => {
                event.stopPropagation();
                displayAttribute(attribute);
            });
        }
    });
}



// send attrs. to compare player / computer


function selectCardAttribute() {
    // flip card Over on click
    const cards = document.querySelectorAll('.flip-card');
    cards.forEach(card => {
        card.addEventListener('click', function () {
            this.classList.toggle('flipped');
            // displayAttribute(this);
        });
    });

    displayAttributeButtons();
}

selectCardAttribute();

function updateGameResult(result) {
    console.log("Result:", result);
}

function checkGameEnd() {
    let result = '';
    if (playerDeck.length === 0 || computerDeck.length === 0) {
        if (playerDeck.length < 1) {
            computerGameWins++;
            result = "computer wins"; // Assign the result
            console.log(result); // Log the result variable
        } else {
            playerGameWins++;
            result = "player wins"; // Assign the result
            console.log(result); // Log the result variable
        }
        updateGameResult(result); // Pass the result to updateGameResult
        playRound();

        // Display victory screen when game ends
        victoryScreen.style.display = "flex";

        playerWins = 0;
        computerWins = 0;

        document.getElementById("game-win").innerHTML = `<span>Game Wins</span>  ${playerGameWins}`;
        document.getElementById("game-lost").innerHTML = `<span>Game Losses</span>  ${computerGameWins}`;
        victoryScrren.style.display = "block";
        mainLoginScreen.style.display = "none";
        mainGameScreen.style.display = "none";
        gameCount.style.display = "none";
        winCount.style.display = "none";
    }
}

function playCard() {
  console.log('button click registered this one');
  // hide play card button
  document.getElementById("play-card").style.display = "none";


  // flip player card
  const playerCard = document.querySelector("#player-cards .card:last-child .flip-card");
  if (playerCard) {
    playerCard.classList.add("flipped");
  }
  
  console.log(playerCard.parentElement.getAttribute('data-name'));
  let cardName = playerCard.parentElement.getAttribute('data-name')
  
  
  for (let i = 0; i < characters.length; i++) {
    if (characters[i].name == cardName) {
        let sfxName = (characters[i].sfxName)
        console.log(`playing ${sfxName}`)
        new Audio(`assets/sfx/${sfxName}`).play();
    }
}
    
    

  // reveal attr buttons
  const attrButtons = document.getElementsByClassName("attr-button");
  for (let i = 0; i < attrButtons.length; i++) {
    attrButtons[i].style.display = "block";
  }
}

function playRound() {
    initCards();
    checkGameEnd();
    document.getElementById("next-round").style.display = "none";
    document.getElementById("play-card").style.display = "block";
}


document.getElementById("next-round").addEventListener("click", playRound);
document.getElementById("play-card").addEventListener("click", playCard);


// ------------------------------------------------------------------------ 

//     const compareCards = (playerCard, computerCard, attribute) => playerCard[attribute] > computerCard[attribute] ? 'A' : playerCard[attribute] < computerCard[attribute] ? 'B' : 'Tie';


// function selectCardAttribute() {}
// function compareCards() {}

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