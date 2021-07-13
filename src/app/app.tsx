import 'i18n'
import 'lib/ignore-warnings'
import React, { useState, useEffect, useRef } from 'react'
import { Alert, StatusBar, View } from 'react-native'
// import { NavigationContainerRef } from '@react-navigation/native'
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
  const { initialNavigationState, onNavigationStateChange } =
    useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  // Kick off initial async loading actions, like loading fonts and RootStore
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

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color. You can replace
  // with your own loading component if you wish.
  if (!rootStore) return <></>

  // otherwise, we're ready to render the app
  return (
    <RootStoreProvider value={rootStore}>
      <StatusBar barStyle='light-content' />
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <View style={{ flex: 1, zIndex: 50 }}>
          <RootNavigator
            ref={navigationRef}
            initialState={initialNavigationState}
            onStateChange={onNavigationStateChange}
          />
        </View>
      </SafeAreaProvider>
    </RootStoreProvider>
  )
}
