import { AsyncStorage } from 'react-native'

const DECK_STORAGE_KEY = 'velazStorage:flashcards'

export const getDecks = () =>  {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
      .then(addBaseData)
      .catch(error => console.log(error))
}

export const getDeck = id => {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
  .then(results => {
    return JSON.parse(results)[id]
  })
}

export const saveDeck = deckTitle => {
  console.log(deckTitle)
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [deckTitle]: {
      title: deckTitle,
      questions: []
    }
  }))
}

export const addCardToDeck = (title, card) => {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
  .then(results => {
    const data = JSON.parse(results)
    data[title].questions.push(card)
    return AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
  })
}

export const addBaseData = (results) => {
  return results === null
  ? setDummyData()
  : results
}

const setDummyData = () => {
  const stringifyDekcs = JSON.stringify(mockDecks)
  console.log(stringifyDekcs)
  AsyncStorage.setItem(DECK_STORAGE_KEY, stringifyDekcs)
  return stringifyDekcs
}

const mockDecks = {
"React": {
    "title" : "React",
    "questions": [
      {
        "question" : "What is React?",
        "answer": "A library for managing user interfaces"
      },
      {
        "question" : "Where do you make Ajax requests in React?",
        "answer": "The componentDidMount lifecycle event"
      },
      {
        "question" : "What are the features of React?",
        "answer": "Major features of React are listed below:\n- It uses the virtual DOM instead of the real DOM.\n- It uses server-side rendering.\n- It follows uni-directional data flow or data binding."
      }
    ]
  },
  "JavaScript": {
    "title": "JavaScript",
    "questions": [
      {
        "question" : "What is a closure?",
        "answer": "The combination of a function and the lexical environment within which that function was declared."
      },
      {
        "question" : "What is NaN?",
        "answer": "The NaN property represents a value that is \"not a number\". This special value results from an operation that could not be performed either because one of the operands was non-numeric (e.g., \"abc\" / 4), or because the result of the operation is non-numeric."
      }
    ]
  }
}
