import { collection, doc, getDoc, getDocs, setDoc, deleteDoc, query, where, serverTimestamp } from 'firebase/firestore'
import { useFirestore, useCurrentUser } from 'vuefire'
import type { Survey } from './types'

export const useFirestoreDB = () => {
  const db = useFirestore()
  const surveysCollection = collection(db, 'surveys')

  const getSurvey = async (id: string, userId: string): Promise<Survey | null> => {
    const surveyDoc = doc(surveysCollection, id)
    const snapshot = await getDoc(surveyDoc)
    
    if (!snapshot.exists() || snapshot.data().userId !== userId) {
      return null
    }
    
    return { id: snapshot.id, ...snapshot.data() } as Survey
  }

  const listSurveys = async (userId: string): Promise<Survey[]> => {
    const q = query(surveysCollection, where('userId', '==', userId))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Survey)
  }

  const setSurvey = async (survey: Omit<Survey, 'id' | 'createdAt' | 'userId'>, userId: string, id?: string): Promise<Survey> => {
    const surveyId = id || crypto.randomUUID()
    
    const surveyData = {
      id: surveyId,
      userId,
      createdAt: id ? undefined : serverTimestamp(),
      ...survey,
      updatedAt: serverTimestamp()
    }

    await setDoc(doc(surveysCollection, surveyId), surveyData)
    return { ...surveyData, createdAt: surveyData.createdAt || new Date().toISOString() }
  }

  const deleteSurvey = async (id: string, userId: string): Promise<void> => {
    // First verify the user owns this survey
    const survey = await getSurvey(id, userId)
    if (!survey) {
      throw new Error('Survey not found or you do not have permission to delete it')
    }
    
    await deleteDoc(doc(surveysCollection, id))
  }

  return {
    getSurvey,
    listSurveys,
    setSurvey,
    deleteSurvey
  }
}
