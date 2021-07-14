// @ts-nocheck
import React, { useState } from 'react'
import { Image, View } from 'react-native'
import FlipCard from 'react-native-flip-card'
import { useStores } from 'stores'
import { Button, Screen, TextField } from 'views/shared'

export const AddCard: React.FC<{}> = () => {
  // State
  const { serviceStore } = useStores()

  // UI
  const [flip, setFlip] = useState(false)

  return (
    <Screen preset='fixedStack'>
      <FlipCard
        flip={flip}
        flipHorizontal={true}
        flipVertical={false}
        friction={10}
        perspective={2000}
      >
        <Image
          source={require('./card-front.png')}
          style={{ marginTop: 60, width: '100%' }}
          resizeMode='contain'
        />
        <Image
          source={require('./card-back.png')}
          style={{ marginTop: 60, width: '100%' }}
          resizeMode='contain'
        />
      </FlipCard>
      <View style={{ flex: 1 }}>
        <TextField placeholder='Card number' />
        <Button
          text='Create dummy card'
          onPress={() => serviceStore.createDummyCard()}
          style={{ marginBottom: 40 }}
        />
        <Button
          text='Flip'
          onPress={() => setFlip(!flip)}
          style={{ marginBottom: 40 }}
        />
      </View>
    </Screen>
  )
}
