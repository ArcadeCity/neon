import * as React from 'react'
import { storiesOf } from '@storybook/react-native'
import { StoryScreen, Story, UseCase } from 'storybook/views'
import { Updater } from '../updater'

storiesOf('Updater', module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add('In UseCase', () => (
    <Story>
      <UseCase text='Updater' usage='The updater' noPad>
        <Updater />
      </UseCase>
    </Story>
  ))
  .add('Standalone', () => <Updater />)
  .add('Modal', () => <Updater />)
