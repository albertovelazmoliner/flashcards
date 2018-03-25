import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { white } from '../utils/colors'

class DeckItem extends Component {

  static propTypes = {
    deck: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired
  }

  render() {
    const { deck } = this.props
    const {title, questions} = deck

    return (
      <TouchableOpacity onPress={() => this.props.onPress(deck)}>
        <View style={[styles.card, {backgroundColor: white}]}>
          <Text>{title}</Text>
          <Text>
            {questions ? `${questions.length} questions` : "No questions" }
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    height: 80,
    borderRadius: 5
  }
})

export default DeckItem