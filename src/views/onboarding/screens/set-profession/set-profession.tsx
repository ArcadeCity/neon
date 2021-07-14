import React, { useEffect, useState } from 'react'
import { ViewStyle } from 'react-native'
import { observer } from 'mobx-react-lite'
import { useNavigation } from '@react-navigation/native'
import { useStores } from 'stores'
import { Button, Screen, Text } from 'views/shared'
import { spacing } from 'views/theme'
import { categories, professions } from './professions'

export const SetProfession: React.FC<{}> = observer(() => {
  // Nav
  const { goBack, setOptions } = useNavigation()
  useEffect(() => {
    setOptions({ title: 'Select Profession' })
  }, [])

  // State
  const { authStore } = useStores()

  // UI
  const [profession, setProfession] = useState('Rider')
  const [confirming, setConfirming] = useState(false)
  const [, setConfirmed] = useState(false)
  const [toggleSubclass, setToggleSubclass] = useState(false)
  const [selectedCategory, selectCategory] = useState('')
  const selectProfession = (selectedProfession: string) => {
    setConfirming(true)
    setProfession(selectedProfession)
  }

  const ConfirmingPane = () => (
    <>
      <Text
        preset='title3'
        text={`Confirm ${profession}?`}
        style={{ marginVertical: 10, textAlign: 'center', paddingTop: 40 }}
      />
      <Button
        text={`Yes, ${profession}`}
        style={BUTTON}
        onPress={() => {
          setConfirmed(true)
          authStore.saveProfession(profession)
          goBack()
        }}
      />
      <Button
        text='No'
        style={BUTTON}
        preset='secondary'
        onPress={() => setConfirming(false)}
      />
    </>
  )

  const SelectionPane = () => (
    <>
      <Text
        preset='title3'
        text='Are you a rider or driver?'
        style={{ marginVertical: 10, textAlign: 'center', paddingTop: 40 }}
      />
      <Text
        preset='bold'
        text='Or another service provider?'
        style={{ paddingBottom: 30, textAlign: 'center' }}
      />

      <Button
        text='Rider'
        style={BUTTON}
        onPress={() => selectProfession('Rider')}
      />
      <Button
        text='Driver'
        preset='purpleglow'
        style={BUTTON}
        onPress={() => selectProfession('Driver')}
      />
      <Button
        text='Other'
        preset='secondary'
        style={BUTTON}
        onPress={() => {
          setToggleSubclass(!toggleSubclass)
        }}
      />

      {toggleSubclass && (
        <>
          {categories.map((category) => (
            <>
              <Button
                text={category}
                key={category}
                preset='secondary'
                style={BUTTON}
                onPress={() => {
                  if (selectedCategory === category) {
                    selectCategory('')
                  } else {
                    selectCategory(category)
                  }
                }}
              />
              {selectedCategory === category && (
                <>
                  {professions[category].map((profession: string) => (
                    <Button
                      text={profession}
                      key={profession}
                      preset='purpleglow'
                      style={BUTTON}
                      onPress={() => selectProfession(profession)}
                    />
                  ))}
                </>
              )}
            </>
          ))}
        </>
      )}
    </>
  )

  return (
    <Screen preset='scrollStack'>
      {confirming ? <ConfirmingPane /> : <SelectionPane />}
    </Screen>
  )
})

const BUTTON: ViewStyle = {
  marginVertical: spacing[4],
}
