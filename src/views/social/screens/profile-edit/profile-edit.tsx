import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigation } from '@react-navigation/native'
import { useStores } from 'stores'
import { MenuButton, Screen } from 'views/shared'
import { images } from 'views/theme'

export const ProfileEdit: React.FC<{}> = observer(() => {
  // Nav
  const { navigate, setOptions } = useNavigation()
  useEffect(() => {
    setOptions({ title: 'Edit Profile' })
  }, [])

  // State
  const { authStore } = useStores()
  const bio = authStore.bio
  const profession = authStore.profession
  const username = authStore.username

  return (
    <Screen preset='scrollStack'>
      <MenuButton
        image={images.profile}
        title='Change username'
        description={username}
        onPress={() => navigate('setUsername')}
      />
      <MenuButton
        image={images.profile}
        title='Change bio'
        description={bio}
        onPress={() => navigate('setBio')}
      />
      <MenuButton
        image={images.profile}
        title='Change profession'
        description={profession}
        onPress={() => navigate('setProfession')}
      />
      {/* <MenuButton
        image={images.rider}
        title='Change profile picture'
        onPress={() => navigate('setProfilePicture')}
      /> */}
    </Screen>
  )
})
