import { Command, Flags } from '@oclif/core'
import { ethers } from 'ethers'

import { getProvider } from '../lib/network'

export default class Payment extends Command {
  static description = 'Pay funds to another account.'

  static examples = [
    '<%= config.bin %> <%= command.id %> -a 0xE29FDd1b740913CB54404a1d50A3dfC40041f619 -k 0xc5e8f61d1ab959b397eecc0a37a6517b8e67a0e7cf1f4bce5591f3ed80199122 -r 0x48602d7Ce2c2072D02Cb79D34470C68Cbf2d9DAE -m 10'
  ]

  static flags = {
    account: Flags.string({
      char: 'a',
      description: 'Payer account.',
      required: true
    }),
    key: Flags.string({
      char: 'k',
      description: 'Payer account key.',
      required: true
    }),
    recipient: Flags.string({
      char: 'r',
      description: 'Payee public account.',
      required: true
    }),
    amount: Flags.string({
      char: 'm',
      description: 'The amount you would like to send.',
      required: true
    })
  }

  public async run(): Promise<void> {
    const { flags } = await this.parse(Payment)

    const provider = getProvider()
    const signer = new ethers.Wallet(flags.key, provider)
    this.log(`Sending ${flags.amount} $SGB to ${flags.recipient}.`)
    const transaction: ethers.providers.TransactionRequest = {
      from: flags.account,
      to: flags.recipient,
      value: ethers.utils.parseEther(flags.amount),
      nonce: await provider.getTransactionCount(flags.account, 'latest')
    }
    await signer.sendTransaction(transaction)
    this.log('Funds have been sent.')
  }
}
