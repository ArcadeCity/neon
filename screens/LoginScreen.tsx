import * as React from 'react'
import { Image, StyleSheet } from 'react-native'
import { Text, View } from '../components/Themed'
import { images, palette, typography } from '../theme'

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={images.logo}
        style={{
          width: 80,
          height: 80,
          resizeMode: 'contain',
          marginBottom: 20,
        }}
      />
      <Text style={styles.title}>Neon Wallet</Text>
      <View
        style={styles.separator}
        lightColor='#eee'
        darkColor='rgba(255,255,255,0.1)'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.haiti,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: typography.primary,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
