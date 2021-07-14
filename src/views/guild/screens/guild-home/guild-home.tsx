import React from 'react'
import { Image, ImageStyle, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Button, Screen, Text } from 'views/shared'
import { images } from 'views/theme'
import { useStores } from 'stores'
import { GuildDetail } from 'views/guild/components/guild-detail'
import { observer } from 'mobx-react-lite'

export const GuildHome: React.FC<{}> = observer(() => {
  const { navigate, setOptions } = useNavigation()
  const { guildStore } = useStores()
  const guild = guildStore.guild
  setOptions({ title: 'Guilds' })
  return (
    <Screen preset='scrollStack'>
      <View style={styles.container}>
        <Image source={images.guild} style={GUILDIMG} />
        <View style={{ marginTop: -35 }}>
          <Text preset='title3' text='Guilds' />
          <Text
            preset='description'
            text='Guilds are teams of Arcade City players who work together to provide reliable service to their local area.'
          />

          <Text
            preset='description'
            text='Drivers and other service providers wanting to accept in-app card payments must be in a chartered guild.'
          />

          <Text
            preset='description'
            text='A charter is a list of policies describing how that guild handles driver vetting, rider complaints, regulatory compliance, and more. As an example, you can view the charter of our Arcade City Austin network here:'
          />
        </View>

        <Button
          text='View Example Charter'
          onPress={() => navigate('charterExample')}
        />

        {!guild && (
          <Button
            text='Create Guild'
            preset='purpleglow'
            onPress={() => navigate('guildCreate')}
            style={{ marginTop: 15 }}
          />
        )}

        {guild && (
          <View style={{ width: '100%' }}>
            <Text
              preset='title2'
              text={`Your Guild:`}
              style={{ textAlign: 'left', marginTop: 35 }}
            />
            <GuildDetail
              button={false}
              navigateTo={() => {}}
              selectedGuild={guild}
            />

            <Text
              preset='description'
              text={`To invite members, your charter must be approved by City Hall. Email us your draft charter: cityhall@arcade.city`}
              style={{ marginTop: 15 }}
            />
          </View>
        )}
      </View>
    </Screen>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
})

const GUILDIMG: ImageStyle = {
  height: 280,
  width: 280,
  resizeMode: 'contain',
  alignSelf: 'center',
}
