import { Command } from '@oclif/core'
import { ethers } from 'ethers'
import * as crypto from 'crypto'

export default class Generate extends Command {
  static description = 'Generates new key pair.'

  static examples = ['$ ft generate']

  async run(): Promise<void> {
    const id = crypto.randomBytes(32).toString('hex')
    const privateKey = `0x${id}`
    const wallet = new ethers.Wallet(privateKey)

    this.log('This key pair will work on all EVM compatible blockchains: ')
    this.log('Spending (private/secret):', privateKey)
    this.log('Address (public/sharable):', wallet.address)
  }
}
