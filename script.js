fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=1")
.then((resp) => resp.json())
.then(card => console.log(card))