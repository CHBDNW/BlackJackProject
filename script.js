// Establish variables and constants
let deck = null;
let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
const playerHandEl = document.getElementById("player-cards");
const dealerHandEl = document.getElementById("dealer-cards");
const playerScoreEl = document.getElementById("player-score");
const dealerScoreEl = document.getElementById("dealer-score");
const hitButton = document.getElementById("hit-button");
const standButton = document.getElementById("stand-button");
const dealButton = document.getElementById("deal-button");

// get a shuffled deck of cards from the API and extract the deck ID
fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
  .then(response => response.json())
  .then(data => {
    deck = data.deck_id;
  });

// create a function to deal a new hand
function dealHand() {
  // reset variables and HTML elements
  playerHand = [];
  dealerHand = [];
  playerScore = 0;
  dealerScore = 0;
  playerHandEl.innerHTML = "";
  dealerHandEl.innerHTML = "";
  playerScoreEl.textContent = "Score: 0";
  dealerScoreEl.textContent = "Score: 0";
// deal two cards to the player and one card to the dealer
  dealCard(playerHand);
  dealCard(playerHand);
  dealCard(dealerHand);
// Update the HTML elements to show the initial hands and score
  updateHands();
}

// function to deal a card from the deck to a given hand utilizing the deck ID of the current deck
function dealCard(hand) {
  fetch(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`)
    .then(response => response.json())
    .then(data => {
      const card = data.cards[0];
      hand.push(card);
      updateScore(hand);
      updateHands();
      checkWin();
    });
}

// function to calculate the score of a given hand
function calculateScore(hand) {
    let score = 0;
    let aces = 0;
  
    for (let card of hand) {
      if (card.value === "ACE") {
        score += 11;
        aces++;
      } else if (card.value === "KING" || card.value === "QUEEN" || card.value === "JACK") {
        score += 10;
      } else {
        score += parseInt(card.value);
      }
    }
    while (aces > 0 && score > 21) {
      score -= 10;
      aces--;
    }
  
    return score;
  }
  
// function that updates the score of a given hand
function updateScore(hand) {
  let score = calculateScore(hand);
  if (hand === playerHand) {
    playerScore = score;
    playerScoreEl.textContent = `Score: ${playerScore}`;
  } else {
    dealerScore = score;
    dealerScoreEl.textContent = `Score: ${dealerScore}`;
  }
}

// function that updates the HTML elements to show the current hands
function updateHands() {
  playerHandEl.innerHTML = playerHand
    .map(card => `<img src="${card.image}" alt="${card.value} of ${card.suit}">`)
    .join("");
  dealerHandEl.innerHTML = dealerHand
    .map(card => `<img src="${card.image}" alt="${card.value} of ${card.suit}">`)
    .join("");
}
// add click event listners for the buttons 
hitButton.addEventListener("click", () => {
    dealCard(playerHand);
  });
  
  standButton.addEventListener("click", () => {
    dealerTurn()
  });
  
  dealButton.addEventListener("click", () => {
    dealHand();
  });
  
  function dealerTurn() {
    if (dealerScore < playerScore) {
        dealCard(dealerHand)
    }
  }
  
  // Check if a player has won or lost
  function checkWin() {
    if (playerScore > 21) {
     alert("Player busts! Dealer wins.");
    } else if (dealerScore > 21) {
      alert("Dealer busts! Player wins.");
    } else if (playerScore === 21 && playerScore > dealerScore) {
      alert("Player wins with Blackjack!");
    } else if (dealerScore === 21) {
      alert("Dealer wins with Blackjack!");
    }
  }