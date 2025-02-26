import { useFirestore } from 'vuefire'
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore'
import { surveyTemplates } from '~/data/surveyTemplates'

export const useInitializeTemplates = () => {
  const db = useFirestore()
  const templatesCollection = collection(db, 'templates')

  const initializeTemplates = async () => {
    try {
      // Check if templates already exist
      const q = query(templatesCollection, where('type', '==', 'hr'))
      const snapshot = await getDocs(q)
      
      if (snapshot.empty) {
        console.log('Initializing templates...')
        
        // Map survey templates to Firestore format
        const templates = surveyTemplates.map(template => ({
          name: template.title,
          description: template.description,
          features: template.features,
          icon: 'users', // Default icon
          color: 'purple', // Default color
          type: template.id,
          questions: template.questions,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }))

        // Add templates to Firestore
        for (const template of templates) {
          await addDoc(templatesCollection, template)
          console.log(`Added template: ${template.name}`)
        }

        console.log('Templates initialized successfully')
      } else {
        console.log('Templates already exist, skipping initialization')
      }
    } catch (error) {
      console.error('Error initializing templates:', error)
    }
  }

  return {
    initializeTemplates
  }
}
