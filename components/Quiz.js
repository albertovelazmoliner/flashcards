import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Alert, Button, Platform, Modal, Animated } from 'react-native'
import PropTypes from 'prop-types'
import { black, white, green, red, blue } from '../utils/colors'
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
    points: 0,
    modalVisible: false,
    result: '',
    bounceValue: new Animated.Value(1)
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
      const lastPoints = points + 1
      this.setState({ points: lastPoints}, this.finishQuiz)
    }
  }

  handleNo = () => {
    const { questionOrder, questionsNumber, questions, showAnswer } = this.state
    if (questionOrder < questionsNumber) {
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
    const { questionOrder, questionsNumber, points, bounceValue} = this.state
    const percentage = (points / questionsNumber) * 100
    const resultTruncated = this.truncate(percentage ,2)
    this.setState({ modalVisible: true, result: resultTruncated })
    Animated.sequence([
      Animated.timing(bounceValue, { duration: 200, toValue: 1.04}),
      Animated.spring(bounceValue, { toValue: 1, friction: 4})
    ]).start()
  }

  truncate (num, places) {
    return Math.trunc(num * Math.pow(10, places)) / Math.pow(10, places);
  }

  render() {
    console.log(this.state)
    const { questionOrder, questionsNumber, questions, showAnswer, result, bounceValue} = this.state
    return (
      <View>
        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => this.props.navigation.goBack()}>
          <View style={[styles.container, {backgroundColor: white}]}>
            <Animated.Text style={[{textAlign: 'center', fontSize: 34, color: black},{transform: [{scale: bounceValue}]}]}>
              You got {result}% of the questions right.
            </Animated.Text>
            <View style={{margin: 16}}>
              <Button
                onPress={() =>  this.setState({ questionOrder: 1, showAnswer: false, points: 0, modalVisible: false, result:'' }) }
                title="Start again the quiz"
                color={blue}/>
            </View>
            <View style={{margin: 16}}>
              <Button
                onPress={() => this.props.navigation.goBack()}
                title="Go to the deck"
                color={blue}/>
            </View>
          </View>
        </Modal>
        <View style={styles.questionsOrder}>
          <Text style={{color: white}}>{questionOrder} / {questionsNumber}</Text>
        </View>
        {!showAnswer && <Text style={[styles.textQuestionAnswer]}>{(questionsNumber > 0) ? questions[questionOrder - 1]['question'] : ""}</Text>}
        {showAnswer && <Text style={[styles.textQuestionAnswer]}>{questions[questionOrder - 1]['answer']}</Text>}
        {!showAnswer && 
          <View>
            {Platform.OS === 'ios' && 
              <TouchableOpacity
                style={[styles.button]}
                onPress={this.handleCheck}>
                <Text style={styles.buttonText}>
                  Show Answer
                </Text>
              </TouchableOpacity>}
            {Platform.OS != 'ios' &&
              <View style={{margin: 16}}>
                <Button
                  onPress={this.handleCheck}
                  title="Show Answer"
                  color={blue}>
                </Button>
              </View>}
          </View>}
        {showAnswer && 
          <View>
            <Text style={[styles.centerText]}>Answer</Text>
            {Platform.OS === 'ios' &&
            <View> 
            <TouchableOpacity
              style={[styles.buttonGreen]}
              onPress={this.handleYes}>
              <Text style={styles.buttonText}>
                Correct
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonRed]}
              onPress={this.handleNo}>
              <Text style={styles.buttonText}>
                Incorrect
              </Text>
            </TouchableOpacity>
            </View>}
            {Platform.OS != 'ios' &&
            <View>
              <View style={{margin: 16}}> 
              <Button
                onPress={this.handleYes}
                  title="Correct"
                  color={green}>
              </Button>
              </View>
              <View style={{margin: 16}}> 
                <Button
                  onPress={this.handleNo}
                    title="Incorrect"
                    color={red}>
                </Button>
              </View>
            </View>}
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textQuestionAnswer: {
    fontSize:16,
    alignSelf:'center',
    marginTop: 20,
    marginBottom: 8,
    fontStyle: 'italic',
    backgroundColor: white,
    padding: 10,
    minWidth: 240,
    maxWidth: 240,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: blue
  },
  centerText: {
    fontSize: 20,
    alignSelf: 'center',
    marginBottom: 20,
    color: blue
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
  },
  questionsOrder: {
    backgroundColor: blue,
    margin: 10,
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-start'
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