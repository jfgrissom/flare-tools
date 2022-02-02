import { Command, Flags } from '@oclif/core'
import { ethers, BigNumber } from 'ethers'

import { getProvider } from '../lib/network'
import { WNat__factory as WrapNative } from '../types/factories/WNat__factory'
import { WRAP_NATIVE_CONTRACT } from '../constants/contract'

export default class Balance extends Command {
  static description = 'Gets balance for a provided account.'

  static examples = [
    '<%= config.bin %> <%= command.id %> -a 0xE29FDd1b740913CB54404a1d50A3dfC40041f619'
  ]

  static flags = {
    account: Flags.string({ char: 'a', description: 'account', required: true })
  }

  public async run(): Promise<void> {
    this.log('Getting account balance from the network:')
    const { flags } = await this.parse(Balance)

    const provider = getProvider()
    const sgbBalance = await provider.getBalance(flags.account)
    this.log('Account: ', flags.account)
    this.log('$SGB Balance: ', ethers.utils.formatEther(sgbBalance))

    // Setup the contract call.
    const wnat = WrapNative.connect(WRAP_NATIVE_CONTRACT.ADDRESS, provider)
    const wsgbBalance = await wnat.balanceOf(flags.account)
    this.log('$WSGB Balance: ', ethers.utils.formatEther(wsgbBalance))

    const votingPower = await wnat.votePowerOf(flags.account)
    this.log(
      '$WSGB Remaining Voting Power:',
      ethers.utils.formatEther(votingPower)
    )

    const delegationMode = await wnat.delegationModeOf(flags.account)
    // delegation mode: 0 = NOTSET, 1 = PERCENTAGE, 2 = AMOUNT (i.e. explicit)
    let delegates: [string[], BigNumber[], BigNumber, BigNumber] & {
      _delegateAddresses: string[]
      _bips: BigNumber[]
      _count: BigNumber
      _delegationMode: BigNumber
    }
    switch (delegationMode.toNumber()) {
      case 1:
        this.log('Your current delegation mode is set to Percentage.')
        delegates = await wnat.delegatesOf(flags.account)
        if (delegates[0].length > 0) {
          this.log(
            `You are delegating ${(
              Number(delegates[1]) / 100
            ).toString()}% of your $SGB to ${delegates[0].toString()}`
          )
        }

        break
      case 2:
        this.log('Your current delegation mode is set to an Explicit Amount.')
        break
      default:
        this.log('Your current delegation mode is not set.')
        break
    }
  }
}
