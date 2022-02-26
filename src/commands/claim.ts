import { Command, Flags } from '@oclif/core'
import { ethers } from 'ethers'

import { getProvider } from '../lib/network'
import { RewardManager__factory as RewardManager } from '../types/factories/RewardManager__factory'
import { ContractAddresses } from '../constants/contract'

// TODO: EPOCHS to claim are currently hard coded.
export default class Claim extends Command {
  static description = 'Claims rewards for the given account.'

  static examples = [
    '<%= config.bin %> <%= command.id %> -a 0xE29FDd1b740913CB54404a1d50A3dfC40041f619 -k 0xc5e8f61d1ab959b397eecc0a37a6517b8e67a0e7cf1f4bce5591f3ed80199122'
  ]

  static flags = {
    account: Flags.string({
      char: 'a',
      description: 'The public address of the account owed rewards.',
      required: true
    }),
    key: Flags.string({
      char: 'k',
      description: "The public account's signing key.",
      required: true
    })
  }

  static args = [{ name: 'account' }, { name: 'key' }]

  public async run(): Promise<void> {
    const { flags } = await this.parse(Claim)

    this.log(`Claiming rewards for ${flags.account}`)

    // Setup the items needed to sign the transaction.
    const provider = getProvider()
    const signer = new ethers.Wallet(flags.key, provider)

    // Setup the contract call.
    const rewardManager = RewardManager.connect(
      ContractAddresses.REWARD_MANAGER,
      signer
    )
    await rewardManager.claimReward(flags.account, [19, 20, 21, 22])
    this.log('Rewards claimed.')
  }
}
