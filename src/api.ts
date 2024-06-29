import jsonic from 'jsonic'
import OpenAI from 'openai'
import {TextContentBlock} from 'openai/resources/beta/threads/messages.mjs'
import ora from 'ora'

const OPEN_AI_API_KEY = 'sk-proj-RImHWofGYj7U9gmUPrx5T3BlbkFJMqDRfAW53nfYEIkYLJOy'
const openai = new OpenAI({
  apiKey: OPEN_AI_API_KEY,
})
let currentThread = ''
async function postMessage(userMessage: string) {
  const spinner = ora('Awaiting a response from AI').start()
  try {
    if (!currentThread) {
      const openaiThread = await openai.beta.threads.create()
      currentThread = openaiThread.id
    }

    const openaiMessage = await openai.beta.threads.messages.create(currentThread, {
      role: 'user',
      content: userMessage,
    })

    let run = await openai.beta.threads.runs.createAndPoll(currentThread, {
      assistant_id: 'asst_iNJCGrGit9M0zXJIrwV8Ehcn',
    })

    if (run.status === 'completed') {
      const messages = await openai.beta.threads.messages.list(run.thread_id)
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

const api = {
  postMessage,
}
export default api
