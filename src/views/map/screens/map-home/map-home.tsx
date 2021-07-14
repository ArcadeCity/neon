import React from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigation } from '@react-navigation/native'
import { useStores } from 'stores'
import { MapIdle } from '../map-idle'
import { RequestActive } from 'views/service'

export const MapHome: React.FC<{}> = observer(() => {
  // State
  const { serviceStore } = useStores()
  const acGeo = 'Arcade City' // ?? authStore.acGeo
  const hasActiveServiceRequest = serviceStore.hasActiveServiceRequest

  // Nav
  const title = hasActiveServiceRequest ? 'Your Request' : acGeo
  const { setOptions } = useNavigation()
  setOptions({ title })

  return hasActiveServiceRequest ? <RequestActive /> : <MapIdle />
})
