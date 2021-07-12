/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'

import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import WalletScreen from '../screens/WalletScreen'
import AccountScreen from '../screens/AccountScreen'
import { BottomTabParamList, WalletParamList, AccountParamList } from '../types'

const BottomTab = createBottomTabNavigator<BottomTabParamList>()

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme()

  return (
    <BottomTab.Navigator
      initialRouteName='Wallet'
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name='Wallet'
        component={WalletNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='ios-code' color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name='Account'
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='ios-code' color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  )
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name']
  color: string
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const WalletStack = createStackNavigator<WalletParamList>()

function WalletNavigator() {
  return (
    <WalletStack.Navigator>
      <WalletStack.Screen
        name='WalletScreen'
        component={WalletScreen}
        options={{ headerTitle: 'Wallet' }}
      />
    </WalletStack.Navigator>
  )
}

const AccountStack = createStackNavigator<AccountParamList>()

function AccountNavigator() {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen
        name='AccountScreen'
        component={AccountScreen}
        options={{ headerTitle: 'Account' }}
      />
    </AccountStack.Navigator>
  )
}
