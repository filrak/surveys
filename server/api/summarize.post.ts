import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export default defineEventHandler(async (event) => {
  const { conversation } = await readBody(event)

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that summarizes survey conversations. Create a concise summary of the key points from the conversation, focusing on the answers provided by the user.'
        },
        {
          role: 'user',
          content: `Please summarize this survey conversation:\n${conversation.map(msg => `${msg.type.toUpperCase()}: ${msg.content}`).join('\n')}`
        }
      ],
      model: 'gpt-4',
      temperature: 0.7,
    })

    return {
      summary: completion.choices[0].message.content
    }
  } catch (error) {
    console.error('Error generating summary:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to generate summary'
    })
  }
})
