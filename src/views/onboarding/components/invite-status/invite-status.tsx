import * as React from 'react'
import { View } from 'react-native'
import { Text } from 'views/shared'
import { spacing } from 'views/theme'

interface Props {
  invited?: boolean
}

export const InviteStatus = ({ invited = false }: Props) => {
  const title = invited ? 'Welcome' : 'Invite Required'
  const text = invited
    ? "You've been invited to join Arcade City."
    : 'To join Arcade City, get an invite from a friend!'
  return (
    <View style={{ alignItems: 'center' }}>
      <Text preset='title' text={title} />
      <Text
        preset='description'
        text={text}
        style={{
          fontSize: 18,
          lineHeight: 24,
          paddingHorizontal: spacing[6],
          textAlign: 'center',
        }}
      />
    </View>
  )
}
