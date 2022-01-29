import { Command, Flags } from '@oclif/core'
import { ethers } from 'ethers'
import { getProvider } from '../lib/network'
import { WNat__factory as WrapNative } from '../types/factories/WNat__factory'

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
      required: true,
    }),
    key: Flags.string({
      char: 'k',
      description: "The public account's signing key.",
      required: true,
    }),
    amount: Flags.string({
      char: 'm',
      description: 'The amount to wrap.',
      required: true,
    }),
  }

  static args = [{ name: 'account' }, { name: 'key' }, { name: 'amount' }]

  public async run(): Promise<void> {
    const { flags } = await this.parse(Wrap)

    if (flags.amount && flags.account && flags.key) {
      this.log(`Wrapping ${flags.amount} for ${flags.account}`)

      // Setup the items needed to sign the transaction.
      const provider = getProvider()
      const signer = new ethers.Wallet(flags.key, provider)
      const contractAddress = '0x02f0826ef6aD107Cfc861152B32B52fD11BaB9ED' // This is a fixed value on the network.

      // Setup the contract call.
      const wnat = WrapNative.connect(contractAddress, signer)
      const wei = ethers.utils.parseEther(flags.amount)
      const amount = wei.toString()
      await wnat.deposit({ from: flags.account, value: amount })
    } else {
      this.log(
        'Please provide an account number, a private key, and an amount when running this command. Try wrap --help for more information.'
      )
    }
  }
}
