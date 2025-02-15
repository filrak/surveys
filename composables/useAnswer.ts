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
    
    const answer: Answer = {
      id: crypto.randomUUID(),
      surveyId,
      conversation,
      finished,
      createdAt: now,
      updatedAt: now
    }

    // Add new answer to the list
    existingAnswers.push(answer)
    
    // If answer is finished, generate summary
    if (finished) {
      generateSummary(answer.id, conversation)
    }

    // Save all answers
    localStorage.setItem('answers', JSON.stringify(existingAnswers))

    return answer
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
        console.error('Failed to generate summary')
        return
      }

      const { summary } = await response.json()
      
      // Update the specific answer with the summary
      const existingAnswers = JSON.parse(localStorage.getItem('answers') || '[]') as Answer[]
      const answerIndex = existingAnswers.findIndex(a => a.id === answerId)
      
      if (answerIndex !== -1) {
        existingAnswers[answerIndex].summary = summary
        localStorage.setItem('answers', JSON.stringify(existingAnswers))
      }
    } catch (error) {
      console.error('Error generating summary:', error)
    }
  }

  const getAnswers = (surveyId: string): Answer[] => {
    const answers = JSON.parse(localStorage.getItem('answers') || '[]') as Answer[]
    return answers.filter(answer => answer.surveyId === surveyId)
  }

  const getAnswer = (answerId: string): Answer | undefined => {
    const answers = JSON.parse(localStorage.getItem('answers') || '[]') as Answer[]
    return answers.find(answer => answer.id === answerId)
  }

  return {
    saveAnswer,
    getAnswers,
    getAnswer
  }
}
