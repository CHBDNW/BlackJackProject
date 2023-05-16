fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=2")
.then(resp => resp.json())
.then(cards => {
    const deckId = cards.deck_id
    return deckId


})

cards(console.log(deckId))





    


