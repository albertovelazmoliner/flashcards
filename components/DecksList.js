import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, AsyncStorage, StatusBar, Platform } from 'react-native'
import DeckItem from './DeckItem'
import { getDecks } from '../utils/api' 
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { white } from '../utils/colors'
import { receiveDecks, selectDeck } from '../actions'
import { connect } from 'react-redux'
import { Constants } from 'expo'

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
  }

  onPressItem = (deck) => {
    const {dispatch } = this.props
    console.log(deck)
    dispatch(selectDeck(deck))
    this.props.navigation.navigate('Deck', { deck })
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
              onPress={this.onPressItem}
            />
          }
          ListEmptyComponent={emptyComponent}
          keyExtractor={(item, index) => index}
          style={{marginTop: (Platform.OS == 'ios') ? 24 : 0}}
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

function mapStateToProps (state) {
  return {
    decks : state.decks
  }
}

export default connect(
  mapStateToProps
)(DecksList) 