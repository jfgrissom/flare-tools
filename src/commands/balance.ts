import { Command, Flags } from '@oclif/core'
import { ethers } from 'ethers'
import { getProvider } from '../lib/network'

export default class Balance extends Command {
  static description = 'Gets balance for a provided account.'

  static examples = [
    '<%= config.bin %> <%= command.id %> -a 0xE29FDd1b740913CB54404a1d50A3dfC40041f619',
  ]

  static flags = {
    account: Flags.string({ char: 'a', description: 'account' }),
  }

  public async run(): Promise<void> {
    this.log('Getting account balance from the network:')
    const { flags } = await this.parse(Balance)
    if (flags.account) {
      const provider = getProvider()
      const balance = await provider.getBalance(flags.account)
      this.log(`Account: ${flags.account}`)
      this.log(`$SGB Balance: ${ethers.utils.formatEther(balance)}`)
    } else {
      this.log('Please provide an account number when running this command.')
    }
  }
}
