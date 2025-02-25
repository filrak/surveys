import { defineEventHandler, readBody } from 'h3'
import OpenAI from 'openai'

const openai = new OpenAI()

export default defineEventHandler(async (event) => {
  try {
    const { answers, question } = await readBody(event)

    // Format all conversations into a structured context
    const context = answers.map((answer, index) => {
      if (!answer.messages) return `Survey Response #${index + 1}: No messages data`
      
      const conversation = answer.messages
        .map(msg => `${msg.type}: ${msg.content}`)
        .join('\n')
      
      return `Survey Response #${index + 1}:\n${conversation}`
    }).join('\n\n---\n\n')

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant analyzing multiple survey responses. Provide clear, concise insights and patterns from the survey data. Answer the question as well as you can.'
        },
        {
          role: 'user',
          content: `For this question: ${question}\n\nProvide insighst and data analyzing all responses. Here are all the survey responses:\n\n${context}\n\n`
        }
      ],
      model: 'gpt-4o-mini',
    })

    return {
      answer: completion.choices[0].message.content
    }
  } catch (error: any) {
    console.error('Error in ask endpoint:', error)
    throw createError({
      statusCode: 500,
      message: error.message
    })
  }
})
