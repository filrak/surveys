interface Answer {
  id: string
  surveyId: string
  answers: {
    question: string
    answer: string
  }[]
  createdAt: string
  updatedAt: string
}

export const useAnswer = () => {
  const saveAnswer = (surveyId: string, answers: { question: string; answer: string }[]): Answer => {
    const existingAnswers: Answer[] = JSON.parse(localStorage.getItem('answers') || '[]')
    
    // Check if we already have answers for this survey
    const existingAnswerIndex = existingAnswers.findIndex(a => a.surveyId === surveyId)
    const now = new Date().toISOString()
    
    const answer: Answer = {
      id: existingAnswerIndex >= 0 ? existingAnswers[existingAnswerIndex].id : crypto.randomUUID(),
      surveyId,
      answers,
      createdAt: existingAnswerIndex >= 0 ? existingAnswers[existingAnswerIndex].createdAt : now,
      updatedAt: now
    }

    if (existingAnswerIndex >= 0) {
      existingAnswers[existingAnswerIndex] = answer
    } else {
      existingAnswers.push(answer)
    }

    localStorage.setItem('answers', JSON.stringify(existingAnswers))
    return answer
  }

  const getAnswer = (surveyId: string): Answer | null => {
    const answers: Answer[] = JSON.parse(localStorage.getItem('answers') || '[]')
    return answers.find(answer => answer.surveyId === surveyId) || null
  }

  const getAllAnswers = (): Answer[] => {
    return JSON.parse(localStorage.getItem('answers') || '[]')
  }

  return {
    saveAnswer,
    getAnswer,
    getAllAnswers
  }
}
