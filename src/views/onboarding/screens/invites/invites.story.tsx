import * as React from 'react'
import { storiesOf } from '@storybook/react-native'
import { reactNavigationDecorator } from 'storybook/navigation-decorator'
import { RootStore, RootStoreModel, RootStoreProvider } from 'stores'
import { Invites } from '../invites'
import { authedPlayer } from 'storybook/demo-data'

const store = {
  authStore: {
    player: authedPlayer,
  },
}

const rootStore = RootStoreModel.create(store) as RootStore

storiesOf('Onboarding - Invites screen', module)
  .addDecorator((fn) => (
    <RootStoreProvider value={rootStore}>{fn()}</RootStoreProvider>
  ))
  .addDecorator(reactNavigationDecorator)
  .add('Default', () => <Invites />)
