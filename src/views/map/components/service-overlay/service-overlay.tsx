import React, { useEffect, useRef, useState } from 'react'
import { Animated, TouchableOpacity, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import { useStores } from 'stores'
import { ModalName } from 'stores/modal-store'
import { Button, Icon, Text } from 'views/shared'
import * as s from './style'

export const ServiceOverlay = observer(() => {
  // State
  const { authStore, modalStore, serviceStore } = useStores()
  const username = authStore.username

  // UI
  const [show, setShow] = useState(false)
  const openModal = (serviceType: string) => {
    serviceStore.setActiveRequest(undefined)
    modalStore.openModal(ModalName.REQUEST_BEGIN, { serviceType })
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

  return show ? (
    <Animated.View style={{ ...s.DRIVEROVERLAY, opacity: overlayOpacity }}>
      <TouchableOpacity style={s.CLOSEBTN} onPress={() => setShow(false)}>
        <Icon name='close' />
      </TouchableOpacity>
      <Text preset='descriptionSlim' text={`Welcome, ${username}!`} />
      <Text
        preset='title3'
        text='How can we help?'
        style={{ marginBottom: 18 }}
      />
      <View
        style={{ flex: 1, flexDirection: 'row', marginTop: 4, marginBottom: 2 }}
      >
        <Button
          text='Ride'
          onPress={() => openModal('ride')}
          preset='purpleglow'
          style={{ marginRight: 15, flex: 1 }}
          textStyle={{ fontSize: 18, lineHeight: 24 }}
          withIcon='car'
        />
        <Button
          text='Delivery'
          onPress={() => openModal('delivery')}
          style={{ flex: 1 }}
          textStyle={{ fontSize: 18, lineHeight: 24 }}
          withIcon='shopping-cart'
        />
      </View>

      <Button
        text='Something else'
        onPress={() => openModal('other')}
        style={{ marginTop: 22, marginBottom: 6 }}
        preset='small'
      />
    </Animated.View>
  ) : (
    <Animated.View style={{ ...s.OPENBTN, opacity: toggleOpacity }}>
      <Button
        text='Open'
        preset='purpleglow'
        icon
        onPress={() => setShow(true)}
      >
        <Icon name='rider' />
      </Button>
    </Animated.View>
  )
})
