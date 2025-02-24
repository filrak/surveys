import { useCurrentUser, useFirestore } from 'vuefire'
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore'

export const useCollectionInit = () => {
  const user = useCurrentUser()
  const db = useFirestore()

  const initializeCollections = async () => {
    if (!user.value) {
      throw new Error('User must be authenticated')
    }

    try {
      // Initialize surveys collection with example survey
      const surveysRef = collection(db, 'surveys')
      await setDoc(doc(surveysRef, 'exampleDoc'), {
        userId: user.value.uid,
        name: 'Example Survey',
        questions: [
          {
            text: 'What is your favorite color?',
            type: 'text'
          },
          {
            text: 'How satisfied are you with our service?',
            type: 'rating',
            scale: 5
          }
        ],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })

      return { success: true, message: 'Collections initialized successfully' }
    } catch (error: any) {
      console.error('Failed to initialize collections:', error)
      throw new Error(error.message || 'Failed to initialize collections')
    }
  }

  return {
    initializeCollections
  }
}
