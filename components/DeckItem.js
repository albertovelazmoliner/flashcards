import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native'
import PropTypes from 'prop-types'
import { white, blue } from '../utils/colors'

class DeckItem extends Component {

  static propTypes = {
    deck: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired
  }

  render() {
    const { deck } = this.props
    const {title, questions} = deck

    return (
      <View>
        {Platform.OS === 'ios' && 
          <TouchableOpacity onPress={() => this.props.onPress(deck)}>
          <View style={[styles.card, {backgroundColor: white}]}>
            <Text style={{color: blue}}>{title}</Text>
            <Text style={{color: blue}}>
              {questions ? `${questions.length} questions` : "No questions" }
            </Text>
          </View>
        </TouchableOpacity>}
        {Platform.OS != 'ios' && 
          <TouchableNativeFeedback 
            onPress={() => this.props.onPress(deck)}
            background={TouchableNativeFeedback.Ripple(blue)}>
          <View style={[styles.card, {backgroundColor: white}]}>
            <Text style={{color: blue}}>{title}</Text>
            <Text style={{color: blue}}>
              {questions ? `${questions.length} questions` : "No questions" }
            </Text>
          </View>
        </TouchableNativeFeedback>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 1,
    height: 80,
  }
})

export default DeckItem