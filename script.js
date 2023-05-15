fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=2")
.then((resp) => resp.json())
.then(data => {
    addNewCard(data);
    console.log(data) 
})

function addNewCard(card){
    const newCardImg = card.cards[0].image
    const newCardImageElement = document.createElement("img")
    newCardImageElement.src = newCardImg
    const playerCardsElement = document.getElementById('player-cards');
  playerCardsElement.appendChild(newCardImageElement);
}

  
  
  
  
  
  
   
  
  
  
  
  
  
  