import React, { useEffect } from 'react'
import { View, ViewStyle } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useStores } from 'stores'
import { Button, Screen, Text } from 'views/shared'
import { spacing } from 'views/theme'
import { CONTAINER } from './styles'

export const Terms: React.FC<{}> = () => {
  // Nav
  const { canGoBack, goBack, setOptions } = useNavigation()
  useEffect(() => {
    setOptions({ title: 'Accept Terms' })
  }, [])

  // State
  const { authStore } = useStores()

  // UI
  const dock = (
    <View style={{ padding: 20 }}>
      <Button
        style={FB_BUTTON}
        text='I agree to the Terms of Service.'
        onPress={() => {
          authStore.saveTermsAgree(new Date())
          if (canGoBack()) {
            goBack()
          }
        }}
      />
    </View>
  )
  return (
    <Screen preset='scrollStack' dock={dock}>
      <View style={CONTAINER}>
        <Text preset='title' text='Terms' style={{ marginTop: 30 }} />

        <Text
          preset='description'
          text='By using Arcade City, you agree to our Terms of Service.'
        />

        <Text preset='description' text='1) You are age 18 or over.' />

        <Text
          preset='description'
          text='2) You will treat every fellow Arcade City member with respect.'
        />

        <Text
          preset='description'
          text='3) You will comply with your local laws and regulations.'
        />

        <Text
          preset='description'
          text='4) You take full responsibility for your actions and consequences of your actions. Any issues you have with fellow users you will resolve with them directly or through your guild.'
        />

        <Text
          preset='description'
          text='Any violations may result in a lifetime ban.'
        />
      </View>
    </Screen>
  )
}

const FB_BUTTON: ViewStyle = {
  marginTop: spacing[1],
  marginBottom: spacing[6],
}
