// current hilight key
let current_key = "";
// first page
let first_page = document.getElementById("first");
let first_classes = first_page.classList;
// second page
let second_page = document.getElementById("second");
let second_classes = second_page.classList;
// third page
let third_page = document.getElementById("third");
let third_classes = third_page.classList;
// life & scroe
let life = 10;
let score = 0;


// Preload audio elements
const bgMusic = new Audio("./audio/relaxing-guitar-loop-v5-245859.mp3"); // Background music
const mistrackSound = new Audio("./audio/mixkit-retro-game-notification-212.wav"); // Sound for incorrect key press
// Set looping for background music
bgMusic.loop = true;


// detect keyboard key press
document.addEventListener("keyup", function (event) {
    // identyfy the key
    const key = event.key.toLowerCase();

    // if third page is open
    third_classes[0] !== "hidden" && key === "enter" && change_page("third", "second");
    third_classes[0] !== "hidden" && key === "backspace" && change_page("third", "first");
    if (third_classes[0] === "hidden") {
        document.getElementById("finalResult").innerText = score;
    }

    // if second page is open
    second_classes[0] !== "hidden" && key === "backspace" && change_page("second", "third");
    second_classes[0] !== "hidden" && gameRun(key);

    // if first page is open
    first_classes[0] !== "hidden" && key === "enter" && change_page("first", "second");
});

// genarate key highlighter
const makeKey = () => {
    const key = generateRandomKey();
    current_key = key;
    document.getElementById("show_key").innerText = key.toUpperCase();
    const new_kbd = document.getElementById(key);
    new_kbd.classList.add("bg-yellow-400");
    new_kbd.classList.add("glass");
};
// for first visit page
makeKey();

// universel change page function
const change_page = (currentPage, nextPage) => {
    life = 10;
    score = 0;
    const firstPage = document.getElementById(currentPage);
    const secondPage = document.getElementById(nextPage);
    firstPage.classList.add("hidden");
    secondPage.classList.remove("hidden");

    if (nextPage === "second") {
        startGame();
    } else {
        stopGame();
    }
};


// word genarator
function generateRandomKey() {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    return letters[Math.floor(Math.random() * letters.length)];
};

// count point or negative health
function gameRun(key) {
    // 
    if (second_classes[0] !== "hidden" && key !== "backspace" && key !== "enter") {

        // 
        if (key !== current_key) {
            mistrackSound.play();
            mistrackSound.currentTime = 0;
        }
        // handle score & life
        key === current_key ? score += 1 : life -= 1;
        life < 1 && change_page("second", "third");

        // remove old btn
        document.getElementById(current_key).classList.remove("bg-yellow-400", "glass");

        // change current_key
        makeKey();
    }

    // update data
    document.getElementById("life").innerText = life;
    document.getElementById("score").innerText = score;
}
const startGame = () => {
    if (!document.getElementById("second").classList.contains("hidden")) {
        bgMusic.play();
    }
};
// Function to stop the game and stop music
const stopGame = () => {
    bgMusic.pause();
    bgMusic.currentTime = 0; // Reset music to the beginning
};