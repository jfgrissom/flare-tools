import { Command, Flags } from '@oclif/core'
import { ethers } from 'ethers'
import { getProvider } from '../lib/network'

export default class Wrap extends Command {
  static description =
    'Wraps the amount of asset provided for the given account.'

  static examples = [
    '<%= config.bin %> <%= command.id %> -a 0xE29FDd1b740913CB54404a1d50A3dfC40041f619 -k 0xc5e8f61d1ab959b397eecc0a37a6517b8e67a0e7cf1f4bce5591f3ed80199122 -m 10',
  ]

  static flags = {
    account: Flags.string({
      char: 'a',
      description:
        'The public address of the account holding the funds to be wrapped.',
    }),
    key: Flags.string({
      char: 'k',
      description: "The public account's signing key.",
    }),
    amount: Flags.string({ char: 'm', description: 'The amount to wrap.' }),
  }

  static args = [{ name: 'account' }, { name: 'amount' }]

  public async run(): Promise<void> {
    const { flags } = await this.parse(Wrap)

    const provider = getProvider()

    if (flags.amount && flags.account) {
      this.log(`Wrapping ${flags.amount} for ${flags.account}`)
    } else {
      this.log(
        'Please provide an account number, a private key, and an amount when running this command.'
      )
    }
  }
}
