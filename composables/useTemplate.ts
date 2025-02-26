import { useCurrentUser } from 'vuefire'
import { useTemplateService, Template } from '~/services/templateService'

export const useTemplate = () => {
  const user = useCurrentUser()
  const templateService = useTemplateService()

  const getTemplate = async (id: string): Promise<Template | null> => {
    return templateService.getTemplate(id)
  }

  const listTemplates = async (userId?: string): Promise<Template[]> => {
    if (!userId && !user.value?.uid) return []
    return templateService.listTemplates(userId || user.value!.uid)
  }

  const setTemplate = async (
    template: Omit<Template, 'id' | 'createdAt' | 'createdBy' | 'updatedAt'>,
    id?: string
  ): Promise<Template> => {
    if (!user.value?.uid) {
      throw new Error('User must be logged in to create or update templates')
    }
    
    return templateService.setTemplate(template, user.value.uid, id)
  }

  const deleteTemplate = async (id: string): Promise<void> => {
    if (!user.value?.uid) {
      throw new Error('User must be logged in to delete templates')
    }

    return templateService.deleteTemplate(id, user.value.uid)
  }

  return {
    getTemplate,
    listTemplates,
    setTemplate,
    deleteTemplate
  }
}
