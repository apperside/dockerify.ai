import axios from 'axios'

// const instance = axios.create({
//   baseURL: 'https://some-domain.com/api/',
//   timeout: 1000,
//   headers: {'X-Custom-Header': 'foobar'},
// })
const OPEN_AI_API_KEY = 'sk-proj-cTdBJ1mSomMv5iMQ3tCPT3BlbkFJra7ArBiqgxLVQbpoqFVQ'
import OpenAI from 'openai'
import {TextContentBlock} from 'openai/resources/beta/threads/messages.mjs'
const openai = new OpenAI({
  apiKey: OPEN_AI_API_KEY,
})
import jsonic from 'jsonic'
let currentThread = ''
async function postMessage(userMessage: string) {
  if (!currentThread) {
    const openaiThread = await openai.beta.threads.create()
    currentThread = openaiThread.id
  }

  const openaiMessage = await openai.beta.threads.messages.create(currentThread, {
    role: 'user',
    content: userMessage
  })

  let run = await openai.beta.threads.runs.createAndPoll(currentThread, {
    assistant_id: 'asst_iNJCGrGit9M0zXJIrwV8Ehcn',
    // instructions: 'package.json',
  })

  if (run.status === 'completed') {
    const messages = await openai.beta.threads.messages.list(run.thread_id)
    const res = (messages.data[0].content[0] as TextContentBlock).text.value
    return jsonic(res)
    // for (const message of messages.data.reverse()) {
    //   console.log(`${message.role} > ${(message.content[0] as any).text.value}`)
    // }
  } else {
    console.log(run.status)
  }

  //   const assistant = await openai.beta.assistants.create({
  //     name: 'Math Tutor',
  //     instructions: 'You are a personal math tutor. Write and run code to answer math questions.',
  //     tools: [{type: 'code_interpreter'}],
  //     model: 'gpt-4o',
  //   })
}

const api = {
  postMessage,
}
export default api
