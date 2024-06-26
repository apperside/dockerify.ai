import {Command} from '@oclif/core'
import api from '../../api.js'
import * as fs from 'fs'
import * as path from 'path'
import inquirer from 'inquirer'
import {ux} from '@oclif/core/ux'

type NeedFileContentResponse = {need_file_contents: string[]}
type NeedClarificationResponse = {need_clarification: string}
type FilesResponse = {files_to_generate: {path: string; content: string}[]}

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
    while (counter < paths.length) {
      ux.action.start('Starting process')
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
  async run(): Promise<void> {
    await api
      .postMessage('package.json')
      .then(async (data) => {
        if (data.need_file_contents) {
          const fileContents = []
          console.log("ciao")
          // for (const filePath of data.need_file_contents) {
          //   const root = process.cwd()
          //   const fileContent = fs.readFileSync(path.join(process.cwd(), filePath), 'utf8')
          //   fileContents.push({path: filePath, content: fileContent})
          // }
         try {
           const result = await this.askFileContents(data.need_file_contents)
           const newData = await await api.postMessage(result)
           console.log('newData', newData)
         } catch (err) {
          console.error(err)
         }
          // return fileContents.reduce((acc, {path, content}) => {
          //   return acc + `this is the content of ${path}: \n\n ${content}    `
          // }, '')
          console.log('need_file_contents', data)
          return
        }
        if (data.need_clarification) {
          console.log('need_clarification', data)
          return
        }
        if (data.files_to_generate) {
          console.log('files_to_generate', data)
          return
        }
      })
      .catch((err) => {
        console.error(err)
      })
    this.log('hello world! (./src/commands/hello/world.ts)')
  }
}
