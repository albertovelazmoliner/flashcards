import React, { Component } from 'react'
import { Text,
         TextInput,
         TouchableOpacity,
         StyleSheet,
         StatusBar,
         Button,
         Platform,
         KeyboardAvoidingView } from 'react-native'
import { black, white, blue, blueDisabled, red } from '../utils/colors'
import t from 'tcomb-form-native'
import { saveDeck, getDeck } from '../utils/api'
import { connect } from 'react-redux'
import { addDeck, selectDeck } from '../actions'
import { updateFormStyle } from '../utils/helper';

var _ = require('lodash')

const Form = t.form.Form;

const stylesheet = updateFormStyle(_.cloneDeep(t.form.Form.stylesheet))

const label = 'Deck Title'

const deckTitle = t.struct({
  [label]: t.String
})

const optionsForm = {
  fields: {
    [label]: {
      error: 'The title can not be empty',
      stylesheet: stylesheet,
      placeholderTextColor: blueDisabled,
      selectionColor: blue
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
    if (value) {
      console.log('value: ', value[label])
      this.props.dispatch(addDeck(value[label]))

      saveDeck(value[label])
      .then(() => getDeck(value[label]))
      .then( deck => {
        this.setState({newName: null})
        this.props.dispatch(selectDeck(deck))
        this.props.navigation.navigate('Deck', { deck })
      }).catch(error => console.log(error))
    }
  }
  
  render() {
    return (
      <KeyboardAvoidingView style={[styles.center]} behavior="padding">
        <Text style={{fontSize: 34, textAlign: 'center', marginBottom: 12, color: blue}}>
          What is the title of your new deck?
        </Text>
        <Form 
          style={styles.form}
          ref={form => this._form = form}
          type={deckTitle}
          value={this.state.newName}
          options={optionsForm} />
        <Button 
          onPress={this.handleSubmit}
          color={blue}
          title='Submit'>
        </Button>
      </KeyboardAvoidingView>
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
    backgroundColor: blue,
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