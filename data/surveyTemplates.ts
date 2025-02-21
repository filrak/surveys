
export const surveyTemplates = [
  {
    id: 'product-feedback',
    title: 'Product Experience Feedback',
    description: 'Get actionable insights about your product\'s strengths and areas for improvement',
    questions: [
      {
        text: 'What specific feature or aspect of our product provides the most value to you and why?',
        expectedAnswer: 'Detailed explanation of a specific feature and its practical benefits',
        unwantedAnswer: 'Generic praise without specific examples'
      },
      {
        text: 'Describe a recent task where our product fell short. What would have made it better?',
        expectedAnswer: 'Specific scenario with clear improvement suggestions',
        unwantedAnswer: 'Vague complaints or "everything is fine"'
      },
      {
        text: 'If you could add one feature to make your workflow more efficient, what would it be and how would you use it?',
        expectedAnswer: 'Concrete feature request with use case explanation',
        unwantedAnswer: 'Feature requests without context or use cases'
      }
    ]
  },
  {
    id: 'team-performance',
    title: 'Team Performance Review',
    description: 'Gather constructive feedback about team effectiveness and collaboration',
    questions: [
      {
        text: 'What specific actions has the team taken that positively impacted project outcomes?',
        expectedAnswer: 'Concrete examples of successful initiatives or behaviors',
        unwantedAnswer: 'General statements without specific examples'
      },
      {
        text: 'Describe a recent challenge where team communication could have been better. How should it have been handled?',
        expectedAnswer: 'Specific situation with actionable improvement suggestions',
        unwantedAnswer: 'Complaints without constructive suggestions'
      },
      {
        text: 'Which team processes or practices should we continue or do more of? Why?',
        expectedAnswer: 'Specific processes with evidence of their effectiveness',
        unwantedAnswer: 'Vague positive feedback without reasoning'
      }
    ]
  },
  {
    id: 'service-improvement',
    title: 'Service Quality Assessment',
    description: 'Collect detailed feedback about service experience and improvement opportunities',
    questions: [
      {
        text: 'At what point in your recent interaction with our service did you feel most satisfied? What made it stand out?',
        expectedAnswer: 'Specific moment with details about what worked well',
        unwantedAnswer: 'Generic satisfaction ratings without context'
      },
      {
        text: 'Describe a moment where our service could have better met your needs. What specific changes would have helped?',
        expectedAnswer: 'Detailed pain point with specific improvement suggestions',
        unwantedAnswer: 'General complaints without actionable feedback'
      },
      {
        text: 'Which aspect of our service would you recommend to others and why? What makes it particularly valuable?',
        expectedAnswer: 'Specific feature/aspect with clear value proposition',
        unwantedAnswer: 'Simple yes/no answers without explanation'
      }
    ]
  },
  {
    id: 'user-experience',
    title: 'UX Improvement Feedback',
    description: 'Gather insights about user experience and interface improvements',
    questions: [
      {
        text: 'Which part of our interface makes your tasks easier than expected? How does it help you?',
        expectedAnswer: 'Specific UI element with explanation of its efficiency',
        unwantedAnswer: 'General praise without specific examples'
      },
      {
        text: 'Describe a moment where you felt confused or frustrated with the interface. What would have made it clearer?',
        expectedAnswer: 'Specific usability issue with suggested improvements',
        unwantedAnswer: 'Vague complaints about design'
      },
      {
        text: 'What feature or interaction would you like to see simplified? How would you prefer it to work?',
        expectedAnswer: 'Specific feature with clear suggestion for improvement',
        unwantedAnswer: 'General comments about simplification'
      }
    ]
  },
  {
    id: 'learning-effectiveness',
    title: 'Learning Experience Feedback',
    description: 'Evaluate the effectiveness of learning materials and instruction',
    questions: [
      {
        text: 'Which specific concept or topic became clearer through the materials provided? What made it effective?',
        expectedAnswer: 'Specific topic with explanation of helpful learning elements',
        unwantedAnswer: 'General statements about content being good'
      },
      {
        text: 'Describe a concept you struggled with. What additional resources or explanations would have helped?',
        expectedAnswer: 'Specific challenging topic with suggested improvements',
        unwantedAnswer: 'Complaints without constructive suggestions'
      },
      {
        text: 'What learning activity or method helped you apply the concepts best? How did it help?',
        expectedAnswer: 'Specific activity with explanation of its effectiveness',
        unwantedAnswer: 'Simple preference without reasoning'
      }
    ]
  }
]
