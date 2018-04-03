import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native'
import PropTypes from 'prop-types'
import { black, white } from '../utils/colors'
import { Constants } from 'expo'
import { Header } from 'react-navigation'
import { connect } from 'react-redux'


class Deck extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.deck.title
    }  
  }

  handleAdd = () => {
    this.props.navigation.navigate('AddCard', { title:'Add Card', deckTitle: this.props.deck.title })
  }

  handleStart = () => {
    this.props.navigation.navigate('Quiz')
  }

  render() {

    const { title, questions } = this.props.deck
    
    var cardsLabel = `${questions.length} cards`

    return (
      <View>
        <Text style={[styles.centerText]}>{title}</Text>
        <Text style={[styles.centerText]}>{cardsLabel}</Text>
        <TouchableOpacity 
          style={[styles.button]}
          onPress={this.handleAdd}>
          <Text style={styles.buttonText}>
            Add card
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button]}
          onPress={this.handleStart}>
          <Text style={styles.buttonText}>
            Start Quiz
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  centerText: {
    fontSize:20,
    alignSelf:'center',
    marginTop: 20,
    marginBottom: 20
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  button: {
    padding: 10,
    backgroundColor: black,
    alignSelf: 'center',
    borderRadius: 5,
    margin: 20,
  },
  buttonText :{
    color: white,
    fontSize: 20,
  }
})

function mapStateToProps (state) {
  console.log(state)
  return {
    deck : state.selectedDeck.deck
  }
}

export default connect(
  mapStateToProps
)(Deck)