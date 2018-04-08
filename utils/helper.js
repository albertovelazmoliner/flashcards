import { AsyncStorage, Platform } from 'react-native'
import { Permissions, Notifications } from 'expo'
import { blue, red } from '../utils/colors'

const NOTIFICATION_KEY = 'velazStorage:notifications'

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createLocalNotification () {
  return {
    title: 'You didn\'t do any quiz today!',
    body: "Don't forget to do one of them!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate())
              tomorrow.setHours(17)
              tomorrow.setMinutes(47)

              Notifications.scheduleLocalNotificationAsync(
                createLocalNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}


export const updateFormStyle = (stylesheetForm) => {
  const stylesheet = stylesheetForm
  if (Platform.OS === 'ios') {
    stylesheet.textbox.normal.color = blue;
    stylesheet.textbox.error.color = blue;
    stylesheet.textbox.normal.borderColor = blue
  } else {
    stylesheet.textbox.normal.borderWidth = 0;
    stylesheet.textbox.error.borderWidth = 0;
    stylesheet.textbox.normal.marginBottom = 0;
    stylesheet.textbox.error.marginBottom = 0;
  
    stylesheet.textboxView.normal.borderWidth = 0;
    stylesheet.textboxView.error.borderWidth = 0;
    stylesheet.textboxView.normal.borderRadius = 0;
    stylesheet.textboxView.error.borderRadius = 0;
    stylesheet.textboxView.normal.borderBottomWidth = 1;
    stylesheet.textboxView.error.borderBottomWidth = 1;
    stylesheet.textboxView.normal.borderColor = blue;
    stylesheet.textboxView.error.borderColor = red;
    stylesheet.textbox.normal.marginBottom = 5;
    stylesheet.textbox.error.marginBottom = 5;
  }
  return stylesheet
}