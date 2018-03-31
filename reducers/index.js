import { RECEIVE_DECKS,
         ADD_DECK,
         ADD_CARD } from '../actions'

function decks (state = {}, action) {
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

export default decks