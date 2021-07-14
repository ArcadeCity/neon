import React, { useEffect } from 'react'
import { Image, ImageStyle, View, ViewStyle } from 'react-native'
import { observer } from 'mobx-react-lite'
import { useNavigation } from '@react-navigation/native'
import { useStores } from 'stores'
import { Button, Screen, Text } from 'views/shared'
import { spacing } from 'views/theme'

export const EnableLocation = observer(() => {
  // Nav
  const { goBack, setOptions } = useNavigation()
  useEffect(() => {
    setOptions({ title: 'Enable Location' })
  }, [])

  // State
  const { authStore } = useStores()

  return (
    <Screen
      preset='scrollStack'
      dock={
        <View style={DOCK}>
          <Button
            style={BUTTON}
            preset='primary'
            text='Enable Location'
            onPress={async () => {
              authStore.getLocation()
              goBack()
            }}
          />
        </View>
      }
    >
      <View style={CONTAINER}>
        <Text preset='title' text='Enable Location' />
        <Text
          preset='description'
          text='The app needs your location to connect you with nearby users.'
        />
        <Text
          preset='description'
          text="Your city will be shared on your public profile, for example 'Austin, TX, US'."
        />
        <Text
          preset='description'
          text='Your exact location will not be shared publicly unless you create a map beacon.'
        />
        <Image source={require('./location.png')} style={IMAGE} />
      </View>
    </Screen>
  )
})

const CONTAINER: ViewStyle = {
  paddingVertical: spacing[7],
}

const DOCK: ViewStyle = {
  paddingHorizontal: spacing[4],
  paddingVertical: spacing[4],
}

const BUTTON: ViewStyle = {
  marginVertical: spacing[2],
}

const IMAGE: ImageStyle = {
  alignSelf: 'center',
  marginTop: 50,
}
