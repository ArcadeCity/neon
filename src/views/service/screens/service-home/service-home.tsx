import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigation } from '@react-navigation/native'
import { useStores } from 'stores'
import { Screen } from 'views/shared'
import { RequestFeed } from 'views/service/components/request-feed'

export const ServiceHome: React.FC<{}> = observer(() => {
  // State
  const { authStore } = useStores()
  const isServiceProvider = authStore.isServiceProvider

  // Nav
  const { setOptions } = useNavigation()
  useEffect(() => {
    const title = isServiceProvider
      ? 'Service Request Feed'
      : 'Your Service Requests'
    setOptions({ title })
  }, [isServiceProvider])

  return (
    <Screen preset='fixedStackSlim'>
      <RequestFeed />
    </Screen>
  )
})
