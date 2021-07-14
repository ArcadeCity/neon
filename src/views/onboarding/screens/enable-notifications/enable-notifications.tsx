// @ts-nocheck
import React, { useEffect } from 'react'
import { Image, ImageStyle, View, ViewStyle } from 'react-native'
import { observer } from 'mobx-react-lite'
import { useNavigation } from '@react-navigation/native'
import { useStores } from 'stores'
import { Button, Screen, Text } from 'views/shared'
import { spacing } from 'views/theme'

export const EnableNotifications: React.FC<{}> = observer(() => {
  // Nav
  const { goBack, setOptions } = useNavigation()
  useEffect(() => {
    setOptions({ title: 'Enable Notifications' })
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
            text='Enable Notifications'
            onPress={async () => {
              await authStore.enableNotifications()
              goBack()
            }}
          />
        </View>
      }
    >
      <View style={CONTAINER}>
        <Text preset='title' text='Enable Notifications' />
        <Text
          preset='description'
          text="This lets us send you a push notification if you receive a new message or if there's an important update."
        />
        <Image source={require('./notifications.png')} style={IMAGE} />
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
