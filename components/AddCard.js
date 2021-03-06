import React, { Component } from 'react'
import { Text,
         TextInput,
         TouchableOpacity,
         StyleSheet,
         StatusBar,
         Button,
         Platform,
         KeyboardAvoidingView } from 'react-native'
import { black, white, green, blue, red, blueDisabled } from '../utils/colors'
import t from 'tcomb-form-native'
import { addCardToDeck } from '../utils/api'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { updateFormStyle } from '../utils/helper';

var _ = require('lodash')

const Form = t.form.Form;

const stylesheet = updateFormStyle(_.cloneDeep(t.form.Form.stylesheet))

const label_a = 'Question',
      label_b = 'Answer'

const Card = t.struct({
  question: t.String,
  answer: t.String
})

const optionsForm = {
  fields: {
    question: {
      error: 'The question can not be empty',
      multiline: true,
      stylesheet: stylesheet,
      selectionColor: blue,
      placeholderTextColor: blueDisabled,
    },
    answer: {
      error: 'The answer can not be empty',
      multiline: true,
      stylesheet: stylesheet,
      selectionColor: blue,
      placeholderTextColor: blueDisabled,
    }
  },
  auto: 'placeholders'
}

class AddCard extends Component {
  state = {
    question: null,
    answer: null,
    title: null
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.title
    }  
  }

  handleSubmit = () => {
    const value = this._form.getValue() // use that ref to get the form value
    if (value) {
      const title = this.props.navigation.state.params.deckTitle
      console.log('value: ', value.question + '\n' + value.answer)
      const card = {
        question: value.question,
        answer: value.answer
      }
      this.props.dispatch(addCard(title, card))

      addCardToDeck(title, card).then(() => {
         this.setState({question: null, answer: null})
         console.log(this.props.navigation)
         this.props.navigation.goBack()
       }).catch(error => console.log(error))
    }
    
  }
  
  render() {
    const { deckTitle } = this.props.navigation.state.params
    console.log('Data deck title ==> ' + deckTitle)
    return (
      <KeyboardAvoidingView style={[styles.center]} behavior="padding" >
        <Text style={{fontSize: 34, textAlign: 'center', marginBottom: 12, color: blue}}>
          What is your new card?
        </Text>
        <Form 
          style={styles.form}
          ref={form => this._form = form}
          type={Card}
          value={this.state}
          options={optionsForm} />
        <Button
          onPress={this.handleSubmit}
          title='Submit'
          color={blue}>
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

export default connect()(AddCard)