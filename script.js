'use strict'

// selecting the player element
const actPlayer0 = document.querySelector('.player--0');
const actPlayer1 = document.querySelector('.player--1');
// 2 ways to call any element by ID
// selecting the score element
const totScore0 = document.querySelector('#score--0');
const totScore1 = document.getElementById('score--1');
// selecting the current score element
let curScr0 = document.getElementById('current--0')
let curScr1 = document.getElementById('current--1')
// selecting the dice image element
let dice = document.querySelector('.dice');
// selecting all button element
const newBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');


// **********starting condition***************
// select total score 0 for both the players at the beginning
totScore0.textContent = 0;
totScore1.textContent = 0;
// hide the dice image at the beginning
dice.classList.add('hidden');

// reusable function
const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScr = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    actPlayer0.classList.toggle('player--active');
    actPlayer1.classList.toggle('player--active');
}

const scores = [0, 0];
let activePlayer = 0;
let currentScr = 0;
let playing = true; // state variable

// rolling the dice
rollBtn.addEventListener('click', function () {

    if (playing) {
        // 1. generate random number
        let rn = Math.floor(Math.random() * 6) + 1;
        console.log(rn);

        // 2. display the dice
        dice.classList.remove('hidden');  // 1st remove the hidden class 
        dice.src = `dice-${rn}.png`; // select the 'src' attribute of dice class and set the file name of image


        // 3. check for rolled dice 1: if true, switch player
        if (rn != 1) {
            // a. add random number to the current score
            currentScr += rn;
            document.getElementById(`current--${activePlayer}`).textContent = currentScr;

        } else {
            // b. switch player
            switchPlayer();
        }
    }
})

// holding the score
holdBtn.addEventListener('click', function () {
    if (playing) {
        // 1. add current score to the total score
        scores[activePlayer] += currentScr;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        document.getElementById(`current--${activePlayer}`).textContent = 0;

        // 2. check total score >= 100
        if (scores[activePlayer] >= 100) {
            // if true, finish game
            playing = false; // user no longer able to play the game
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            // document.getElementById(`score--${activePlayer}`).textContent = "Has won the game";
            dice.classList.add('hidden');

        } else {
            // if false, switch player 
            switchPlayer();
        }
    }
})

// resetting the game

/*
newBtn.addEventListener('click', function () {
    // playing = true;
    totScore0.textContent = 0;
    totScore1.textContent = 0;
    curScr0.textContent = 0;
    curScr1.textContent = 0;

    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    
    activePlayer = 0;
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active');

})
*/

newBtn.addEventListener('click', function () {
    // using location.reload() methode which is the same as refresh button do
    document.location.reload();
})
