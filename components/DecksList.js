import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, AsyncStorage } from 'react-native'
import DeckItem from './DeckItem'
import { getDecks } from '../utils/api' 
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { white } from '../utils/colors'
import { receiveDecks } from '../actions'
import { connect } from 'react-redux'

const emptyComponent = () => {
  return (
    <View style={styles.center}>
      <MaterialCommunityIcons name='cards' size={60}/>
      <Text style={{fontSize: 30}}>
        No Decks created
      </Text>
    </View>
  )
}

class DecksList extends Component {
  
  state = {
    decks: {}
  }

  componentDidMount() {
    const {dispatch } = this.props

    getDecks()
      .then(decks => dispatch(receiveDecks(decks)))
    //AsyncStorage.clear()
  }

  render() {
    const { decks } = this.props
    console.log(decks)
    return (
      <View style={{backgroundColor:'#e2e2e2', flex: 1}}>
        <FlatList
          data={Object.keys(decks).map(key => decks[key])}
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

const styles = StyleSheet.create({
  center: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:'50%'
  }
})

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps
)(DecksList) 