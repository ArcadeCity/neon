import React, { useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Animated,
  TouchableOpacity,
  View,
} from 'react-native'
import { observer } from 'mobx-react-lite'
import { useNavigation } from '@react-navigation/native'
import { useStores } from 'stores'
import { ServiceRequestStatus } from 'stores/service-store'
import { Button, Icon, Text } from 'views/shared'
import { spacing } from 'views/theme'
import * as s from './style'

export const RequestOverlay = observer(() => {
  // State
  const { serviceStore } = useStores()
  const { goBack, navigate } = useNavigation()

  // How many chat messages are in this request? If > 0, navigate once to
  const messageCount =
    serviceStore.activeRequest?.chatroom?.driverMessages.length
  const messagesYes = messageCount && messageCount > 0
  // useEffect(() => {
  //     if (messagesYes && messageCount === 1) {
  //         console.log('navving there')
  //         navigate('service', { screen: 'requestChat' })
  //     }
  // }, [messageCount])

  // UI
  const [show, setShow] = useState(false)
  const explain = () =>
    Alert.alert(
      'We send your request to nearby drivers. They will send a message if they can take your request. Select your driver and they will receive the addresses you entered.'
    )
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

  // Animation
  const overlayOpacity = useRef(new Animated.Value(0)).current
  const toggleOpacity = useRef(new Animated.Value(0)).current
  useEffect(() => {
    setShow(true)
  }, [])
  useEffect(() => {
    Animated.timing(overlayOpacity, {
      toValue: show ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start()
    Animated.timing(toggleOpacity, {
      toValue: show ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }, [show])

  const yesAnd =
    serviceStore.activeRequest?.status === ServiceRequestStatus.CLAIMED

  return show ? (
    <Animated.View
      style={{
        ...s.DRIVEROVERLAY,
        opacity: overlayOpacity,
      }}
    >
      {messagesYes ? (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text
            preset='title2'
            text={yesAnd ? 'Driver selected!' : 'Drivers have responded!'}
          />
          <Text
            preset='descriptionSlim'
            text={yesAnd ? 'Chat with your driver.' : 'Go select your driver.'}
          />
          <Button
            text='Go to Request Chat'
            style={{
              marginTop: spacing[3],
              marginBottom: spacing[5],
              // width: 200,
            }}
            onPress={() => navigate('service', { screen: 'requestChat' })}
          />
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity style={s.SPINNER} onPress={explain}>
            <ActivityIndicator />
          </TouchableOpacity>
          <Text
            preset='title3'
            text='Waiting for driver'
            style={{ marginBottom: 18 }}
          />
        </View>
      )}

      <TouchableOpacity style={s.CLOSEBTN} onPress={explain}>
        <Icon name='support' />
      </TouchableOpacity>
      {!messagesYes && (
        <Button
          text='Cancel'
          onPress={cancel}
          style={{ marginTop: 0, marginBottom: 6 }}
          preset='small'
        />
      )}
    </Animated.View>
  ) : (
    <Animated.View style={{ ...s.OPENBTN, opacity: toggleOpacity }}>
      <Button
        text='Open'
        preset='purpleglow'
        // icon
        onPress={() => setShow(true)}
      >
        <Icon name='rider' />
      </Button>
    </Animated.View>
  )
})
