import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { white } from '../utils/colors'

class DeckItem extends Component {

  static propTypes = {
    deck: PropTypes.object.isRequired
  }

  render() {
    const {title, questions} = this.props.deck
    return (
      <View style={[styles.card, {backgroundColor: white}]}>
        <Text>{title}</Text>
        <Text>
          {questions ? `${questions.length} questions` : "No questions" }
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
    height: 60,
    borderRadius: 5
  }
})

export default DeckItem