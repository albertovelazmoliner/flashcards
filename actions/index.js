export const RECEIVE_DECKS = "RECEIVE_DECKS"
export const ADD_DECK = "ADD_DECK"
export const ADD_CARD = "ADD_CARD"
export const SELECT_DECK = "SELECT_DECK"
export const DESELECT_DECK = "DESELECT_DECK"

export const receiveDecks = (decks) => {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export const addDeck = (deckTitle) => {
  return {
    type: ADD_DECK,
    deckTitle
  }
}

export const addCard = (deckTitle, card) => {
  return {
    type: ADD_CARD,
    deckTitle,
    card
  }
}

export const selectDeck = (deck) => {
  return {
    type: SELECT_DECK,
    deck
  }
}

export const deselectDeck = () => {
  return {
    type: DESELECT_DECK
  }
}