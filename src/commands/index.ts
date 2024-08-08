import {Command, Flags} from '@oclif/core'
import {ux} from '@oclif/core/ux'
import fs from 'node:fs'
import inquirer from 'inquirer'
import path from 'node:path'
import api from '../api.js'
import appConfig from '../appConfig.js'

type NeedFileContentResponse = {need_file_contents: string[]}
type NeedClarificationResponse = {need_clarification: string}
type FilesResponse = {
  files_to_generate: {fileContent: string; path: string}[]
  type_of_project: string
  type_of_project_reason: string
}

export default class MainCommand extends Command {
  static args = {}

  static description = 'Generates a working docker configuration'

  static examples = []

  static flags = {
    clean: Flags.boolean({char: 'c', description: 'Clean the project', required: false}),
    openAiApiKey: Flags.string({description: 'OpenAI API key', required: false}),
    path: Flags.directory({
      char: 'P',
      description: 'The root path of the project you want to generate the docker configuration for',
    }),
  }

  /**
   * Ask confirmation to the user to send the content of some files
   */
  askFileContents = async (paths: string[]) => {
    const contents: string[] = []
    let counter = 0

    let inquiredMessage = 'Dockerify needs the content of the following files, do you accept to provide them?'
    for (const path of paths) {
      inquiredMessage += `\n- ${path}`
    }

    const answers = await inquirer.prompt([
      {
        message: inquiredMessage,
        name: 'accept',
        type: 'confirm',
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
      // eslint-disable-next-line no-await-in-loop
      await fakePromise
      const fileContent = fs.readFileSync(path.join(this.getRootPath(), paths[counter]), 'utf8')
      contents.push(fileContent)
      ux.action.stop()
      counter++
    }

    return contents.map((content, index) => `Here is the content of ${paths[index]}: \n\n ${content}   `).join('\n')
  }

  getFilesAtRoot = async () => {
    const path = appConfig.get('path') || this.getRootPath()
    const files = fs.readdirSync(path)
    return files
  }

  getRootPath = () => appConfig.get('path') || process.cwd()

  parseResponse = async (data: FilesResponse | NeedClarificationResponse | NeedFileContentResponse): Promise<any> => {
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
          message: inquirerMessage,
          name: 'clarification',
          type: 'input',
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
          message: inquirerMessage,
          name: 'accept',
          type: 'confirm',
        },
      ])
      if (answers.accept) {
        const inquirerMessage = 'Please provide additional information about your project'
        const answers = await inquirer.prompt([
          {
            message: inquirerMessage,
            name: 'additional_info',
            type: 'input',
          },
        ])
        const result = await api.postMessage(answers.additional_info)
        return this.parseResponse(result)
      }

      const inquirerCOnfirm = await inquirer.prompt([
        {
          message: 'Do you want to generate docker files for this kind of project?',
          name: 'accept',
          type: 'confirm',
        },
      ])
      if (!inquirerCOnfirm.accept) {
        const askKindOfProject = await inquirer.prompt([
          {
            message: 'What kind of project is this?',
            name: 'kind_of_project',
            type: 'input',
          },
        ])

        const result = await api.postMessage(askKindOfProject.kind_of_project)
        return this.parseResponse(result)
      }

      for (const file of data.files_to_generate) {
        try {
          ux.action.start('generating file ' + file.path + '...')
          fs.writeFileSync(path.join(this.getRootPath(), file.path), file.fileContent, 'utf8')
          ux.action.stop()
        } catch (error) {
          console.error('error generating file ' + file.path, error)
        }
      }

      return 'your project has been dockerified! 🐳🎉'
    }
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
    let {openAiApiKey} = flags
    if (openAiApiKey) {
      appConfig.set('apiKey', openAiApiKey)
    } else {
      openAiApiKey = appConfig.get('apiKey')
    }

    /**
     * prepare to read the files at the path where the cli is passed
     */
    const filesAtRoot = (await this.getFilesAtRoot()).map((file) => `- ${file}`).join('\n')
    const inquirerMessage =
      'Dockerify will now send the list of files (NOT THEIR CONTENT) at the root of your project to the API. Do you accept to send this information?'
    const answers = await inquirer.prompt([
      {
        message: inquirerMessage,
        name: 'accept',
        type: 'confirm',
      },
    ])
    if (!answers.accept) {
      return
    }

    const apiKeyAnswer = await inquirer.prompt([
      {
        message: 'Please enter your API key',
        name: 'apiKey',
        type: 'input',
      },
    ])
    openAiApiKey = apiKeyAnswer.apiKey
    if (openAiApiKey) {
      appConfig.set('apiKey', openAiApiKey)
    } else {
      this.error('No API key provided')
    }

    await api
      .postMessage(filesAtRoot)
      .then(this.parseResponse)
      .catch((error) => {
        console.error(error)
      })
    this.log('your project has been dockerified! 🐳🎉')
  }
}
