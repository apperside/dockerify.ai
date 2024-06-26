import {Command} from '@oclif/core'
import api from '../../api.js'
import * as fs from 'fs'
import * as path from 'path'
import inquirer from 'inquirer'
import {ux} from '@oclif/core/ux'

type NeedFileContentResponse = {need_file_contents: string[]}
type NeedClarificationResponse = {need_clarification: string}
type FilesResponse = {files_to_generate: {path: string; fileContent: string}[]}

export default class World extends Command {
  static args = {}

  static description = 'Say hello world'

  static examples = [
    `<%= config.bin %> <%= command.id %>
hello world! (./src/commands/hello/world.ts)
`,
  ]

  static flags = {}

  // use inquirer to ask file contents
  askFileContents = async (paths: string[]) => {
    let contents: string[] = []
    let counter = 0

    let inquiredMessage = 'Dockerify needs the content of the following files, do you accept to provide them?'
    paths.forEach((path) => {
      inquiredMessage += `\n- ${path}`
    })

    const answers = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'accept',
        message: inquiredMessage,
      },
    ])
    if (!answers.accept) {
      return ''
    }
    
    while (counter < paths.length) {
      ux.action.start('reading file content for ' + paths[counter] + '...')
      // ux.action.status = 'Process still in progress'
      // const answers = await inquirer.prompt([
      //   {
      //     type: 'input',
      //     name: 'content',
      //     message: `Please input the content of ${paths[counter]}`,
      //   },
      // ])
      const fakePromise = new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, 2000)
      })
      await fakePromise
      const fileContent = fs.readFileSync(path.join(process.cwd(), paths[counter]), 'utf8')
      contents.push(fileContent)
      ux.action.stop()
      counter++
    }
    return contents.map((content, index) => `Here is the content of ${paths[index]}: \n\n ${content}    `).join('\n')
  }

  parseResponse = async (data: NeedFileContentResponse | NeedClarificationResponse | FilesResponse): Promise<any> => {
    if ('need_file_contents' in data) {
      const newData = await this.askFileContents(data.need_file_contents)
      if (newData) {
        const result = await api.postMessage(newData)
        return (await this.parseResponse(result)) as any
      }
      return ''
    }
    // if ('need_clarification' in data) {
    //   return data.need_clarification
    // }
    if ('files_to_generate' in data) {
      data.files_to_generate.forEach((file) => {
        fs.writeFileSync(path.join(process.cwd(), file.path), file.fileContent, 'utf8')
      })
      return ''
    }
  }

  async run(): Promise<void> {
    await api
      .postMessage('package.json')
      .then(this.parseResponse)
      .catch((err) => {
        console.error(err)
      })
    this.log('hello world! (./src/commands/hello/world.ts)')
  }
}
