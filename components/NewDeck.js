import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { black, white } from '../utils/colors'
import t from 'tcomb-form-native'

const Form = t.form.Form;

const label = 'Deck Title'

const deckTitle = t.struct({
  [label]: t.String
})

const optionsForm = {
  fields: {
    title: {
      error: 'The title can not be empty'
    }
  },
  auto: 'placeholders'
}

class NewDeck extends Component {

  handleSubmit = () => {
    //SAVE DATA FIRST
    const value = this._form.getValue() // use that ref to get the form value
    console.log('value: ', value)
    //this.props.navigation.navigate('DecksList')
  }
  
  render() {
    return (
      <View style={styles.center} >
        <Text style={{fontSize: 34, textAlign: 'center', marginBottom: 12}}>
          What is the title of your new deck?
        </Text>
        <Form 
          style={styles.form}
          ref={form => this._form = form}
          type={deckTitle}
          options={optionsForm} />
        <TouchableOpacity 
          style={[styles.button]}
          onPress={this.handleSubmit}>
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
    //alignItems: 'center',
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

export default NewDeck