import { useFirestore } from 'vuefire'
import { doc, getDocs, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore'
import type { Survey } from '../composables/types'
import { 
  getCollections, 
  getDocumentById, 
  buildUserQuery, 
  mapDocuments,
  verifyOwnership 
} from './utils'

export const useSurveyService = () => {
  const db = useFirestore()
  const { surveys } = getCollections(db)

  const getSurvey = async (id: string, userId: string): Promise<Survey | null> => {
    const survey = await getDocumentById<Survey>(db, 'surveys', id)
    return survey?.userId === userId ? survey : null
  }

  const listSurveys = async (userId: string): Promise<Survey[]> => {
    const q = buildUserQuery(surveys, userId)
    const snapshot = await getDocs(q)
    return mapDocuments<Survey>(snapshot)
  }

  const setSurvey = async (
    survey: Omit<Survey, 'id' | 'createdAt' | 'userId'>, 
    userId: string, 
    id?: string
  ): Promise<Survey> => {
    const surveyId = id || crypto.randomUUID()
    
    const surveyData = {
      id: surveyId,
      userId,
      createdAt: id ? undefined : serverTimestamp(),
      ...survey,
      updatedAt: serverTimestamp()
    }

    await setDoc(doc(surveys, surveyId), surveyData)
    return { 
      ...surveyData, 
      createdAt: surveyData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  }

  const deleteSurvey = async (id: string, userId: string): Promise<void> => {
    // First verify the user owns this survey
    if (!await verifyOwnership(db, id, userId)) {
      throw new Error('Survey not found or you do not have permission to delete it')
    }
    
    await deleteDoc(doc(surveys, id))
  }

  return {
    getSurvey,
    listSurveys,
    setSurvey,
    deleteSurvey
  }
}
