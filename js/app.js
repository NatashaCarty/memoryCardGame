
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
    let cards = document.querySelectorAll('.card');
    for (var i = 0; i < cards.length; i++){
      cards[i].addEventListener('click', function(){
        opened(this);
    });
  }
}) ();

//flips cards over and determines if they are a match
function opened(card) {
  if (!card.classList.contains('match') || !card.classList.contains('open')){
    if (count == 0){
      cardOne = card;
      card.className += ' show open';
      count++;
    }else if (count == 1){
      cardTwo = card;
      card.className += ' show open';
      count = 0;
      if (cardOne.childNodes[1].className == cardTwo.childNodes[1].className){
        console.log('test');
      }
    }
  }
}



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
