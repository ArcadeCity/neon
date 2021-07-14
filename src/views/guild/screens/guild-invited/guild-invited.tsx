import * as React from 'react'
import { Button, Screen, Text } from 'views/shared'
import { observer } from 'mobx-react-lite'
import { useStores } from 'stores'

export const GuildInvited = observer(() => {
  const { guildStore } = useStores()
  const selectedGuild = guildStore.selectedGuild
  const selectedInvite = guildStore.selectedInvite
  return (
    <Screen preset='scrollStack'>
      <Text
        preset='description'
        tx='guild.invitedToJoin2'
        style={{ marginTop: 0, marginBottom: 0, alignSelf: 'center' }}
      />
      <Text
        preset='title'
        text={selectedGuild.name}
        style={{ marginTop: 0, marginBottom: 20, alignSelf: 'center' }}
      />

      <Button
        tx='common.join'
        style={{ marginBottom: 15 }}
        onPress={() => guildStore.inviteAccept(selectedInvite)}
      />

      <Button
        tx='common.ignore'
        preset='secondary'
        onPress={() => guildStore.inviteIgnore(selectedInvite)}
      />
    </Screen>
  )
})
