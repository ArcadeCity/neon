import * as React from 'react'
import { storiesOf } from '@storybook/react-native'
import { StoryScreen, Story, UseCase } from 'storybook/views'
import { GuildDetail } from './guild-detail'
import { guild1 } from 'storybook/demo-data'

storiesOf('Guilds - GuildDetail', module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add('In UseCase', () => (
    <Story>
      <UseCase text='GuildDetail' usage='' noPad>
        <GuildDetail navigateTo={() => {}} selectedGuild={guild1} />
      </UseCase>
    </Story>
  ))
