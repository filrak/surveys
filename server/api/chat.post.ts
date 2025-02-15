import { OpenAI } from 'openai'
import { defineEventHandler, readBody } from 'h3'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { messages, surveyContext } = body

    // Combine survey context with the messages
    const conversationMessages = [
      {
        role: 'system',
        content: `You are conducting a survey. ${surveyContext}
        
        Important instructions:
        1. After each user response, evaluate if it's satisfactory.
        2. If the answer is satisfactory, end your response with "QUESTION ANSWERED"
        3. If the answer is not satisfactory or needs more details, ask a relevant follow-up question
        4. Be conversational and friendly, but focused on getting quality answers
        5. Never thank for completing the survey unless explicitly told to do so
        `
      },
      ...messages
    ]

    const completion = await openai.chat.completions.create({
      messages: conversationMessages,
      model: 'gpt-4o-mini',
      temperature: 0.7,
    })

    const response = completion.choices[0].message
    const isAnswerComplete = response.content.includes('QUESTION ANSWERED')

    return {
      message: response,
      success: true,
      isAnswerComplete
    }
  } catch (error: any) {
    console.error('OpenAI API Error:', error)
    return {
      error: error.message || 'Failed to process the request',
      success: false
    }
  }
})
