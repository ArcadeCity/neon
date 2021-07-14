import * as React from 'react'
import { storiesOf } from '@storybook/react-native'
import { StoryScreen, Story, UseCase } from 'storybook/views'
import { GuildRow } from './guild-row'
import { guild1 } from 'storybook/demo-data'
import { reactNavigationDecorator } from 'storybook/navigation-decorator'

storiesOf('Guilds - GuildRow', module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .addDecorator(reactNavigationDecorator)
  .add('In UseCase', () => (
    <Story>
      <UseCase text='GuildRow' usage='' noPad>
        <GuildRow guild={guild1} measurementUnit='km' />
      </UseCase>
    </Story>
  ))
