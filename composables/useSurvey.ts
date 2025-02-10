import { ref } from 'vue'

interface Question {
  text: string
  expectedAnswer: string
  unwantedAnswer: string
}

interface Survey {
  id: string
  name: string
  questions: Question[]
  createdAt: string
  updatedAt?: string
}

export const useSurvey = () => {
  const getSurvey = (id: string): Survey | null => {
    const surveys = JSON.parse(localStorage.getItem('surveys') || '[]')
    return surveys.find((survey: Survey) => survey.id === id) || null
  }

  const listSurveys = (): Survey[] => {
    return JSON.parse(localStorage.getItem('surveys') || '[]')
  }

  const setSurvey = (survey: Omit<Survey, 'id' | 'createdAt'>, id?: string): Survey => {
    const surveys = JSON.parse(localStorage.getItem('surveys') || '[]')
    
    if (id) {
      // Update existing survey
      const index = surveys.findIndex((s: Survey) => s.id === id)
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
      createdAt: new Date().toISOString()
    }
    
    surveys.push(newSurvey)
    localStorage.setItem('surveys', JSON.stringify(surveys))
    
    return newSurvey
  }

  return {
    getSurvey,
    setSurvey,
    listSurveys
  }
}
