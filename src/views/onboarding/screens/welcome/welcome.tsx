import React, { useEffect } from 'react'
import { View, ViewStyle } from 'react-native'
import { observer } from 'mobx-react-lite'
import { useNavigation } from '@react-navigation/native'
import { useStores } from 'stores'
import { Button, Map, Screen } from 'views/shared'
import { spacing } from 'views/theme'
import { WelcomeHeader } from '../../components'

export const Welcome = observer(() => {
  // Nav
  const { navigate, setOptions } = useNavigation()
  useEffect(() => {
    setOptions({ title: 'Account Setup' })
  }, [])

  // State
  const { authStore } = useStores()
  const bio = authStore.bio
  const canEnterCity = authStore.canEnterCity
  const hasUserAcceptedTerms = authStore.hasUserAcceptedTerms
  const permissions = authStore.permissions
  const profession = authStore.profession
  const username = authStore.username

  // Permissions
  let locationStatus: string
  if (permissions && permissions.location) {
    locationStatus = permissions.location.status
  } else {
    locationStatus = ''
  }
  const locationEnabled = locationStatus === 'granted'

  return (
    <>
      <View
        style={{
          zIndex: -1,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <Map />
      </View>
      <Screen transparent preset='scrollStackSlim' style={{ zIndex: 3 }}>
        <WelcomeHeader />
        <View
          style={{ paddingHorizontal: 30, paddingVertical: 10, zIndex: 900 }}
        >
          <View style={{ opacity: !!profession ? DONE_OPACITY : 1 }}>
            <Button
              text={
                !!profession
                  ? `Profession: ${profession}`
                  : 'Select your profession'
              }
              style={BUTTON}
              onPress={() => navigate('setProfession')}
              preset={!!profession ? 'secondary' : 'primary'}
            />
          </View>
          <View style={{ opacity: !!username ? DONE_OPACITY : 1 }}>
            <Button
              text={
                !!username ? `Username: ${username}` : 'Select your username'
              }
              style={BUTTON}
              onPress={() => navigate('setUsername')}
              preset={!!username ? 'secondary' : 'primary'}
            />
          </View>
          <View style={{ opacity: !!bio ? DONE_OPACITY : 1 }}>
            <Button
              text={!!bio ? `Profile bio set!` : 'Select your bio'}
              style={BUTTON}
              onPress={() => navigate('setBio')}
              preset={!!bio ? 'secondary' : 'primary'}
            />
          </View>
          <View style={{ opacity: !!locationEnabled ? DONE_OPACITY : 1 }}>
            <Button
              text={!!locationEnabled ? `Location enabled!` : 'Enable location'}
              style={BUTTON}
              onPress={() => navigate('enableLocation')}
              preset={!!locationEnabled ? 'secondary' : 'primary'}
            />
          </View>
          <View style={{ opacity: hasUserAcceptedTerms ? DONE_OPACITY : 1 }}>
            <Button
              text={hasUserAcceptedTerms ? `Terms accepted` : 'Accept terms'}
              style={BUTTON}
              onPress={() => navigate('terms')}
              preset={!!hasUserAcceptedTerms ? 'secondary' : 'primary'}
            />
          </View>
          <Button
            text='Enter the City'
            preset='highlight'
            style={{ ...BUTTON, marginTop: 30 }}
            onPress={() => authStore.saveOnboarded(true)}
            disabled={!canEnterCity}
          />
        </View>
      </Screen>
    </>
  )
})

const BUTTON: ViewStyle = {
  marginVertical: spacing[3],
}

const DONE_OPACITY = 0.8
