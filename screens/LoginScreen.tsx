import * as React from 'react'
import {
  Alert,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import { Text, View } from '../components/Themed'
import { color, images, palette, spacing, typography } from 'views/theme'
import { Magic } from 'services/magic'
import * as web3 from '@solana/web3.js'

export default function LoginScreen() {
  const [user, setUser] = React.useState<any>()
  React.useEffect(() => {
    ;(async () => {
      const magic = new Magic()
      await magic.setup()
      try {
        await magic.sdk.user.logout()
        console.log('logged out...?')
        console.log(magic)
        await magic.sdk.solana.sdk.auth.loginWithMagicLink({
          email: 'chris@arcade.city',
          showUI: false,
        })
        console.log('Login successful')
        const magicUser = await magic.sdk.solana.sdk.user.getMetadata()
        console.log(magicUser)
        setUser(magicUser)
        const transaction = web3.SystemProgram.transfer({
          fromPubkey: magicUser.publicAddress,
          toPubkey: new web3.PublicKey(
            '9kPmf9egtyUtNvmnf25KsP5QE6VTBfXXhJJkjEehUXw9'
          ),
          lamports: 1000,
        })
        console.log(transaction)

        // const signature = await magic.sdk.solana.sendAndConfirmTransaction(
        //   transaction
        // )

        // console.log('Signature', signature)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [])

  if (user) {
    return (
      <View style={styles.container}>
        <Image
          source={images.logo}
          style={{
            width: 100,
            height: 100,
            resizeMode: 'contain',
            marginBottom: 20,
          }}
        />
        <Text style={styles.title}>WELCOME</Text>
        <Text
          style={{
            fontFamily: typography.bold,
            fontSize: 18,
            color: color.secondaryText,
          }}
        >
          {user?.publicAddress}
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Image
        source={images.logo}
        style={{
          width: 100,
          height: 100,
          resizeMode: 'contain',
          marginBottom: 20,
        }}
      />
      <Text style={styles.title}>NEON WALLET</Text>

      <View style={FIELD}>
        <TextInput
          placeholder='Email'
          style={{
            width: 300,
            borderRadius: 8,
            flex: 1,
            fontFamily: typography.primary,
            color: color.secondary,
            fontSize: 20,
            lineHeight: 30,
            height: 50,
            backgroundColor: color.field,
            paddingLeft: spacing[4],
            paddingVertical: spacing[3],
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => Alert.alert('yo')}
        style={styles.primary}
      >
        <Text style={{ fontFamily: typography.bold, fontSize: 18 }}>
          Login with Email
        </Text>
      </TouchableOpacity>
      <View
        style={styles.separator}
        lightColor='#eee'
        darkColor='rgba(255,255,255,0.1)'
      />
      <TouchableOpacity
        onPress={() => Alert.alert('yo')}
        style={styles.secondary}
      >
        <Text
          style={{
            fontFamily: typography.bold,
            fontSize: 18,
            color: color.secondaryText,
          }}
        >
          Login with Sollet
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => Alert.alert('yo')}
        style={styles.secondary}
      >
        <Text
          style={{
            fontFamily: typography.bold,
            fontSize: 18,
            color: color.secondaryText,
          }}
        >
          Import wallet
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const FIELD: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  backgroundColor: color.field,
  borderRadius: 8,
  marginTop: 25,
}

const BASE_VIEW: ViewStyle = {
  paddingVertical: spacing[2],
  paddingHorizontal: spacing[2],
  borderRadius: 4,
  // alignSelf: 'stretch',
  minHeight: 50,
  minWidth: 120,
  alignItems: 'center',
  justifyContent: 'center',
  shadowOffset: {
    width: 0,
    height: 6,
  },
  shadowOpacity: 1,
  shadowRadius: 12,
}

const styles = StyleSheet.create({
  primary: {
    ...BASE_VIEW,
    backgroundColor: color.primary,
    shadowColor: 'rgba(91, 32, 242, 0.2)',
    width: 300,
    marginTop: 25,
  },
  secondary: {
    ...BASE_VIEW,
    backgroundColor: color.secondary,
    shadowColor: 'rgba(120, 101, 182, 0.12)',
    width: 300,
    marginBottom: 25,
    // marginTop: 25,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: palette.haiti,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: typography.bold,
    letterSpacing: 1,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
