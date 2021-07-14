import 'i18n'
// import 'lib/ignore-warnings'
import React, { useState, useEffect, useRef } from 'react'
import { Alert, StatusBar, Text, View } from 'react-native'
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context'
import { initFonts } from 'views/theme'
import {
  RootNavigator,
  setRootNavigation,
  useNavigationPersistence,
} from 'navigation'
import { RootStore, RootStoreProvider, setupRootStore } from 'stores'
import { enableScreens } from 'react-native-screens'
import { NavigationContainerRef } from '@react-navigation/native'

enableScreens()

export const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE'
const storage = {}

export function App() {
  const navigationRef: any = useRef<NavigationContainerRef>()
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)

  setRootNavigation(navigationRef)
  // const { initialNavigationState, onNavigationStateChange } =
  //   useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  useEffect(() => {
    ;(async () => {
      // Check if we're on the latest app version; download and refresh if not.
      await initFonts() // expo
      try {
        setupRootStore(null).then(setRootStore)
      } catch (e) {
        Alert.alert('An error', e.message)
      }
    })()
  }, [])

  if (!rootStore) return <></>

  // otherwise, we're ready to render the app
  return (
    <RootStoreProvider value={rootStore}>
      <StatusBar barStyle='light-content' />
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <View style={{ flex: 1, zIndex: 50 }}>
          <RootNavigator
            ref={navigationRef}
            // initialState={}
            // onStateChange={onNavigationStateChange}
          />
        </View>
      </SafeAreaProvider>
    </RootStoreProvider>
  )

  // return (
  //   <View>
  //     <Text>sup!!!!</Text>
  //   </View>
  // )
}
