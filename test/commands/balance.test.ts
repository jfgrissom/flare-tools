import { expect, test } from '@oclif/test'

describe('Balance', () => {
  test
    .stdout()
    .command([
      'balance',
      '--account',
      '0xE29FDd1b740913CB54404a1d50A3dfC40041f619',
    ])
    .it(
      'runs balance --account 0xE29FDd1b740913CB54404a1d50A3dfC40041f619',
      (ctx) => {
        expect(ctx.stdout).to.contain(
          'Getting account balance from the network:'
        )
        expect(ctx.stdout).to.contain('Account: 0x')
        expect(ctx.stdout).to.contain('Balance: ')
      }
    )
})
