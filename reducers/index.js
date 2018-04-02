import { combineReducers } from 'redux'
import { RECEIVE_DECKS,
         ADD_DECK,
         ADD_CARD,
         SELECT_DECK,
         DESELECT_DECK } from '../actions'

const decks = (state = {}, action) => {
  console.log(action)
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...JSON.parse(action.decks)
      }
    case ADD_DECK : 
      return {
        ...state,
        [action.deckTitle]: {
          title: action.deckTitle,
          questions: []
        }
      }
    case ADD_CARD :
      console.log(state[action.deckTitle].questions)
      const questions = state[action.deckTitle].questions
      return {
        ...state,
        [action.deckTitle]: {
          ...state[action.deckTitle],
          questions : [...questions,
                      action.card]
        }
      }
    default: 
      return state
  }
}


const selectedDeck = (state = {
  deck: null
}, action) =>  {
  switch (action.type) {
    case SELECT_DECK:
      return {
        deck: action.deck
      }
    case DESELECT_DECK:
      return {
        deck: null
      }
    case ADD_CARD :
      const questions = state.deck.questions
      return {
        deck: {
           ...state.deck,
           questions: [ ...questions,
              action.card
           ]
        }
      }
    default:
      return state
  }
}

export default combineReducers({
  decks,
  selectedDeck
})