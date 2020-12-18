const cards = document.querySelectorAll('.memory-card');
const scoreboard = document.getElementById('scoreboard');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let score = 0;
scoreboard.innerText = `Score: ${score}`;

function flipCard() {
  if(lockBoard) return;
  if(this === firstCard) return;

  this.classList.add('flip');
  
  if(!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    score++;
    scoreboard.innerText = `Score: ${score}`;

    return;
  }
    secondCard = this;
    score++;
    scoreboard.innerText = `Score: ${score}`;

    matchCheck();
}

function matchCheck(){
  let isMatch = firstCard.dataset.image === secondCard.dataset.image;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard()
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard()
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12)
    card.style.order = randomPos;
  });
})();


cards.forEach(card => card.addEventListener('click', flipCard));