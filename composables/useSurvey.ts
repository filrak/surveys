import { ref } from 'vue'
import { useCurrentUser } from 'vuefire'
import { useSurveyService } from '../services/surveyService'

interface Question {
  text: string
  expectedAnswer: string
  unwantedAnswer: string
}

interface Survey {
  id: string
  userId: string
  name: string
  questions: Question[]
  createdAt: string
  updatedAt?: string
}

export const useSurvey = () => {
  const user = useCurrentUser()
  const surveyService = useSurveyService()

  const getSurvey = async (id: string): Promise<Survey | null> => {
    if (!user.value?.uid) return null
    return surveyService.getSurvey(id, user.value.uid)
  }

  const listSurveys = async (): Promise<Survey[]> => {
    if (!user.value?.uid) return []
    return surveyService.listSurveys(user.value.uid)
  }

  const setSurvey = async (survey: Omit<Survey, 'id' | 'createdAt' | 'userId'>, id?: string): Promise<Survey> => {
    if (!user.value?.uid) {
      throw new Error('User must be logged in to create or update surveys')
    }
    
    return surveyService.setSurvey(survey, user.value.uid, id)
  }

  const deleteSurvey = async (id: string): Promise<void> => {
    if (!user.value?.uid) {
      throw new Error('User must be logged in to delete surveys')
    }

    return surveyService.deleteSurvey(id, user.value.uid)
  }

  return {
    getSurvey,
    listSurveys,
    setSurvey,
    deleteSurvey
  }
}
