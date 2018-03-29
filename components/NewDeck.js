import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native'
import { black, white } from '../utils/colors'
import t from 'tcomb-form-native'
import { saveDeck } from '../utils/api'
import { connect } from 'react-redux'
import { addDeck } from '../actions'

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
  state = {
    newName: null
  }

  handleSubmit = () => {
    const value = this._form.getValue() // use that ref to get the form value
    console.log('value: ', value[label])
    this.props.dispatch(addDeck(value[label]))

    saveDeck(value[label]).then(() => {
      this.setState({newName: null})
      this.props.navigation.navigate('DecksList')
    }).catch(error => console.log(error))
  }
  
  render() {
    return (
      <View style={[styles.center]} >
        <Text style={{fontSize: 34, textAlign: 'center', marginBottom: 12}}>
          What is the title of your new deck?
        </Text>
        <Form 
          style={styles.form}
          ref={form => this._form = form}
          type={deckTitle}
          value={this.state.newName}
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

export default connect()(NewDeck)