import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import DeckItem from './DeckItem';

const mockData = {
  React: {
    title: "React",
    questions:[
      {
        question: "What is JSX?",
        answer: "JSX is a shorthand for JavaScript XML. This is a type of file used by React which utilizes the expressiveness of JavaScript along with HTML like template syntax."
      }
    ]
  },
  JavaScript: {
    title: "JavaScript",
    questions:[
      {
        question: "What is NaN? ",
        answer: "The NaN property represents a value that is “not a number”. This special value results from an operation that could not be performed either because one of the operands was non-numeric (e.g., \"abc\" / 4), or because the result of the operation is non-numeric."
      }
    ]
  } 
}

const emptyComponent = () => {
  return (
    <View>
      No Decks created yet
    </View>
  )
}

class DecksList extends Component {
  render() {
    let decks = Object.keys(mockData).map(key => mockData[key])
    console.log(decks)
    return (
      <View style={{backgroundColor:'#e2e2e2', flex: 1}}>
        <FlatList
          data={Object.keys(mockData).map(key => mockData[key])}
          renderItem={
            ({item}) => 
            <DeckItem 
              key={item.title}
              deck={item}
            />
          }
          ListEmptyComponent={emptyComponent}
          keyExtractor={(item, index) => index}
        />
      </View>
    )
  }
}

export default DecksList