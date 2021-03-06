import React from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Image,
  Platform,
  TouchableWithoutFeedback,
  View,
  TextInput,
} from 'react-native'
import { observer } from 'mobx-react-lite'
import { useStores } from 'stores'
import { Button, Map, TextField } from 'views/shared'
import { images, spacing } from 'views/theme'
import { styles } from './login-screen.styles'
import { useNavigation } from '@react-navigation/native'
import { getConstants } from 'lib'

export const LoginScreen = observer(() => {
  const { navigate } = useNavigation()
  const { authStore } = useStores()
  return (
    <>
      {/* <Map /> */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.containerContent}>
            <View style={styles.containerInner}>
              <Image
                resizeMode='contain'
                source={images.logo}
                style={styles.logo}
              />
            </View>
            <View style={styles.containerText}>
              <input
                style={{ height: 50, width: 300 }}
                onChange={(e) => {
                  // console.log(e.target.value)
                  authStore.setEmailInput(e.target.value)
                }}
              />
              {/* <TextField
                placeholderTx='auth.enterYourEmailAddress'
                autoCapitalize='none'
                autoCompleteType='email'
              /> */}
              <Button
                onPress={authStore.login}
                tx={authStore.loggingIn ? 'common.loading' : 'auth.login'}
                style={styles.buttonSpacing}
                preset='primary'
                disabled={authStore.loggingIn}
              />
              <Button
                onPress={() => navigate('changelog')}
                text={`v${getConstants().ourVersionNumber}`}
                style={{ marginTop: spacing[7] }}
                preset='small'
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  )
})
