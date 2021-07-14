import * as React from 'react'
import { storiesOf } from '@storybook/react-native'
import { StoryScreen, Story, UseCase } from 'storybook/views'
import { ProfileSummary } from './profile-summary'
import { player1 } from 'storybook/demo-data'

storiesOf('Social - ProfileSummary', module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add('ProfileSummary', () => (
    <Story>
      <UseCase text='With avatar' usage='' noPad>
        <ProfileSummary
          avatar='https://placekitten.com/200/300'
          bio={player1.bio}
          city={player1.city}
          level={player1.level}
          profession={player1.profession}
          username={player1.username}
        />
      </UseCase>
      <UseCase text='No avatar' usage='' noPad>
        <ProfileSummary
          bio={player1.bio}
          city={player1.city}
          level={0}
          profession={player1.profession}
          username={player1.username}
        />
      </UseCase>
    </Story>
  ))
