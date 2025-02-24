import { ref } from 'vue'
import { useCurrentUser } from 'vuefire'
import { useFirestoreDB } from './useFirestore'

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
  const { getSurvey: getFirestoreSurvey, listSurveys: listFirestoreSurveys, setSurvey: setFirestoreSurvey, deleteSurvey: deleteFirestoreSurvey } = useFirestoreDB()

  const getSurvey = async (id: string): Promise<Survey | null> => {
    if (!user.value?.uid) return null
    return getFirestoreSurvey(id, user.value.uid)
  }

  const listSurveys = async (): Promise<Survey[]> => {
    if (!user.value?.uid) return []
    return listFirestoreSurveys(user.value.uid)
  }

  const setSurvey = async (survey: Omit<Survey, 'id' | 'createdAt' | 'userId'>, id?: string): Promise<Survey> => {
    if (!user.value?.uid) {
      throw new Error('User must be logged in to create or update surveys')
    }
    
    return setFirestoreSurvey(survey, user.value.uid, id)
  }

  const deleteSurvey = async (id: string): Promise<void> => {
    if (!user.value?.uid) {
      throw new Error('User must be logged in to delete surveys')
    }

    return deleteFirestoreSurvey(id, user.value.uid)
  }

  return {
    getSurvey,
    listSurveys,
    setSurvey,
    deleteSurvey
  }
}
