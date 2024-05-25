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
let gameOverScreen = document.getElementById("game-over-screen");
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
    gameOverScreen.style.display = "none";
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