'use strict';
//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const p1ScoreEl = document.querySelector('#score--0');
const p2ScoreEl = document.querySelector('#score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//rewrite variables on the outer scope to be used globally.
let scores, currentScore, activePlayer, isPlaying;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;
  p1ScoreEl.textContent = 0;
  p2ScoreEl.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  //if the class is in the array than it will do something else it will add it.
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//function for rolling the dice.
btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    //1.generate a random num in roll.
    const dice = Math.floor(Math.random() * 6) + 1;

    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. Check for rolled 1: if true you swap to next player.
    if (dice !== 1) {
      //Add the dice to the current score.
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to the next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  //1. Add current score to active player score.
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  //2. Check if player's score is >= 100 end the game.
  if (scores[activePlayer] >= 20) {
    isPlaying = false;
    diceEl.classList.add('hidden');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
  } else {
    //3. Switch to next player.
    switchPlayer();
  }
});

//resetting the game
btnNew.addEventListener('click', function () {
  init();
});
