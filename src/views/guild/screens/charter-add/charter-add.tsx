import * as React from 'react'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Button, MenuButton, Screen, Text, TextField } from 'views/shared'
import { LONGDIVIDER } from '../../styles'

const dock = (
  <View style={{ marginBottom: 30, paddingHorizontal: 15 }}>
    <Button text='Save Charter' style={{ marginBottom: 20 }} />
    <Button preset='secondary' text='Add Later' />
  </View>
)

export const CharterAdd = () => {
  const { navigate } = useNavigation()
  return (
    <Screen preset='scrollStack' dock={dock}>
      <Text preset='title' text='Guild Charter' />
      <Text preset='description' tx='guild.charterAdd' />
      <View style={[LONGDIVIDER, { marginTop: 3, marginBottom: 3 }]} />
      <MenuButton
        title='View an Example'
        onPress={() => navigate('charterExample')}
        style={{ paddingVertical: 20 }}
        last
      />
      <View style={[LONGDIVIDER, { marginTop: 3, marginBottom: 3 }]} />
      <Text
        tx='guild.linkToGuildCharter'
        preset='bold'
        style={{ marginTop: 30 }}
      />
      <TextField placeholder='ex. arcade.city/yourguild' />
    </Screen>
  )
}
