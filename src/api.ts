import jsonic from 'jsonic'
import OpenAI from 'openai'
import {TextContentBlock} from 'openai/resources/beta/threads/messages.mjs'
import ora from 'ora'
import appConfig from './appConfig.js'
let currentThread = ''
class AppOpenAi {
  _openai!: OpenAI

  constructor() {}

  get openai() {
    if (!this._openai) {
      this._openai = new OpenAI({
        apiKey: appConfig.get('apiKey'),
      })
    }
    return this._openai
  }

  async postMessage(userMessage: string) {
    const spinner = ora('Awaiting a response from AI').start()
    try {
      if (!currentThread) {
        const openaiThread = await this.openai.beta.threads.create()
        currentThread = openaiThread.id
      }

      const openaiMessage = await this.openai.beta.threads.messages.create(currentThread, {
        role: 'user',
        content: userMessage,
      })

      let run = await this.openai.beta.threads.runs.createAndPoll(currentThread, {
        assistant_id: 'asst_iNJCGrGit9M0zXJIrwV8Ehcn',
      })

      if (run.status === 'completed') {
        const messages = await this.openai.beta.threads.messages.list(run.thread_id)
        const res = (messages.data[0].content[0] as TextContentBlock).text.value
        return jsonic(res)
      } else {
        console.log(run.status)
      }
    } catch (err) {
      console.error(err)
      throw err
    } finally {
      spinner.stop()
    }
  }
}
const ai = new AppOpenAi()
//implement openai singleton

async function postMessage(userMessage: string) {
  const spinner = ora('Awaiting a response from AI').start()
  try {
    return await ai.postMessage(userMessage)
  } catch (err) {
    console.error(err)
    throw err
  } finally {
    spinner.stop()
  }
}

const api = {
  postMessage,
}
export default api
