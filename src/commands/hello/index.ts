import {Args, Command, Flags} from '@oclif/core'
import api from '../../api.js'

export default class Hello extends Command {
  static args = {
    person: Args.string({description: 'Person to say hello to', required: true}),
  }

  static description = 'Say hello'

  static examples = [
    `<%= config.bin %> <%= command.id %> friend --from oclif
hello friend from oclif! (./src/commands/hello/index.ts)
`,
  ]

  static flags = {
    from: Flags.string({char: 'f', description: 'Who is saying hello', required: true}),
  }

  async run(): Promise<void> {
    api
      .postMessage("package.json")
      .then(() => {
        console.log('done')
      })
      .catch((err) => {
        console.error(err)
      })

    const {args, flags} = await this.parse(Hello)

    this.log(`hello ${args.person} from ${flags.from}! (./src/commands/hello/index.ts)`)
  }
}
