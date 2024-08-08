import jsonic from 'jsonic'
import {OpenAI} from 'openai'
import {TextContentBlock} from 'openai/resources/beta/threads/messages.mjs'
import ora from 'ora'
import appConfig from '../../appConfig.js'
import {IAI} from '../ai.js'

export default class AppOpenAi implements IAI {
  currentThread = ''

  _openai!: OpenAI

  get openai() {
    if (!this._openai) {
      this._openai = new OpenAI({
        apiKey: appConfig.get('apiKey'),
      })
    }

    return this._openai
  }

  async talkToAssistant(userMessage: string, assistantId: string) {
    const spinner = ora('Awaiting a response from AI').start()
    try {
      if (!this.currentThread) {
        const openaiThread = await this.openai.beta.threads.create()
        this.currentThread = openaiThread.id
      }

      const openaiMessage = await this.openai.beta.threads.messages.create(this.currentThread, {
        content: userMessage,
        role: 'user',
      })

      const run = await this.openai.beta.threads.runs.createAndPoll(this.currentThread, {
        assistant_id: assistantId,
      })

      if (run.status === 'completed') {
        const messages = await this.openai.beta.threads.messages.list(run.thread_id)
        const res = (messages.data[0].content[0] as TextContentBlock).text.value
        return jsonic(res)
      }

      console.log(run.status)
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      spinner.stop()
    }
  }
}
