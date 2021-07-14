import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import { useStores } from 'stores'
import { capitalize } from 'lib/util'
import { ServiceRequest, ServiceRequestStatus } from 'stores/service-store'
import { PlayerDetail } from 'views/player'
import { Icon, Text } from 'views/shared'
import { color } from 'views/theme'
import { Alert } from 'react-native'

interface Props {
  activeOpacity?: number
  request: ServiceRequest
}

export const RequestDetailSimple = observer(
  ({ activeOpacity, request }: Props) => {
    const fromNow = moment(request.when).fromNow()
    const { authStore, serviceStore } = useStores()
    if (!request.playerRequesting) return null

    let statusText
    let backgroundColor = color.palette.portGore
    switch (request.status) {
      case ServiceRequestStatus.AWAITING_DRIVERS:
        statusText = 'Needs a driver'
        backgroundColor = color.palette.minsk
        break
      case ServiceRequestStatus.CANCELLED_BY_RIDER:
        statusText = 'Cancelled by rider'
        backgroundColor = color.palette.haiti
        break
      case ServiceRequestStatus.CLAIMED:
        statusText = `Driver: ${request.playerClaiming?.username}`
        break
      case ServiceRequestStatus.RESOLVED_BY_RIDER:
        statusText = 'Resolved by rider'
        backgroundColor = color.palette.haiti // TODO: if its these folks
        break
      default:
        statusText = request.status
        break
    }

    const pickup = request.pickup
    const drop = request.drop

    if (!pickup || !drop || !pickup.coords || !drop.coords) {
      Alert.alert('Insufficient address info to render request')
      return null
    }

    const pickupDistance = authStore.distance(pickup.coords)
    const dropDistance = authStore.distance(drop.coords)
    const userId = authStore.id
    const imTheDriver = request.playerClaiming?.id === userId
    const pickupText = imTheDriver
      ? request.pickup?.prettyName
      : `Pickup ${pickupDistance} km away`
    const dropText = imTheDriver
      ? request.drop?.prettyName
      : `Dropoff ${dropDistance} km away`

    return (
      <TouchableOpacity
        activeOpacity={activeOpacity ?? 1}
        key={request.id}
        style={{
          width: '96%',
          padding: 20,
          backgroundColor,
          borderRadius: 8,
        }}
        onPress={() => {
          serviceStore.setActiveRequest(request.id)
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'column' }}>
            <Text text={`${capitalize(request.type)} request`} preset='bold' />
            <Text text={fromNow} preset='descriptionSlim' />
          </View>

          <View
            style={{
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}
          >
            <Text text={`${statusText}`} preset='bold' />
            <Text
              text={`${request?.chatroom?.messages.length ?? 0} comments`}
              preset='descriptionSlim'
            />
          </View>
        </View>

        <PlayerDetail player={request.playerRequesting} />

        {!!request.details && (
          <View style={{ flexDirection: 'row', marginTop: 4 }}>
            <View
              style={{
                marginLeft: 10,
                height: 40,
                width: 40,
                justifyContent: 'center',
              }}
            >
              <Icon name='inbox' />
            </View>
            <View>
              <Text text={`"${request.details}"`} />
            </View>
          </View>
        )}

        <View style={{ flexDirection: 'row', marginTop: 14 }}>
          <View
            style={{
              marginLeft: 10,
              height: 40,
              width: 40,
              justifyContent: 'center',
            }}
          >
            <Icon name='map' />
          </View>
          <View>
            <Text text={pickupText} />
            <Text text={dropText} preset='descriptionSlim' />
          </View>
        </View>
      </TouchableOpacity>
    )
  }
)
