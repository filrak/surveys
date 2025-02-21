import { ref } from 'vue'
import { useCurrentUser } from 'vuefire'

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

  const getSurvey = (id: string): Survey | null => {
    const surveys = JSON.parse(localStorage.getItem('surveys') || '[]')
    return surveys.find((survey: Survey) => survey.id === id && survey.userId === user.value?.uid) || null
  }

  const listSurveys = (): Survey[] => {
    const surveys = JSON.parse(localStorage.getItem('surveys') || '[]')
    return surveys.filter((survey: Survey) => survey.userId === user.value?.uid)
  }

  const setSurvey = (survey: Omit<Survey, 'id' | 'createdAt' | 'userId'>, id?: string): Survey => {
    const surveys = JSON.parse(localStorage.getItem('surveys') || '[]')
    
    if (!user.value?.uid) {
      throw new Error('User must be logged in to create or update surveys')
    }
    
    if (id) {
      // Update existing survey
      const index = surveys.findIndex((s: Survey) => s.id === id && s.userId === user.value?.uid)
      if (index !== -1) {
        const updatedSurvey = {
          ...surveys[index],
          ...survey,
          updatedAt: new Date().toISOString()
        }
        surveys[index] = updatedSurvey
        localStorage.setItem('surveys', JSON.stringify(surveys))
        return updatedSurvey
      }
    }
    
    // Create new survey
    const newSurvey = {
      ...survey,
      id: id || Date.now().toString(),
      userId: user.value.uid,
      createdAt: new Date().toISOString()
    }
    
    surveys.push(newSurvey)
    localStorage.setItem('surveys', JSON.stringify(surveys))
    
    return newSurvey
  }

  const deleteSurvey = (id: string): void => {
    if (!user.value?.uid) {
      throw new Error('User must be logged in to delete surveys')
    }

    const surveys = JSON.parse(localStorage.getItem('surveys') || '[]')
    const index = surveys.findIndex((s: Survey) => s.id === id && s.userId === user.value?.uid)
    
    if (index === -1) {
      throw new Error('Survey not found or you do not have permission to delete it')
    }

    surveys.splice(index, 1)
    localStorage.setItem('surveys', JSON.stringify(surveys))
  }

  return {
    getSurvey,
    listSurveys,
    setSurvey,
    deleteSurvey
  }
}
