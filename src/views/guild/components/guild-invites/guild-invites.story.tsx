import * as React from 'react'
import { storiesOf } from '@storybook/react-native'
import { StoryScreen, Story, UseCase } from 'storybook/views'
import { GuildInvites } from './guild-invites'
import { guild1, rootStore } from 'storybook/demo-data'
import { reactNavigationDecorator } from 'storybook/navigation-decorator'
import { RootStoreProvider } from 'stores'

rootStore.guildStore.setGuild(guild1)

storiesOf('Guilds - GuildInvites', module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .addDecorator((fn) => (
    <RootStoreProvider value={rootStore}>{fn()}</RootStoreProvider>
  ))
  .addDecorator(reactNavigationDecorator)
  .add('In UseCase', () => (
    <Story>
      <UseCase text='GuildInvites' usage='' noPad>
        <GuildInvites />
      </UseCase>
    </Story>
  ))
