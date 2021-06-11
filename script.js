'use strict';
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

score0El.textContent =0;
score1El.textContent =0;
let playing = true;
diceEl.style.display = 'none';


let currentScore = 0;
let activePlayer = 0;

const scores = [0,0];

const switchPlayer = function(){
		document.getElementById(`current--${activePlayer}`).textContent = 0;
		currentScore = 0;
		activePlayer = activePlayer === 0 ? 1 : 0;
		//choosing one of the active player
		player0El.classList.toggle('player--active');
		player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function() {
    if(playing){
		// let dice = Math.floor((Math.random() * 6)+1);
		let dice =Math.trunc((Math.random() * 6)+1);
		console.log(dice);
		diceEl.style.display='block';
		diceEl.src = `dice-${dice}.png`;
		if(dice != 1){
			// current player1
			currentScore += dice;
			//selecting player dyanamically
			document.getElementById(`current--${activePlayer}`).textContent = currentScore; 
		}else{
			// current player2
			switchPlayer();
		}
  	}
});
// holding events..
btnHold.addEventListener('click', function(){
	if(playing){
		scores[activePlayer] += currentScore;
		document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

		if (scores[activePlayer] >= 20) {
			playing = false;
			diceEl.style.display = 'none';
			btnHold.style.display = 'none';
			btnRoll.style.display = 'none';

			btnNew.textContent = `* PLAYER ${activePlayer+1} WON!`
			document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
			document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
		}else{		
		switchPlayer();
		}
	}
});