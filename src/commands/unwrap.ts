import { Command, Flags } from '@oclif/core'
import { ethers } from 'ethers'

import { getProvider } from '../lib/network'
import { WNat__factory as WrapNative } from '../types/factories/WNat__factory'
import { WRAP_NATIVE_CONTRACT } from '../constants/contract'

export default class Wrap extends Command {
  static description =
    'Unwraps the amount of asset provided for the given account.'

  static examples = [
    '<%= config.bin %> <%= command.id %> -a 0xE29FDd1b740913CB54404a1d50A3dfC40041f619 -k 0xc5e8f61d1ab959b397eecc0a37a6517b8e67a0e7cf1f4bce5591f3ed80199122 -m 10'
  ]

  static flags = {
    account: Flags.string({
      char: 'a',
      description:
        'The public address of the account holding the funds to be wrapped.',
      required: true
    }),
    key: Flags.string({
      char: 'k',
      description: "The public account's signing key.",
      required: true
    }),
    amount: Flags.string({
      char: 'm',
      description: 'The amount to unwrap.',
      required: true
    })
  }

  static args = [{ name: 'account' }, { name: 'key' }, { name: 'amount' }]

  public async run(): Promise<void> {
    const { flags } = await this.parse(Wrap)

    if (flags.amount && flags.account && flags.key) {
      this.log(`Unwrapping ${flags.amount} for ${flags.account}`)

      // Setup the items needed to sign the transaction.
      const provider = getProvider()
      const signer = new ethers.Wallet(flags.key, provider)

      // Setup the contract call.
      const wnat = WrapNative.connect(WRAP_NATIVE_CONTRACT.ADDRESS, signer)
      const amount = ethers.utils.parseEther(flags.amount)
      await wnat.withdraw(amount)
    } else {
      this.log(
        'Please provide an account number, a private key, and an amount when running this command. Try wrap --help for more information.'
      )
    }
  }
}
