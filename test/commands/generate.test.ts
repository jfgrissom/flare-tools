import { expect, test } from '@oclif/test'

describe('Generate', () => {
  test
    .stdout()
    .command(['generate'])
    .it('generates ', (ctx) => {
      expect(ctx.stdout).to.contain(
        'This key pair will work on all EVM compatible blockchains:'
      )
      expect(ctx.stdout).to.contain('Spending (private/secret): 0x')
      expect(ctx.stdout).to.contain('Address (public/sharable): 0x')
    })
})
