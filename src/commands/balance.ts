import { Command, Flags } from '@oclif/core'
import { ethers } from 'ethers'

export default class Balance extends Command {
  static description = 'Gets balance for a provided account.'

  static examples = [
    '<%= config.bin %> <%= command.id %> -a 0xE29FDd1b740913CB54404a1d50A3dfC40041f619',
  ]

  static flags = {
    // flag with a value (-a, --account=VALUE)
    account: Flags.string({ char: 'a', description: 'account' }),
  }

  public async run(): Promise<void> {
    this.log('Getting account balance from the network:')
    const { flags } = await this.parse(Balance)
    if (flags.account) {
      const provider = ethers.getDefaultProvider()
      const balance = await provider.getBalance(flags.account)
      this.log(`Account: ${flags.account}`)
      this.log(`Balance: ${balance}`)
    }
  }
}
