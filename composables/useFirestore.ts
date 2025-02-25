import { collection, doc, getDoc, getDocs, setDoc, deleteDoc, query, where, serverTimestamp } from 'firebase/firestore'
import { useFirestore, useCurrentUser } from 'vuefire'
import type { Survey, Answer, Message } from './types'

export const useFirestoreDB = () => {
  const db = useFirestore()
  const surveysCollection = collection(db, 'surveys')
  const responsesCollection = collection(db, 'survey_responses')
  const analyticsCollection = collection(db, 'response_analytics')

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

  const getAnswer = async (surveyId: string, userId: string): Promise<Answer | null> => {
    // Query for responses where either:
    // 1. The user owns the response
    // 2. The user owns the survey
    const userResponseQ = query(responsesCollection, 
      where('surveyId', '==', surveyId),
      where('userId', '==', userId)
    )
    
    const snapshot = await getDocs(userResponseQ)
    
    if (snapshot.empty) {
      // If no response found as owner, check if user owns the survey
      const survey = await getSurvey(surveyId, userId)
      if (survey) {
        // User owns the survey, can see all responses
        const surveyResponsesQ = query(responsesCollection, where('surveyId', '==', surveyId))
        const surveyResponses = await getDocs(surveyResponsesQ)
        if (!surveyResponses.empty) {
          return { id: surveyResponses.docs[0].id, ...surveyResponses.docs[0].data() } as Answer
        }
      }
      return null
    }
    
    return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Answer
  }

  const saveAnswer = async (surveyId: string, userId: string, conversation: Message[], finished: boolean): Promise<Answer> => {
    const now = serverTimestamp()
    const answerId = crypto.randomUUID()
    
    const answerData = {
      id: answerId,
      surveyId,
      userId,
      conversation,
      finished,
      createdAt: now,
      updatedAt: now
    }
    
    await setDoc(doc(responsesCollection, answerId), answerData)

    // If the answer is finished, create analytics entry
    if (finished) {
      // Get the survey owner to check permissions
      const survey = await getSurvey(surveyId, userId)
      if (survey?.userId === userId) {
        await setDoc(doc(analyticsCollection, answerId), {
          surveyId,
          responseId: answerId,
          createdAt: now,
          // Add any other analytics data here
        })
      }
    }
    
    return { ...answerData, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
  }

  const setSummary = async (answerId: string, userId: string, summary: string): Promise<void> => {
    const answerDoc = doc(responsesCollection, answerId)
    const snapshot = await getDoc(answerDoc)
    
    if (!snapshot.exists()) {
      throw new Error('Answer not found')
    }

    const answer = snapshot.data()
    // Check if user owns either the response or the survey
    const canAccess = answer.userId === userId || 
      (await getSurvey(answer.surveyId, userId)) !== null

    if (!canAccess) {
      throw new Error('You do not have permission to update this answer')
    }
    
    await setDoc(answerDoc, { summary, updatedAt: serverTimestamp() }, { merge: true })

    // Update analytics if user owns the survey
    const survey = await getSurvey(answer.surveyId, userId)
    if (survey?.userId === userId) {
      await setDoc(doc(analyticsCollection, answerId), {
        summary,
        updatedAt: serverTimestamp()
      }, { merge: true })
    }
  }

  const listAnswers = async (userId: string, surveyId?: string): Promise<Answer[]> => {
    let q
    
    if (surveyId) {
      // If surveyId provided, check if user owns either responses or the survey
      const survey = await getSurvey(surveyId, userId)
      if (survey) {
        // User owns the survey, can see all responses
        q = query(responsesCollection, where('surveyId', '==', surveyId))
      } else {
        // User doesn't own survey, only show their responses
        q = query(responsesCollection, 
          where('surveyId', '==', surveyId),
          where('userId', '==', userId)
        )
      }
    } else {
      // No surveyId, just show user's responses
      q = query(responsesCollection, where('userId', '==', userId))
    }
    
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Answer)
  }

  return {
    getSurvey,
    listSurveys,
    setSurvey,
    deleteSurvey,
    getAnswer,
    saveAnswer,
    setSummary,
    listAnswers
  }
}
