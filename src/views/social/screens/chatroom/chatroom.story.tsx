import * as React from 'react'
import { storiesOf } from '@storybook/react-native'
import { reactNavigationDecorator } from 'storybook/navigation-decorator'
import { RootStore, RootStoreModel, RootStoreProvider } from 'stores'
import { Chatroom } from '../chatroom'
import { authedPlayer, chatroom } from 'storybook/demo-data'

const store = {
  authStore: {
    player: authedPlayer,
  },
  chatStore: {
    activeChatroom: 1,
    chatrooms: { 1: chatroom },
  },
  playerStore: {
    nearby: {
      success: true,
      within: 5,
      unit: 'km',
      nearby: { Rider: 4, Driver: 2, Entrepreneur: 1 },
    },
  },
}

const rootStore = RootStoreModel.create(store) as RootStore

storiesOf('Social - Chatroom', module)
  .addDecorator((fn) => (
    <RootStoreProvider value={rootStore}>{fn()}</RootStoreProvider>
  ))
  .addDecorator(reactNavigationDecorator)
  .add('Default', () => <Chatroom />)
