import React, { useEffect } from 'react'
import { Alert } from 'react-native'
import { observer } from 'mobx-react-lite'
import { useNavigation } from '@react-navigation/native'
import { useStores } from 'stores'
import { Button, MenuButton, Screen } from 'views/shared'
import { ProfileSummary } from 'views/social'
import { images } from 'views/theme'

export const MainMenu: React.FC<{}> = observer(() => {
  // Nav
  const { navigate, setOptions } = useNavigation()
  useEffect(() => {
    setOptions({ title: 'Menu' })
  }, [])

  // State
  const { authStore } = useStores()
  const bio = authStore.bio
  const geo = authStore.geo
  const profession = authStore.profession
  const username = authStore.username
  const city = geo
    ? `${geo.city}, ${geo.region}, ${geo.isoCountryCode}`
    : 'Unknown' // TODO: Get from authStore view(?)

  const onClickLogout = () => {
    Alert.alert('Log out', 'Are you sure?', [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: authStore.logout,
      },
    ])
  }

  return (
    <Screen preset='scrollStack'>
      <ProfileSummary
        // avatar={profilePicture}
        bio={bio}
        city={city}
        // forOnPress={() => navigate('setProfilePicture')}
        forOnPress={() => {}}
        identityVerified={false}
        level={0}
        username={username}
        profession={profession}
      />

      <Button text='Edit Profile' onPress={() => navigate('profileEdit')} />

      {/* <MenuButton
        image={images.tokenreceive}
        title='Wallet'
        onPress={() => navigate('wallet')}
      /> */}

      <MenuButton
        image={images.refer}
        title='Invites'
        onPress={() => navigate('invites')}
      />

      <MenuButton
        image={images.refer}
        title='Connect'
        onPress={() => navigate('connect')}
      />

      <MenuButton
        image={images.inboxActive}
        title='Feedback'
        onPress={() => navigate('feedback')}
      />

      <MenuButton
        image={images.note}
        title='Changelog'
        onPress={() => navigate('changelog')}
      />

      <MenuButton
        image={images.logout}
        title='Logout'
        onPress={onClickLogout}
        last
      />
    </Screen>
  )
})
