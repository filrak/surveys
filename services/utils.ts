import type { Survey, Answer } from '../composables/types'
import { collection, doc, getDoc, getDocs, query, where, Firestore } from 'firebase/firestore'
import type { Firestore as FirestoreType } from 'firebase/firestore'

// Common collection references
export const getCollections = (db: FirestoreType) => ({
  surveys: collection(db, 'surveys'),
  responses: collection(db, 'survey_responses'),
  analytics: collection(db, 'response_analytics')
})

// Common document operations
export const getDocumentById = async <T>(
  db: FirestoreType, 
  collectionName: string, 
  id: string
): Promise<T | null> => {
  const docRef = doc(collection(db, collectionName), id)
  const snapshot = await getDoc(docRef)
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } as T : null
}

// Common ownership checks
export const verifyOwnership = async (
  db: FirestoreType,
  surveyId: string,
  userId: string
): Promise<boolean> => {
  const survey = await getDocumentById<Survey>(db, 'surveys', surveyId)
  return survey?.userId === userId
}

// Common query builders
export const buildUserQuery = (collection: any, userId: string) => {
  return query(collection, where('userId', '==', userId))
}

export const buildSurveyQuery = (collection: any, surveyId: string) => {
  return query(collection, where('surveyId', '==', surveyId))
}

// Common response helpers
export const canAccessResponse = async (
  db: FirestoreType,
  response: Answer,
  userId: string
): Promise<boolean> => {
  return (
    response.userId === userId || 
    await verifyOwnership(db, response.surveyId, userId)
  )
}

// Common document mappers
export const mapDocuments = <T>(snapshot: any): T[] => {
  return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }) as T)
}
