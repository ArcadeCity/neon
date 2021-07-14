import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { usePushNotifications } from 'lib/hooks'
import { TabBar } from 'views/shared'
import { MapNavigator } from './map-navigator'
import { MenuNavigator } from './menu-navigator'

const hideHeaderOptions = () => ({
  headerShown: false,
})

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName='map'
    tabBar={(props) => <TabBar {...props} />}
  >
    <Tab.Screen name='map' component={MapNavigator} />
    <Tab.Screen name='menu' component={MenuNavigator} />
  </Tab.Navigator>
)

export function MainNavigator() {
  usePushNotifications()
  return (
    <Stack.Navigator initialRouteName='tabs'>
      <Stack.Screen
        name='tabs'
        component={TabNavigator}
        options={hideHeaderOptions}
      />
    </Stack.Navigator>
  )
}
