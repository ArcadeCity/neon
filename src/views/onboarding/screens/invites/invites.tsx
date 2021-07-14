import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import { useStores } from 'stores'
import { Button, Screen, Text, TextField } from 'views/shared'
import { spacing } from 'views/theme'

export const Invites = () => {
  // Nav
  const { goBack, setOptions } = useNavigation()

  useEffect(() => {
    setOptions({ title: 'Invites' })
  }, [])

  // State
  const { authStore } = useStores()
  const invites = authStore.invites

  // Form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()
  const [field, setField] = useState('')
  const submitInvite = async ({ inviteEmail }: any) => {
    const save = await authStore.saveInvite(inviteEmail, 'Test')
    if (save) {
      goBack()
    }
  }
  useEffect(() => {
    register('inviteEmail', {
      required: 'Email required',
      pattern: { value: /^\S+@\S+$/i, message: 'Not an email address' },
    })
    // setValue('bio', bio)
    // setField(bio ?? '')
  }, [register])

  const isError = !!errors.inviteEmail?.message

  return (
    <Screen preset='fixedStack'>
      <Text preset='title' text='Send Invite' style={{ paddingTop: 40 }} />
      <Text preset='description' text={`You have ${invites} invites.`} />
      <TextField
        value={field}
        // autoFocus={true}
        placeholder='Email address to invite'
        onChangeText={(text) => {
          setValue('inviteEmail', text)
          setField(text)
        }}
        inputStyle={{ padding: spacing[3] }}
      />

      {isError && (
        <Text
          preset='error'
          text={errors.inviteEmail?.message}
          style={{ marginBottom: spacing[5] }}
        />
      )}

      <Button
        onPress={handleSubmit(submitInvite)}
        text='Submit'
        disabled={!invites}
      />
    </Screen>
  )
}
