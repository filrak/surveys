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
          content: 'You are a helpful assistant that summarizes survey conversations. Analyze the conversation and return a JSON response with two fields: "summary" (a concise summary of key points from the conversation, focusing on user answers) and "sentiment" (either "positive", "negative", or "neutral" based on the overall tone and content of responses).'
        },
        {
          role: 'user',
          content: `Please summarize this survey conversation:\n${conversation.map(msg => `${msg.type.toUpperCase()}: ${msg.content}`).join('\n')}`
        }
      ],
      model: 'gpt-4o-mini',
      response_format: { type: 'json_object' },
      temperature: 0.7,
    })

    return {
      ...JSON.parse(completion.choices[0].message.content)
    }
  } catch (error) {
    console.error('Error generating summary:', error)
    throw createError({
      statusCode: 500,
      message: error instanceof Error ? error.message : String(error)
    })
  }
})
