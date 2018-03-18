import { AsyncStorage } from 'react-native'

const DECK_STORAGE_KEY = 'velazStorage:flashcards'

export const getDecks = () =>  {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
}

export const getDeck = id => {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
  .then(results => {
    return results[id]
  })
}

export const saveDeckTitle = title => {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [title]: {
      title: title
    }
  }))
}

export const addCardToDeck = (title, card) => {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [title]: {
      questions: [
        ...questions,
        {
          question: card.question,
          answer: card.answer
        }
      ]
    }
  }))
}