// Hello.
//
// This is JSHint, a tool that helps to detect errors and potential
// problems in your JavaScript code.
//
// To start, simply enter some JavaScript anywhere on this page. Your
// report will appear on the right side.
//
// Additionally, you can toggle specific options in the Configure
// menu.

// Hello.
//
// This is JSHint, a tool that helps to detect errors and potential
// problems in your JavaScript code.
//
// To start, simply enter some JavaScript anywhere on this page. Your
// report will appear on the right side.
//
// Additionally, you can toggle specific options in the Configure
// menu.

/* jshint esversion: 6 */


/**
 * Add an event listener to the document and run the main screen with user log-in
 */
document.addEventListener('DOMContentLoaded', function () {
    runMainScreen();
});


document.getElementById("sound-on").style.display = "block";
document.getElementById("sound-off").style.display = "none";

document.getElementById("sound-on").addEventListener("click", function() {
    document.getElementById("sound-on").style.display = "none";
    document.getElementById("sound-off").style.display = "block";
});

document.getElementById("sound-off").addEventListener("click", function() {
    document.getElementById("sound-off").style.display = "none";
    document.getElementById("sound-on").style.display = "block";
});


/**
 * Set up of game variables to vary display/hide
 */
let mainLoginScreen = document.getElementById("login-screen");
let getInstructions = document.getElementById("instructions-icon");
let errorMessage = document.getElementById("error-message");
let mainGameScreen = document.getElementById("main-game-container");
let victoryScreen = document.getElementById("victory-screen");
let gameOverScreen = document.getElementById("game-over-screen");
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
    gameOverScreen.style.display = "none";
    gameCount.style.display = "none";
    winCount.style.display = "none";
    document.getElementById("user-icon").style.display = "none";
    document.getElementById("victory-screen").style.display = "none";
    document.getElementById("username").innerText = "";
    document.getElementById("user").focus(); //focus on input element with cursor ready for username input
    document.getElementById('quitModal').style.display = "none";
    document.getElementById('openQuitGame').style.display = "none";
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


/**
 * Show instructions modal
 */
function showInstructions() {
    modal.classList.add("show-modal");
    document.body.classList.add('greyout-background');
}

closeBtn.addEventListener("click", closeInstructions);
closeXBtn.addEventListener("click", closeInstructions);


/**
 * Close instructions modal
 */
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


/**
 * Display a message for a short period
 * @param {string} message - The message to display
 */
function message(message) {
    document.getElementById('messageDisplay').innerHTML = message;
    setTimeout(() => {
        document.getElementById('messageDisplay').innerHTML = '';
    }, 3000);
}

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


/**
 * Shuffle a deck of cards
 * @param {Array} deck - The deck of cards to shuffle
 * @returns {Array} The shuffled deck
 */
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

// List of characters with their attributes.
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


/**
 * Initialize the game with a deck of cards
 */
function initCards() {
    let deck = [];
    characters.forEach(character => {
        deck.push(new Card(character.name, character.attack, character.defense, character.force, character.side, character.imageName));
    });

    shuffleDeck(deck);
    
    playerDeck = deck.slice(0, 5);
    computerDeck = deck.slice(6,11);

    renderDeckToScreen(playerDeck, 'player-cards');
    renderDeckToScreen(computerDeck, 'computer-cards');
}


/**
 * Render the deck of cards to the screen
 * @param {Array} deck - The deck of cards to render
 * @param {string} containerId - The ID of the HTML container element
 */
function renderDeckToScreen(deck, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    deck.forEach(function (card) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.id = 'player-card';
        cardElement.setAttribute('data-name', `${card.name}`);
        cardElement.setAttribute('data-attack', `${card.attack}`);
        cardElement.setAttribute('data-defense', `${card.defense}`);
        cardElement.setAttribute('data-force', `${card.force}`);
        cardElement.setAttribute('data-side', `${card.side}`);
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


/**
 * Handles the display of card attributes and determines the winner of each round.
 * @param {string} attribute - The attribute to compare between player and computer cards.
 */
function displayAttribute(attribute) {
    const playerCard = document.querySelector("#player-cards .card:last-child");
    const computerCard = document.querySelector("#computer-cards .card:last-child");
    let playerValue;
    let computerValue;

    if (playerCard) {
        playerValue = playerCard.dataset[attribute];
    }
    if (computerCard) {
        computerValue = computerCard.dataset[attribute];
        const flipCard = document.querySelector("#computer-cards .card:last-child .flip-card");
        if (flipCard) {
          flipCard.classList.add("flipped");
        }
    }

    if (playerCard && computerCard) {
        const compareCards = (playerValue, computerValue) => playerValue > computerValue ? 'A' : playerValue < computerValue ? 'B' : 'Tie';
        let result = compareCards(playerValue, computerValue);

        if (result === 'A') {
            // Player wins
            playerWins++;
            message('The force is strong! You win this match!');
            playerDeck.unshift(playerDeck.pop(), computerDeck.pop());
        } else if (result === 'B') {
            // Computer wins
            computerWins++;
            message('The Dark Side prevails! You have been defeated this round.');
            computerDeck.unshift(playerDeck.pop(), computerDeck.pop());
        } else {
            // None wins
            message('It\'s a tie! Both cards are discarded into the Sarlacc pit.');
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
        }, 3000);
    }
}


/**
 * Displays attribute buttons on the screen and handles their click events.
 */
function displayAttributeButtons() {
    const buttonsContainer = document.querySelector('.buttons');

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


/**
 * Checks if the game has ended and updates the game state accordingly.
 */
function checkGameEnd() {
    let result = '';
    if (playerDeck.length === 0 || computerDeck.length === 0) {
        if (playerDeck.length < 1) {
            computerGameWins++;
            result = "computer wins";

            // Display Game Over screen when computer wins
            gameOverScreen.style.display = "block";
            
            setTimeout(() => {
                gameOverScreen.style.display = "none";
            }, 3000);

        } else {
            playerGameWins++;
            result = "player wins";

            // Display Victory Screen when player wins
            victoryScreen.style.display = "block";

            setTimeout(() => {
                victoryScreen.style.display = "none";
            }, 3000);
        }
        
        playRound();

        playerWins = 0;
        computerWins = 0;

        document.getElementById("game-win").innerHTML = `<span>Game Wins</span>  ${playerGameWins}`;
        document.getElementById("game-lost").innerHTML = `<span>Game Losses</span>  ${computerGameWins}`;
    }
}


/**
 * Handles the logic when the player clicks the "Play Card" button.
 */
function playCard() {
  // hide play card button
  document.getElementById("play-card").style.display = "none";
  document.getElementById("openQuitGame").style.display = "block";


  // flip player card
  const playerCard = document.querySelector("#player-cards .card:last-child .flip-card");
  if (playerCard) {
    playerCard.classList.add("flipped");
  }
  
  let cardName = playerCard.parentElement.getAttribute('data-name');
  
  for (let i = 0; i < characters.length; i++) {
    if (characters[i].name == cardName) {
        let sfxName = characters[i].sfxName;
        if (document.getElementById("sound-on").style.display === "block") {
            new Audio(`assets/sfx/${sfxName}`).play();
        } else {
            const audio = new Audio();
            audio.pause();
        }
    }
}

  // reveal attr buttons
  const attrButtons = document.getElementsByClassName("attr-button");
  for (let i = 0; i < attrButtons.length; i++) {
    attrButtons[i].style.display = "block";
  }
}


/**
 * Starts a new round of the game by initializing the cards and checking game end conditions.
 */
function playRound() {
    initCards();
    checkGameEnd();
    document.getElementById("next-round").style.display = "none";
    document.getElementById("play-card").style.display = "block";
    document.getElementById("openQuitGame").style.display = "block";
}


/**
 * Handles the logic when the player chooses to quit the game.
 */
function quitGame() {
    mainLoginScreen.style.display = "block";
    errorMessage.style.display = "none";
    mainGameScreen.style.display = "none";
    victoryScrren.style.display = "none";
    gameCount.style.display = "block";
    winCount.style.display = "none";
    document.getElementById('quitModal').style.display = "none";
    document.getElementById('openQuitGame').style.display = "none";
    document.getElementById('user-input').style.display = "none";
}


/**
 * Handles the logic when the player chooses to cancel quitting the game.
 */
function cancelQuit() {
    document.getElementById('quitModal').style.display = "none";
    document.getElementById('openQuitGame').style.display = "block";
}


/**
 * Handles the logic when the player chooses to open the quit game modal.
 */
function openQuitGame() {
    document.getElementById('quitModal').style.display = "block";
    document.getElementById('openQuitGame').style.display = "none";
}

// Event listeners setup
document.getElementById("next-round").addEventListener("click", playRound);
document.getElementById("play-card").addEventListener("click", playCard);
document.getElementById("quitGame").addEventListener("click", quitGame);
document.getElementById("cancelQuit").addEventListener("click", cancelQuit);
document.getElementById("openQuitGame").addEventListener("click", openQuitGame);
