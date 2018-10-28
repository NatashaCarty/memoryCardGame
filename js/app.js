//used starter zip folder for Memory Game project from Udacity

var count = 0;
var matchCount = 0;
var cardOne, cardTwo;
var match = true;
var turnCount = 0;
var starNumber = 3;
var timer = 0.0;
var start;

 //creates an array of the card elements, shuffles them, and
 //reapplies the card elements to the DOM
 function getCards() {
   var cardsArray = [].slice.call(document.querySelectorAll('.card'));
   var cards = shuffle(cardsArray);
   var deck = document.querySelector('.deck');
   deck.innerHTML = "";
   for (var i = 0; i < cardsArray.length; i++) {
     deck.appendChild(cardsArray[i]);
   }
 }
 getCards();


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


//adds event listener to cards
(function() {
    pageCopy = document.querySelector('.container');
    let cards = document.querySelectorAll('.card');
    for (var i = 0; i < cards.length; i++){
      cards[i].addEventListener('click', function(){
        opened(this);
    });
  }
  resetGame();
  newGameButton();
}) ();

//flips cards over and determines if they are a match
function opened(card) {
  if(turnCount == 0){
    start = new Date().getTime()
  }
  if (!card.classList.contains('match') && !card.classList.contains('open')){
    if (count == 0){
      cardOne = card;
      card.className += ' show open';
      count++;
    }else if (count == 1){
      cardTwo = card;
      card.className += ' show open';
      count = 0;
      if (cardOne.childNodes[1].className == cardTwo.childNodes[1].className){
        cardMatch(cardOne, cardTwo);
      } else {
        match = false;
        flipBack();
      }
    }
    moveCounter();
  }
}

//locking cards open
function cardMatch(one, two){
  one.className += ' match';
  two.className += ' match';
  match = true;
  matchCount++;
}

//flips the card back over if they are not a match
async function flipBack(){
  if (turnCount != 0 && !match){
    await sleep(500);
    cardOne.className = 'card';
    cardTwo.className = 'card';
  }
}

//sleep function creates a delay between command runs
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//increments the move counter if the game is a winner calls the winner function
function moveCounter(){
  turnCount ++;
  starCount();
  document.querySelector('.moves').innerText = turnCount;
  if (matchCount == 8){
    winner();
  }
}


//displays an alert after the game is won
async function winner() {
  await sleep(500);
  document.querySelector('.endMoves').innerText = turnCount;
  document.querySelector('.container').className = "hide";
  document.querySelector('.winner').className = "";
  document.querySelector('.starNumber').innerText = starNumber;
  document.querySelector('.finalTime').innerText = timer;

}

//removes stars when reaching designated move count
//decrements starNumber
function starCount(){
  var stars = document.querySelector('.stars');
  if (turnCount == 21){
    stars.removeChild(stars.childNodes[5]);
    starNumber --;
    console.log(starNumber);
  }
  if (turnCount == 31){
    stars.removeChild(stars.childNodes[3]);
    starNumber --;
    console.log(starNumber);
  }
}


//resets the game board
function resetGame(){
  let restart = document.querySelector('.restart');
  restart.addEventListener('click', function(){
    document.location.reload();
  });
}


function newGameButton(){
  let newGame = document.querySelector('.newGame');
  newGame.addEventListener('click', function(){
    document.location.reload();
  });
}

// //keeps game timer https://www.sitepoint.com/creating-accurate-timers-in-javascript/
window.setInterval(function() {
  if(start != null) {
    var elapsedTime = new Date().getTime() - start;
    timer = Math.floor(elapsedTime / 100) / 10;
    if(Math.round(timer) == timer) { timer += '.0';}
    document.querySelector('.timer').innerText = timer;
  }
}, 100);
