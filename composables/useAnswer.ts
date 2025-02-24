interface Message {
  type: 'user' | 'bot'
  content: string
}

export interface Answer {
  id: string
  surveyId: string
  conversation: Message[]
  finished: boolean
  summary?: string
  createdAt: string
  updatedAt: string
}       

export const useAnswer = () => {
  const saveAnswer = (surveyId: string, conversation: Message[], finished: boolean) => {
    const now = new Date().toISOString()
    const existingAnswers = JSON.parse(localStorage.getItem('answers') || '[]') as Answer[]
    
    // Try to find existing answer for this survey
    const existingAnswerIndex = existingAnswers.findIndex(a => a.surveyId === surveyId)
    
    if (existingAnswerIndex !== -1) {
      // Update existing answer
      existingAnswers[existingAnswerIndex] = {
        ...existingAnswers[existingAnswerIndex],
        conversation,
        finished,
        updatedAt: now
      }
    } else {
      // Create new answer only if one doesn't exist
      const answer: Answer = {
        id: crypto.randomUUID(),
        surveyId,
        conversation,
        finished,
        createdAt: now,
        updatedAt: now
      }
      existingAnswers.push(answer)
    }
    
    // If answer is finished, generate summary
    if (finished) {
      const answer = existingAnswers[existingAnswerIndex]
      if (answer) {
        generateSummary(answer.id, conversation)
      }
    }

    // Save all answers
    localStorage.setItem('answers', JSON.stringify(existingAnswers))

    return existingAnswers[existingAnswerIndex] || existingAnswers[existingAnswers.length - 1]
  }

  const generateSummary = async (answerId: string, conversation: Message[]) => {
    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ conversation }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate summary')
      }

      const { summary } = await response.json()

      // Update answer with summary
      const existingAnswers = JSON.parse(localStorage.getItem('answers') || '[]') as Answer[]
      const answerIndex = existingAnswers.findIndex(a => a.id === answerId)
      
      if (answerIndex !== -1) {
        existingAnswers[answerIndex].summary = summary
        localStorage.setItem('answers', JSON.stringify(existingAnswers))
      }
    } catch (error) {
      console.error('Failed to generate summary:', error)
    }
  }

  const getAnswer = (answerId: string): Answer | null => {
    const answers = JSON.parse(localStorage.getItem('answers') || '[]') as Answer[]
    return answers.find(a => a.id === answerId) || null
  }

  const getAnswers = (surveyId: string): Answer[] => {
    const answers = JSON.parse(localStorage.getItem('answers') || '[]') as Answer[]
    return answers.filter(a => a.surveyId === surveyId)
  }

  const prepareAnswers = (conversation: Message[]): { [key: string]: string } => {
    const answers: { [key: string]: string } = {}
    let currentQuestion = ''

    conversation.forEach(message => {
      if (message.type === 'bot' && !message.content.includes('QUESTION ANSWERED')) {
        currentQuestion = message.content
      } else if (message.type === 'user') {
        answers[currentQuestion] = message.content
      }
    })

    return answers
  }

  return {
    saveAnswer,
    getAnswer,
    getAnswers,
    prepareAnswers
  }
}
