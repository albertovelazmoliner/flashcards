import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Alert } from 'react-native'
import PropTypes from 'prop-types'
import { black, white, green, red } from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/helper'
import { Constants } from 'expo'
import { Header, NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'


class Quiz extends Component {

  state = {
    questionsNumber: 0,
    questionOrder: 0,
    questions: [],
    showAnswer: false,
    points: 0
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Quiz'
    }  
  }

  componentDidMount() {
    const { title, questions } = this.props.deck
    this.shuffleArray(questions)
    const questionsNumber = questions.length
    const questionOrder = 1
    this.setState( { questionsNumber, questionOrder, questions })
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  }

  handleCheck = () => {
    this.setState({ showAnswer: true })
  }

  handleYes = () => {
    const { questionOrder,
            questionsNumber,
            questions,
            showAnswer,
            points } = this.state
    if (questionOrder < questionsNumber) {
      const next = questionOrder + 1
      const pointsNow = points + 1
      this.setState({
        questionOrder: next,
        showAnswer: false,
        points: pointsNow
      })
    } else {
      this.finishQuiz()
    }
  }

  handleNo = () => {
    const { questionOrder, questionsNumber, questions, showAnswer } = this.state
    if (questionsNumber < questionOrder) {
      const next = questionOrder + 1
      this.setState({
        questionOrder: next,
        showAnswer: false
      })
    } else {
      this.finishQuiz()
    }
  }

  finishQuiz = () => {
    clearLocalNotification()
      .then(setLocalNotification())
    const { questionOrder, questionsNumber, points} = this.state
    const percentage = (points / questionsNumber) * 100
    Alert.alert(
      'You finished the Quiz',
      `You got ${percentage}% of the questions right.`,
      [
        {text: 'Start again the quiz', onPress: () =>  this.setState({ questionOrder: 1, showAnswer: false }) },
        {text: 'Go to the deck', onPress: () => this.props.navigation.goBack() },
      ],
      { cancelable: false }
    )
  }

  render() {
    console.log(this.state)
    const { questionOrder, questionsNumber, questions, showAnswer } = this.state
    return (
      <View>
        <Text>{questionOrder} / {questionsNumber}</Text>
        {!showAnswer && <Text style={[styles.centerText]}>{(questionsNumber > 0) ? questions[questionOrder - 1]['question'] : ""}</Text>}
        {showAnswer && <Text style={[styles.centerText]}>{questions[questionOrder - 1]['answer']}</Text>}
        {!showAnswer && <TouchableOpacity
          style={[styles.button]}
          onPress={this.handleCheck}>
          <Text style={styles.buttonText}>
            Show Answer
          </Text>
        </TouchableOpacity>}
        {showAnswer && 
          <View>
            <Text style={[styles.centerText]}>Answer</Text>
            <TouchableOpacity
              style={[styles.buttonGreen]}
              onPress={this.handleYes}>
              <Text style={styles.buttonText}>
                Correct
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonRed]}
              onPress={this.handleYes}>
              <Text style={styles.buttonText}>
                Incorrect
              </Text>
            </TouchableOpacity>
          </View>
        }
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
  buttonGreen: {
    padding: 10,
    backgroundColor: green,
    alignSelf: 'center',
    borderRadius: 5,
    margin: 20,
  },
  buttonRed: {
    padding: 10,
    backgroundColor: red,
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