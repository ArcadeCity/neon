import * as React from 'react'
import { useNavigation } from '@react-navigation/core'
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { useStores } from 'stores'
import { styles } from 'views/auth/screens/login/login-screen.styles'
import { InviteStatus } from 'views/onboarding/components'
import { Button, Map } from 'views/shared'
import { images, spacing } from 'views/theme'

export const InviteRequired = () => {
  const { authStore } = useStores()
  const { navigate } = useNavigation()
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.containerContent}>
            <Image
              source={images.notifications}
              style={{
                height: 180,
                width: '100%',
                resizeMode: 'contain',
                marginTop: -100,
              }}
            />
            <InviteStatus invited={authStore.invited} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 80,
          zIndex: 999,
          paddingHorizontal: spacing[5],
        }}
      >
        <Button
          text='Set up account'
          preset='primary'
          onPress={() => navigate('welcome')}
          style={{ marginBottom: spacing[6] }}
        />
        <Button
          text='Connect'
          preset='primary'
          onPress={() => navigate('connect')}
          style={{ marginBottom: spacing[6] }}
        />
        <Button text='Logout' preset='small' onPress={authStore.logout} />
      </View>
      <Map />
    </>
  )
}
