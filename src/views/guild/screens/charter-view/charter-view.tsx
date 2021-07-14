import * as React from 'react'
import { observer } from 'mobx-react-lite'
import { Button, Screen, Text } from 'views/shared'

export const CharterView = observer(() => {
  return (
    <Screen preset='scrollStack'>
      <Text preset='title' text='View Charter' />
      <Text
        preset='description'
        text='Here you can view the charter for Super Demo Guild.'
      />
      <Text
        preset='description'
        text='Note: this charter is hosted online at the following link, and is subject to change.'
      />
      <Text
        preset='bold'
        text='https://arcade.city/g/demoguild/charter'
        style={{ textAlign: 'center', marginBottom: 30 }}
      />
      <Button text='Open Charter' />
      <Text
        preset='description'
        text="Every Arcade City guild has a charter. Charters specify the policies of that guild. You can always read a guild's charter to see how they deal with payments, complaints, and handling requests."
        style={{ marginTop: 30 }}
      />
    </Screen>
  )
})
