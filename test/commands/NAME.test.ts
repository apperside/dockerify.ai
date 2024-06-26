import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('NAME', () => {
  it('runs NAME cmd', async () => {
    const {stdout} = await runCommand('NAME')
    expect(stdout).to.contain('hello world')
  })

  it('runs NAME --name oclif', async () => {
    const {stdout} = await runCommand('NAME --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
