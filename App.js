import React from 'react';
import { StyleSheet, Text, View, Platform, SafeAreaView } from 'react-native'
import { TabNavigator } from 'react-navigation'
import DecksList from './components/DecksList'
import NewDeck from './components/NewDeck'
import { white, blue } from './utils/colors'
import { Ionicons } from '@expo/vector-icons'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { Constants } from 'expo'

const Tabs = TabNavigator({
  DecksList: {
    screen: DecksList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-card' size={30} color={tintColor} />
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-add' size={30} color={tintColor} />
    }
  }
}, {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? blue : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : blue,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <SafeAreaView style={styles.safeArea}>
          <Tabs />
        </SafeAreaView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1
  }
});
