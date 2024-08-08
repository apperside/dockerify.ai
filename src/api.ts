import ora from 'ora'
import appAI from './ai/ai.js'

async function talkToAssistant(userMessage: string) {
  const spinner = ora('Awaiting a response from AI').start()
  try {
    return await appAI.talkToAssistant(userMessage, 'asst_iNJCGrGit9M0zXJIrwV8Ehcn')
  } catch (err: any) {
    console.error(err)
    throw err
  } finally {
    spinner.stop()
  }
}

const api = {
  postMessage: talkToAssistant,
}
export default api
