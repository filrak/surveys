import { ref, toRaw } from 'vue'
import { useCurrentUser } from 'vuefire'
import { useAnswerService } from '~/services/answerService'
import type { Answer } from './types'

export const useAnswer = () => {
  const currentUser = useCurrentUser()
  const answerService = useAnswerService()
  const currentAnswer = ref<Answer | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const getAnswers = async (surveyId: string) => {
    return await answerService.getAnswers(surveyId)
  }

  const saveAnswer = async (surveyId: string, answer: Omit<Answer, 'id' | 'createdAt'>) => {
    if (!currentUser.value?.uid) {
      throw new Error('User must be logged in to save answers')
    }

    currentAnswer.value = await answerService.saveAnswer(surveyId, currentUser.value.uid, answer)
    return currentAnswer.value
  }

  const updateAnswer = async (answerId: string, data: Partial<Answer>) => {
    if (!currentUser.value?.uid) {
      throw new Error('User must be logged in to update answers')
    }

    await answerService.updateAnswer(answerId, currentUser.value.uid, data)
    if (currentAnswer.value?.id === answerId) {
      currentAnswer.value = {
        ...currentAnswer.value,
        ...data
      }
    }
  }

  const deleteAnswer = async (answerId: string) => {
    if (!currentUser.value?.uid) {
      throw new Error('User must be logged in to delete answers')
    }

    await answerService.deleteAnswer(answerId)
    if (currentAnswer.value?.id === answerId) {
      currentAnswer.value = null
    }
  }

  const askQuestionAboutAnswers = async (question: string, answers: Answer[]) => {
    loading.value = true
    error.value = null
    
    // Unwrap reactive proxies
    const rawAnswers = toRaw(answers)
    const rawQuestion = toRaw(question)
    
    try {
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answers: rawAnswers,
          question: rawQuestion
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to analyze answers')
      }

      const result = await response.json()
      return result.answer
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  return {
    currentAnswer,
    loading,
    error,
    getAnswers,
    saveAnswer,
    updateAnswer,
    deleteAnswer,
    askQuestionAboutAnswers
  }
}
