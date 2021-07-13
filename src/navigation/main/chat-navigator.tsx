import React from 'react'
import { View } from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavButton } from 'views/shared'
import { ChatHome, Chatroom, Profile } from 'views/social'
import { color, typography } from 'views/theme'

interface Props {
  navigation: NavigationProp<any>
}

const stackOptions = ({ navigation }: Props) => ({
  headerStyle: {
    backgroundColor: color.tabbar,
    elevation: 0,
    shadowColor: 'transparent',
  },
  headerTintColor: color.palette.white,
  headerTitleStyle: {
    fontFamily: typography.bold,
  },
  headerLeft: () => <NavButton onPress={navigation.goBack} />,
})

const chatroomStackOptions = ({ navigation }: Props) => ({
  headerStyle: {
    backgroundColor: color.tabbar,
    elevation: 0,
    shadowColor: 'transparent',
  },
  headerTintColor: color.palette.white,
  headerTitleStyle: {
    fontFamily: typography.bold,
  },
  headerLeft: () => <NavButton onPress={navigation.goBack} />,
  headerRight: () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* <SmartHeaderButton /> */}
      {/* <MessagesButton /> */}
    </View>
  ),
})

const Stack = createStackNavigator()

export const ChatNavigator = () => (
  <Stack.Navigator initialRouteName='chathome'>
    <Stack.Screen name='chathome' component={ChatHome} options={stackOptions} />
    <Stack.Screen
      name='chatroom'
      component={Chatroom}
      options={chatroomStackOptions}
    />
    <Stack.Screen name='profile' component={Profile} options={stackOptions} />
  </Stack.Navigator>
)
