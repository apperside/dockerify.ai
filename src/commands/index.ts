import {Command, Flags} from '@oclif/core'
import {ux} from '@oclif/core/ux'
import * as fs from 'fs'
import inquirer from 'inquirer'
import * as path from 'path'
import api from '../api.js'
import appConfig from '../appConfig.js'

type NeedFileContentResponse = {need_file_contents: string[]}
type NeedClarificationResponse = {need_clarification: string}
type FilesResponse = {
  type_of_project: string
  type_of_project_reason: string
  files_to_generate: {path: string; fileContent: string}[]
}

export default class MainCommand extends Command {
  static args = {}

  static description = 'Generates a working docker configuration'

  static examples = []

  static flags = {
    openAiApiKey: Flags.string({description: 'OpenAI API key', required: false}),
    clean: Flags.boolean({description: 'Clean the project', char: 'c', required: false}),
    path: Flags.directory({
      description: 'The root path of the project you want to generate the docker configuration for',
      char: 'P',
    }),
  }

  /**
   * Ask confirmation to the user to send the content of some files
   */
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
      const fakePromise = new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, 2000)
      })
      await fakePromise
      const fileContent = fs.readFileSync(path.join(this.getRootPath(), paths[counter]), 'utf8')
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
        return this.parseResponse(result)
      }
      return ''
    }
    if ('need_clarification' in data) {
      const inquirerMessage = `Dockerify needs clarification on the following: \n\n ${data.need_clarification}`
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'clarification',
          message: inquirerMessage,
        },
      ])
      const result = await api.postMessage(answers.clarification)
      return this.parseResponse(result)
    }
    if ('files_to_generate' in data) {
      this.log(`Detected project type: ${data.type_of_project} because ${data.type_of_project_reason}`)
      this.log(``)
      this.log(``)
      // ask if want to share additional info
      const inquirerMessage =
        'Do you want to share additional information about your project?\nFor example: I need postgres, redis or whatever'

      const answers = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'accept',
          message: inquirerMessage,
        },
      ])
      if (answers.accept) {
        const inquirerMessage = 'Please provide additional information about your project'
        const answers = await inquirer.prompt([
          {
            type: 'input',
            name: 'additional_info',
            message: inquirerMessage,
          },
        ])
        const result = await api.postMessage(answers.additional_info)
        return this.parseResponse(result)
      }

      const inquirerCOnfirm = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'accept',
          message: 'Do you want to generate docker files for this kind of project?',
        },
      ])
      if (!inquirerCOnfirm.accept) {
        const askKindOfProject = await inquirer.prompt([
          {
            type: 'input',
            name: 'kind_of_project',
            message: 'What kind of project is this?',
          },
        ])

        const result = await api.postMessage(askKindOfProject.kind_of_project)
        return this.parseResponse(result)
      }
      data.files_to_generate.forEach((file) => {
        try {
          ux.action.start('generating file ' + file.path + '...')
          fs.writeFileSync(path.join(this.getRootPath(), file.path), file.fileContent, 'utf8')
          ux.action.stop()
        } catch (err) {
          console.error('error generating file ' + file.path, err)
        }
      })
      return 'your project has been dockerified! 🐳🎉'
    }
  }

  getRootPath = () => {
    return appConfig.get('path') || process.cwd()
  }

  getFilesAtRoot = async () => {
    const path = appConfig.get('path') || this.getRootPath()
    const files = fs.readdirSync(path)
    return files
  }

  async run(): Promise<void> {
    const {flags} = await this.parse(MainCommand)

    /**
     * handle -c flag to clean saved preerences
     */
    if (flags.clean) {
      this.log('cleaning the project...')
      appConfig.clear()
    }

    appConfig.set('path', flags.path || process.cwd())
    /**
     * handle openai api key retrieving:
     * - first check if it is passed with --openaiApiKey,
     * in such case use it and save in preferences
     * - if it isn't passed as param, check local saved config
     * - if it not present ask it with inquirer
     */
    let openAiApiKey = flags.openAiApiKey
    if (!openAiApiKey) {
      openAiApiKey = appConfig.get('apiKey')
      if (!openAiApiKey) {
        const answers = await inquirer.prompt([
          {
            type: 'input',
            name: 'apiKey',
            message: 'Please enter your API key',
          },
        ])
        openAiApiKey = answers.apiKey
        if (openAiApiKey) {
          appConfig.set('apiKey', openAiApiKey)
        }
      }
    } else {
      appConfig.set('apiKey', openAiApiKey)
    }

    if (!openAiApiKey) {
      this.error('No API key provided')
    }

    /**
     * prepare to read the files at the path where the cli is passed
     */
    const filesAtRoot = (await this.getFilesAtRoot()).map((file) => `- ${file}`).join('\n')
    const inquirerMessage =
      'Dockerify will now send the list of files (NOT THEIR CONTENT) at the root of your project to the API. Do you accept to send this information?'
    const answers = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'accept',
        message: inquirerMessage,
      },
    ])
    if (!answers.accept) {
      return
    }
    await api
      .postMessage(filesAtRoot)
      .then(this.parseResponse)
      .catch((err) => {
        console.error(err)
      })
    this.log('your project has been dockerified! 🐳🎉')
  }
}
