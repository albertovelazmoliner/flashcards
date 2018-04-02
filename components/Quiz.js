import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native'
import PropTypes from 'prop-types'
import { black, white } from '../utils/colors'
import { Constants } from 'expo'
import { Header } from 'react-navigation'
import { connect } from 'react-redux'


class Quiz extends Component {

  state = {
    questionsNumber: 0,
    questionOrder: 0,
    questions: []
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Quiz'
    }  
  }

  componentDidMount() {
    const { title, questions } = this.props.deck
    //debugger
    const questionsNumber = questions.length
    const questionOrder = 1
    this.setState( { questionsNumber, questionOrder, questions })
  }

  handle = () => {
    
  }

  handle = () => {

  }

  render() {
    console.log(this.state)
    const { questionOrder, questionsNumber, questions } = this.state
    return (
      <View>
        <Text>{questionOrder} / {questionsNumber}</Text>
        <Text style={[styles.centerText]}>{(questionsNumber > 0) ? questions[questionOrder - 1]['question'] : ""}</Text>
        <TouchableOpacity
          style={[styles.button]}
          onPress={this.handleAdd}>
          <Text style={styles.buttonText}>
            Answer
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
)(Quiz)