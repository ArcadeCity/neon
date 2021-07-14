/**
 * <RequestBegin /> modal screen is where user enters route addresses,
 * choosing appropriate choices from a list of nearby addresses.
 */

import React, { useEffect, useState } from 'react'
import { Platform, TouchableOpacity, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import { useForm } from 'react-hook-form'
import { useDebounce } from 'lib/hooks'
import { useStores } from 'stores'
import { ModalName } from 'stores/modal-store'
import { Icon, Screen, Text, TextField } from 'views/shared' // TextFieldNew as TextField
import { palette } from 'views/theme'

export const RequestBegin: React.FC<{}> = observer(() => {
  // State
  const { modalStore, serviceStore } = useStores()
  const service: 'ride' | 'delivery' | 'other' = modalStore.props.serviceType
  const addressSearchResults: any = serviceStore.addressSearchResults

  // UI
  const promptText = serviceTexts[service]
  const pickupText = pickupTexts[service]
  const dropoffText = dropoffTexts[service]
  const activeRequest = serviceStore?.activeRequest

  // If there's no active request, create a template one
  useEffect(() => {
    if (!activeRequest) {
      serviceStore.createRequest(service)
    }
  }, [activeRequest])

  // Nav
  useEffect(() => {
    if (activeRequest?.hasBothAddresses) {
      modalStore?.setName(ModalName.REQUEST_CONFIRM)
    }
  }, [activeRequest?.hasBothAddresses])

  // Form
  const { register, setValue, watch } = useForm({
    defaultValues: {
      startAddress: activeRequest?.pickup?.prettyName,
      endAddress: activeRequest?.drop?.prettyName,
    },
  })

  useEffect(() => {
    register('startAddress')
    register('endAddress')
  }, [register])

  const start: any = watch('startAddress')
  const end: any = watch('endAddress')
  // const disabled = !start || start.length === 0 || !end || end.length === 0
  const debouncedSearchStart = useDebounce(start, 500)
  const debouncedSearchEnd = useDebounce(end, 500)

  // Searching status (whether there is pending API request)
  const [, setIsSearching] = useState(false)
  const [lastAddressChanged, setLastAddressChanged]: any = useState('')

  useEffect(
    () => {
      if (debouncedSearchStart && debouncedSearchStart.length > 4) {
        setIsSearching(true)
        serviceStore?.searchForAddress(debouncedSearchStart).then(() => {
          setIsSearching(false)
        })
      }
    },
    [debouncedSearchStart] // Only call effect if debounced search term changes
  )

  useEffect(
    () => {
      if (debouncedSearchEnd && debouncedSearchEnd.length > 4) {
        setIsSearching(true)
        serviceStore?.searchForAddress(debouncedSearchEnd).then(() => {
          setIsSearching(false)
        })
      }
    },
    [debouncedSearchEnd] // Only call effect if debounced search term changes
  )

  // ???
  if (modalStore?.status === 'hidden') {
    return <Screen preset='fixedCenter' />
  }

  const android = Platform.OS === 'android'

  return (
    <Screen
      preset='fixedStack'
      style={{ paddingTop: android ? 20 : 50, paddingHorizontal: 40 }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 15,
        }}
      >
        <Text
          text={promptText}
          preset='title3'
          style={{ marginBottom: 0, marginLeft: 45, marginTop: 0 }}
        />
      </View>

      <Text
        preset='sectionHeader'
        text={pickupText}
        style={{ marginTop: 10 }}
      />
      <TextField
        defaultValue={activeRequest?.pickup?.prettyName}
        selectTextOnFocus={true}
        onFocus={() => setLastAddressChanged('start')}
        containerStyle={{ paddingTop: 10 }}
        placeholder='Search for start address'
        placeholderTextColor={palette.blueBell}
        autoFocus={!activeRequest?.pickup}
        onChangeText={(text: string) => {
          setValue('startAddress', text)
          setLastAddressChanged('start')
        }}
      />

      <Text
        preset='sectionHeader'
        text={dropoffText}
        style={{ marginTop: 10 }}
      />
      <TextField
        defaultValue={activeRequest?.drop?.prettyName}
        selectTextOnFocus={true}
        onFocus={() => setLastAddressChanged('end')}
        placeholder='Search for end address'
        placeholderTextColor={palette.blueBell}
        containerStyle={{ paddingTop: 10 }}
        autoFocus={!activeRequest?.drop && !!activeRequest?.pickup}
        onChangeText={(text: string) => {
          setValue('endAddress', text)
          setLastAddressChanged('end')
        }}
      />

      <View style={{ flex: 1, overflow: 'scroll' }}>
        {addressSearchResults &&
          addressSearchResults.map((result: any) => (
            <TouchableOpacity
              style={{
                marginVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              key={result.id}
              onPress={() =>
                serviceStore?.selectAddress(result, lastAddressChanged)
              }
            >
              <Icon name='mapActive' />
              <Text
                preset='descriptionSlim'
                text={result.place_name}
                style={{ marginLeft: 15 }}
              />
            </TouchableOpacity>
          ))}
      </View>
    </Screen>
  )
})

const serviceTexts: any = {
  ride: 'Where to?',
  delivery: 'Request delivery',
  other: 'Service where?',
}

const pickupTexts: any = {
  ride: 'Start address',
  delivery: 'Delivery pick-up address',
  other: 'Start address',
}

const dropoffTexts: any = {
  ride: 'End address',
  delivery: 'Delivery drop-off address',
  other: 'End address',
}
