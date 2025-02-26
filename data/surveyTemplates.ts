export interface SurveyTemplate {
  id: string
  title: string
  description: string
  category: string
  features: string[]
  questions: {
    text: string
    expectedAnswer: string
    unwantedAnswer: string
  }[]
}

export const surveyTemplates: SurveyTemplate[] = [
  {
    id: 'product-feedback',
    title: 'Product Feedback',
    description: 'Gather actionable insights about your product from users',
    category: 'Product',
    features: [
      'Core value assessment',
      'Pain points identification',
      'Feature prioritization',
      'User behavior insights'
    ],
    questions: [
      {
        text: 'What specific task or goal does our product help you accomplish most effectively? Describe a recent example.',
        expectedAnswer: 'Detailed description of a specific use case with context about why it was valuable and how it helped achieve their goal',
        unwantedAnswer: 'Generic statements like "it helps with productivity" without specific examples'
      },
      {
        text: 'Which feature do you find yourself using most frequently? What makes it particularly valuable to your workflow?',
        expectedAnswer: 'Named feature with explanation of its practical benefits and how it fits into their workflow',
        unwantedAnswer: 'Just naming features without explaining their value or impact'
      },
      {
        text: 'Describe a recent situation where our product fell short or frustrated you. What were you trying to achieve?',
        expectedAnswer: 'Specific scenario with context about what they were doing, what went wrong, and what impact it had',
        unwantedAnswer: 'Vague complaints or "everything works fine" without actual feedback'
      },
      {
        text: 'If you could enhance one aspect of the product to better suit your needs, what would it be and how would you improve it?',
        expectedAnswer: 'Concrete suggestion with clear explanation of the problem it solves and expected benefits',
        unwantedAnswer: 'Feature requests without context or explanation of the underlying need'
      }
    ]
  },
  {
    id: 'event-feedback',
    title: 'Event Feedback',
    description: 'Collect detailed insights about event experience and impact',
    category: 'Marketing',
    features: [
      'Content relevance assessment',
      'Engagement measurement',
      'Logistics evaluation',
      'Future improvements'
    ],
    questions: [
      {
        text: 'Which session or activity provided the most value to you and why? Share specific takeaways.',
        expectedAnswer: 'Named session with specific learnings, insights, or skills gained and how they plan to apply them',
        unwantedAnswer: 'Just naming a session or generic "it was good" responses'
      },
      {
        text: 'How well did the event format (timing, structure, interaction opportunities) support your learning and networking goals?',
        expectedAnswer: 'Detailed assessment of specific format elements and their impact on the experience, with examples',
        unwantedAnswer: 'Simple "yes/no" or ratings without explanation'
      },
      {
        text: 'Describe any moments where you felt particularly engaged or disconnected. What contributed to these experiences?',
        expectedAnswer: 'Specific moments with context about what made them engaging or disengaging, including environmental factors',
        unwantedAnswer: 'General statements about engagement without specific examples'
      },
      {
        text: 'What one change would have significantly enhanced your event experience? Be specific about how and why.',
        expectedAnswer: 'Concrete suggestion with clear reasoning and expected impact on the experience',
        unwantedAnswer: 'Vague improvement suggestions without context or reasoning'
      }
    ]
  },
  {
    id: '360-review',
    title: '360° Performance Review',
    description: 'Comprehensive peer feedback for professional development',
    category: 'HR',

    features: [
      'Core competencies evaluation',
      'Behavioral examples',
      'Impact assessment',
      'Growth opportunities'
    ],
    questions: [
      {
        text: 'What are the most impactful contributions this person has made to the team? Provide specific examples from the past 6 months.',
        expectedAnswer: 'Concrete examples of projects, initiatives, or situations where they made a difference, including outcomes and impact on team/organization',
        unwantedAnswer: 'Generic praise or listing job responsibilities without specific examples'
      },
      {
        text: 'How does this person handle challenging situations or conflicts? Share a recent example that demonstrates their approach.',
        expectedAnswer: 'Specific situation with details about their behavior, communication style, and how they influenced the outcome',
        unwantedAnswer: 'General statements about being "good under pressure" without examples'
      },
      {
        text: 'In what ways does this person demonstrate leadership and influence, regardless of their role? Provide examples.',
        expectedAnswer: 'Specific instances of taking initiative, mentoring others, or driving positive change, with context and results',
        unwantedAnswer: 'Focusing only on formal authority or lacking specific behavioral examples'
      },
      {
        text: 'What specific behaviors or skills would make this person even more effective in their role? Share examples where these would have made a difference.',
        expectedAnswer: 'Actionable feedback with specific situations where improvement would enhance their impact, including suggested approaches',
        unwantedAnswer: 'Generic development areas like "communication" without context or examples'
      },
      {
        text: 'How effectively does this person collaborate and support others? Describe specific instances that demonstrate their impact on team dynamics.',
        expectedAnswer: 'Concrete examples of collaboration, including how they support colleagues, share knowledge, and contribute to team success',
        unwantedAnswer: 'Simple statements about being a "team player" without supporting evidence'
      }
    ]
  }
]
