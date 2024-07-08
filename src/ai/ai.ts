import AppOpenAi from './impl/openai.impl.js'

/**
 * Here we declare an interface to act like an abstraction on top
 * of any potential ai engine (openai, mistral, gemini, llama, etc...).
 * If we want to implement a new AI engine, we just need to implement
 * this interface and change the implementation in the index.ts file.
 */
export interface IAI {
  talkToAssistant: (message: string, assistantId: string) => void
}

const appAI = new AppOpenAi()

export default appAI
