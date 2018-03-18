import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { black, white } from '../utils/colors';

class NewDeck extends Component {
  onSubmit = () => {
    //SAVE DATA FIRST
    this.props.navigation.navigate('DecksList')
  }
  render() {
    return (
      <View style={styles.center}>
        <Text>
          What is the title of your new deck?
        </Text>
        <TextInput placeholder="Deck Title"/>
        <TouchableOpacity style={styles.button}
          onPress={this.onSubmit}>
          <Text style={styles.buttonText}>
            Submit
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
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

export default NewDeck