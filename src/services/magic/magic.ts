import { Magic as MagicSDK } from '@magic-sdk/react-native'
import { SolanaExtension } from '@magic-ext/solana'

// Magic Solana doesn't yet work on React Native

export const magic = new MagicSDK('pk_live_4C679FE162F04FDC', {
  extensions: [
    new SolanaExtension({
      rpcUrl: 'https://api.mainnet-beta.solana.com',
    }),
  ],
})

export class Magic {
  sdk: any // MagicSDK

  async setup() {
    this.sdk = magic
  }
}
