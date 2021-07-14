import React from 'react'
import { Alert, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import * as Linking from 'expo-linking'
import { useStores } from 'stores'
import { ServiceRequest, ServiceRequestStatus } from 'stores/service-store'
import { Button, Text } from 'views/shared'
import { color } from 'views/theme'
import { useNavigation } from '@react-navigation/native'

interface Props {
  request: ServiceRequest
}

export const RequestStatusBar = observer(({ request }: Props) => {
  const { authStore, serviceStore } = useStores()
  const { goBack } = useNavigation()

  if (!request.playerRequesting) return null

  const userId = authStore.id

  const navigateToPickup = () => {
    let daddr = encodeURIComponent(`${request.pickup?.prettyName}`)

    Linking.openURL(`http://maps.google.com/?daddr=${daddr}`)
  }

  const resolve = () => {
    Alert.alert(
      'Resolve your request?',
      'Your request was completed and service is no longer needed?',
      [
        {
          text: 'Yes, #resolved',
          onPress: () => serviceStore.resolveRequest(),
          // style: 'destructive',
        },
        {
          text: 'No',
          style: 'cancel',
        },
      ]
    )
  }

  const cancel = () => {
    Alert.alert(
      'Cancel your request?',
      'Are you sure? You may be penalized for excessive cancellations.',
      [
        {
          text: 'Yes, cancel',
          onPress: () => {
            goBack()
            serviceStore.cancelRequest()
          },
          style: 'destructive',
        },
        {
          text: 'No',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    )
  }

  let statusText
  let backgroundColor = color.palette.portGore
  switch (request.status) {
    case ServiceRequestStatus.AWAITING_DRIVERS:
      statusText = 'Awaiting drivers'
      backgroundColor = color.palette.minsk
      break
    case ServiceRequestStatus.CANCELLED_BY_RIDER:
      statusText = 'Cancelled by rider'
      backgroundColor = color.palette.haiti
      break
    case ServiceRequestStatus.CLAIMED:
      statusText = `Driver: ${request.playerClaiming?.username}`
      backgroundColor = color.palette.electricViolet // TODO: if its these folks
      break
    case ServiceRequestStatus.RESOLVED_BY_RIDER:
      statusText = 'Resolved by rider'
      backgroundColor = color.palette.haiti // TODO: if its these folks
      break
    default:
      break
  }

  const pickup = request.pickup
  const drop = request.drop

  if (!pickup || !drop || !pickup.coords || !drop.coords) return null

  // console.tron.display({
  //   name: 'RequestStatusBar',
  //   preview: 'Heres the request',
  //   value: request,
  //   important: true,
  // })

  const requestIsNotActive =
    request.status === ServiceRequestStatus.CANCELLED_BY_RIDER ||
    request.status === ServiceRequestStatus.RESOLVED_BY_RIDER

  const imTheRider = request.playerRequesting.id === userId
  const imTheDriver = request.playerClaiming?.id === userId

  let componentToRender

  if (requestIsNotActive) {
    componentToRender = (
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Text text={`${statusText}`} preset='bold' />
      </View>
    )
  } else if (!requestIsNotActive && imTheDriver) {
    componentToRender = (
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}
        >
          <Button
            preset='small'
            tx='service.navigateToPickup'
            onPress={navigateToPickup}
            style={{ marginRight: 8 }}
          />
        </View>
      </View>
    )
  } else if (!requestIsNotActive && imTheRider) {
    componentToRender = (
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}
        >
          <Button
            preset='small'
            text='Cancel'
            onPress={cancel}
            style={{ marginRight: 8 }}
          />
          {!!request.playerClaiming && (
            <Button preset='small' text='Resolve' onPress={resolve} />
          )}
        </View>
      </View>
    )
  }

  return (
    <View
      key={request.id}
      style={{
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 4,
        backgroundColor,
        borderTopColor: color.palette.minsk,
        borderTopWidth: 1,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
      }}
    >
      {componentToRender}
    </View>
  )
})
