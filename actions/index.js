export const RECEIVE_DECKS = "RECEIVE_DECKS"
export const ADD_DECK = "ADD_DECK"
export const ADD_QUESTION = "ADD_QUESTION"

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

export const addQuestion = (deckTitle, newQuestion) => {
  return {
    type: ADD_QUESTION,
    deckTitle,
    newQuestion
  }
} 