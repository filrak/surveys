import { useFirestore } from 'vuefire'
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { getDocumentById } from './utils'

export interface Template {
  id: string
  name: string
  description: string
  features: string[]
  icon: string
  color: string
  type: string
  questions?: Array<{
    text: string
    expectedAnswer: string
    unwantedAnswer?: string
  }>
  ownerId?: string | null
  createdAt: string
  updatedAt: string
  createdBy?: string
}

export const useTemplateService = () => {
  const db = useFirestore()
  const templatesCollection = collection(db, 'templates')

  const getTemplate = async (id: string): Promise<Template | null> => {
    return getDocumentById<Template>(db, 'templates', id)
  }

  const listTemplates = async (): Promise<Template[]> => {
    try {
      console.log('Querying all templates')
      
      // Get all templates
      const templatesSnapshot = await getDocs(templatesCollection)
      const templates = templatesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        ownerId: doc.data().ownerId || null // Set null if ownerId is not present
      }))

      console.log('All templates:', templates)
      return templates as Template[]
    } catch (error) {
      console.error('Error fetching templates:', error)
      throw error
    }
  }

  const setTemplate = async (
    template: Omit<Template, 'id' | 'createdAt' | 'createdBy' | 'updatedAt'>,
    userId: string,
    id?: string
  ): Promise<Template> => {
    const templateId = id || crypto.randomUUID()
    
    const templateData = {
      id: templateId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: userId,
      ...template
    }

    if (id) {
      // Update existing template
      const docRef = doc(templatesCollection, id)
      await updateDoc(docRef, {
        ...templateData,
        createdAt: undefined // Don't update creation date
      })
    } else {
      // Create new template
      await addDoc(templatesCollection, templateData)
    }

    return templateData
  }

  const deleteTemplate = async (id: string, userId: string): Promise<void> => {
    const template = await getTemplate(id)
    
    if (!template) {
      throw new Error('Template not found')
    }

    if (template.ownerId !== userId) {
      throw new Error('Cannot delete template: insufficient permissions')
    }

    const docRef = doc(templatesCollection, id)
    await deleteDoc(docRef)
  }

  return {
    getTemplate,
    listTemplates,
    setTemplate,
    deleteTemplate
  }
}
