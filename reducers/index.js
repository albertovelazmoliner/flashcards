import { RECEIVE_DECKS,
         ADD_DECK,
         ADD_QUESTION } from '../actions'

function decks (state = {}, action) {
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
    case ADD_QUESTION : 
      return {
        ...state,
        [action.deckTitle]: {
          questions:[
            ...questions,
            {
              question: action.newQuestion.question,
              answer: action.newQuestion.answer
            }
          ]
        }
      }
    default: 
      return state
  }
}

export default decks