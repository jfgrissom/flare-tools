import { Command, Flags } from '@oclif/core'
import { ethers } from 'ethers'

import { getProvider } from '../lib/network'
import { WNat__factory as WrapNative } from '../types/factories/WNat__factory'
import { ContractAddresses } from '../constants/contract'

export default class Delegate extends Command {
  static description =
    'Delegates the amount of WSDG provided for the given account to the given Time Series Oracle.'

  static examples = [
    '<%= config.bin %> <%= command.id %> -a 0xE29FDd1b740913CB54404a1d50A3dfC40041f619 -k 0xc5e8f61d1ab959b397eecc0a37a6517b8e67a0e7cf1f4bce5591f3ed80199122 -p 0xD9200CC419BDe28B169AD8c904d2687a15A4Bf9F -m 10'
  ]

  static flags = {
    account: Flags.string({
      char: 'a',
      description:
        'The public address of the account holding the funds to be delegated.',
      required: true
    }),
    key: Flags.string({
      char: 'k',
      description: "The public account's signing key.",
      required: true
    }),
    provider: Flags.string({
      char: 'p',
      description:
        'The public address of the price provider you would like to delegate to.',
      required: true
    }),
    amount: Flags.string({
      char: 'm',
      description: 'The amount to delegate in percentage (50 = 50%).',
      required: true
    })
  }

  static args = [
    { name: 'account' },
    { name: 'key' },
    { name: 'provider' },
    { name: 'amount' }
  ]

  public async run(): Promise<void> {
    const { flags } = await this.parse(Delegate)

    this.log(
      `Delegating ${flags.amount}% of $WSGB from ${flags.account} to ${flags.provider}.`
    )

    // Setup the items needed to sign the transaction.
    const provider = getProvider()
    const signer = new ethers.Wallet(flags.key, provider)
    const contractAddress = ContractAddresses.WRAP_NATIVE // This is a fixed value on the network.

    // Setup the contract call.
    const wnat = WrapNative.connect(contractAddress, signer)
    // const amount = Number(flags.amount)
    // const gasPrice = await provider.getGasPrice()
    // const maxFee = await provider.estimateGas()
    // this.log('Gas Price:', ethers.utils.formatUnits(gasPrice))

    // const gasLimit = ethers.BigNumber.from(gasPrice.toNumber() * 3)
    // this.log('Gas Limit:', gasLimit.toString())
    // this.log('Gas Limit as ETH:', ethers.utils.formatUnits(gasLimit))
    // this.log('Gas Limit as STR:', ethers.BigNumber.from(gasLimit).toString())

    const amount = ethers.BigNumber.from(flags.amount)
    this.log('Percentage Amount:', amount.toString())

    // Cast provided percentage to basis points.
    const bips = Number(flags.amount) * 100

    await wnat.delegate(flags.provider, ethers.BigNumber.from(bips), {
      from: flags.account
    })
  }
}
