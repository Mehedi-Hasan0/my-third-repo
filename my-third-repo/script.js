'use strict';

// Selecting Element
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');


// Starting conditions
score0EL.textContent = 0;
score1EL.textContent = 0;
diceEL.classList.add('hidden');  

let scores = [ 0, 0 ];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0EL.classList.toggle('player--active');
    player1EL.classList.toggle('player--active');
}

const resetGame = function () {
    scores = [ 0, 0 ];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0EL.textContent = 0;
    score1EL.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEL.classList.add('hidden');  
    player0EL.classList.remove('player--winner');
    player0EL.classList.remove('player--winner');
    player0EL.classList.add('player--active');
    player0EL.classList.remove('player--aactive');

}
resetGame();

// Rolling dice functionality 
btnRoll.addEventListener('click', function () {
    if (playing) {
     // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6 ) + 1; 
    console.log(dice);

    // 2. Display dice
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`

     // 3. check for rolled 1: if true, switch to next player
    if( dice!==1 ) {
        // Add dice to the current score
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;

    } else {
        //Switch to next player
        switchPlayer();

    }

    }

});

btnHold.addEventListener('click', function () {
    if (playing) {
    // 1. Add current score to active player

    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores [activePlayer];

    // 2. Check if player's score is >= 100;

    if (scores[activePlayer] >= 100 ) {
        // Finish the game

        playing = false;
        diceEL.classList.add('hidden');
        document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
        document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

    } else {
     // Switch to next player
    switchPlayer();

    }

    }
});

btnNew.addEventListener('click', resetGame);