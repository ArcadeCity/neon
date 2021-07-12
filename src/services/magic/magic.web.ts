import { Magic as MagicSDK } from 'magic-sdk'
import { SolanaExtension } from '@magic-ext/solana'

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
