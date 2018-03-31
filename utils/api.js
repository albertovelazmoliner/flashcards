import { AsyncStorage } from 'react-native'

const DECK_STORAGE_KEY = 'velazStorage:flashcards'

export const getDecks = () =>  {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
}

export const getDeck = id => {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
  .then(results => {
    console.log(results)
    return results[id]
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