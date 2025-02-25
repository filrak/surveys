import { useFirestore } from 'vuefire'
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, where, serverTimestamp } from "firebase/firestore"
import type { Answer } from '~/composables/types'
import { getCollections, mapDocuments } from './utils'

export const useAnswerService = () => {
  const db = useFirestore()
  const { responses } = getCollections(db)

  const getAnswers = async (surveyId: string) => {
    const q = query(responses, where('surveyId', '==', surveyId))
    const snapshot = await getDocs(q)
    return mapDocuments<Answer>(snapshot)
  }

  const saveAnswer = async (surveyId: string, userId: string, answer: Omit<Answer, 'id' | 'createdAt'>) => {
    const answerData = {
      ...answer,
      surveyId,
      userId,
      createdAt: serverTimestamp()
    }
    
    const docRef = await addDoc(responses, answerData)
    return {
      id: docRef.id,
      ...answerData,
      createdAt: new Date().toISOString()
    }
  }

  const updateAnswer = async (answerId: string, userId: string, data: Partial<Answer>) => {
    const docRef = doc(responses, answerId)
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    })
  }

  const deleteAnswer = async (answerId: string) => {
    await deleteDoc(doc(responses, answerId))
  }

  return {
    getAnswers,
    saveAnswer,
    updateAnswer,
    deleteAnswer
  }
}
