import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

// Helper function to extract user profile from context
function extractUserProfile(context: string): any {
  const profile: any = {}

  // Extract education level
  if (context.toLowerCase().includes('10th') || context.toLowerCase().includes('below 10th')) {
    profile.education = 'below_10th'
  } else if (context.toLowerCase().includes('12th') || context.toLowerCase().includes('higher secondary')) {
    profile.education = '12th_pass'
  } else if (context.toLowerCase().includes('graduate') || context.toLowerCase().includes('degree')) {
    profile.education = 'graduate'
  }

  // Extract capital availability
  if (context.toLowerCase().includes('no capital') || context.toLowerCase().includes('no money')) {
    profile.capital = 'none'
  } else if (context.toLowerCase().includes('some capital') || context.toLowerCase().includes('savings')) {
    profile.capital = 'some'
  } else if (context.toLowerCase().includes('₹') || context.toLowerCase().includes('lakhs') || context.toLowerCase().includes('thousands')) {
    profile.capital = 'available'
  }

  // Extract state information
  const states = ['punjab', 'rajasthan', 'uttar pradesh', 'maharashtra', 'gujarat', 'karnataka', 'tamil nadu', 'kerala', 'west bengal', 'bihar', 'jharkhand', 'odisha', 'madhya pradesh', 'chhattisgarh', 'haryana', 'himachal pradesh', 'uttarakhand', 'assam', 'sikkim', 'arunachal pradesh', 'nagaland', 'manipur', 'mizoram', 'tripura', 'meghalaya', 'goa', 'delhi', 'jammu and kashmir', 'ladakh']
  const contextLower = context.toLowerCase()
  for (const state of states) {
    if (contextLower.includes(state)) {
      profile.state = state.charAt(0).toUpperCase() + state.slice(1)
      break
    }
  }

  return profile
}

// Helper function to apply adaptive filtering
function applyAdaptiveFiltering(recommendations: any, profile: any, sector: string) {
  let { schemes, banks, training } = recommendations

  // Filter schemes based on user profile
  if (profile.capital === 'available') {
    // If user has capital, prioritize schemes that don't require loans
    schemes = schemes.filter((scheme: any) =>
      !scheme.name.toLowerCase().includes('loan') &&
      !scheme.name.toLowerCase().includes('credit')
    )
  }

  // Skip PMEGP if user is below 10th grade
  if (profile.education === 'below_10th') {
    schemes = schemes.filter((scheme: any) =>
      !scheme.name.toUpperCase().includes('PMEGP')
    )
  }

  // Add state-specific schemes
  if (profile.state) {
    const stateSchemes = getStateSpecificSchemes(profile.state, sector)
    schemes = [...schemes, ...stateSchemes]
  }

  // Add explanations for each recommendation
  schemes = schemes.map((scheme: any) => ({
    ...scheme,
    whyChosen: generateSchemeExplanation(scheme, profile, sector)
  }))

  banks = banks.map((bank: any) => ({
    ...bank,
    whyChosen: generateBankExplanation(bank, profile)
  }))

  training = training.map((program: any) => ({
    ...program,
    whyChosen: generateTrainingExplanation(program, profile, sector)
  }))

  return { schemes, banks, training }
}

// Helper functions for generating explanations
function generateSchemeExplanation(scheme: any, profile: any, sector: string): string {
  const reasons = []

  if (scheme.name.toUpperCase().includes('PMEGP')) {
    reasons.push("You qualify for PMEGP because you're starting a micro-enterprise in a rural area")
  }

  if (scheme.name.toLowerCase().includes('mudra')) {
    reasons.push("Mudra loans are ideal for small businesses and require minimal documentation")
  }

  if (profile.state && scheme.name.toLowerCase().includes('state')) {
    reasons.push(`This state-specific scheme is available in ${profile.state}`)
  }

  if (sector === 'farming' && scheme.name.toLowerCase().includes('farm')) {
    reasons.push("This scheme specifically supports agricultural activities and farming businesses")
  }

  return reasons.join('. ') || `This scheme matches your profile as a ${sector} entrepreneur`
}

function generateBankExplanation(bank: any, profile: any): string {
  const reasons = []

  if (bank.interestRate.includes('8') || bank.interestRate.includes('9')) {
    reasons.push("This bank offers competitive interest rates for rural entrepreneurs")
  }

  if (profile.capital === 'none') {
    reasons.push("This financial institution specializes in supporting entrepreneurs with limited capital")
  }

  return reasons.join('. ') || "This bank provides suitable financing options for your business needs"
}

function generateTrainingExplanation(program: any, profile: any, sector: string): string {
  const reasons = []

  if (program.program.toLowerCase().includes(sector)) {
    reasons.push(`This training program specifically covers ${sector} skills and best practices`)
  }

  if (profile.education === 'below_10th') {
    reasons.push("This program includes basic business education suitable for all education levels")
  }

  return reasons.join('. ') || "This training will help you develop essential business skills"
}

// State-specific schemes database
function getStateSpecificSchemes(state: string, sector: string): any[] {
  const stateSchemes: { [key: string]: any[] } = {
    'Punjab': [
      {
        name: "Punjab Rural Entrepreneurship Development Scheme",
        description: "State scheme for rural entrepreneurs in Punjab",
        eligibility: "Residents of Punjab with business plan",
        benefits: "Up to ₹10 lakhs subsidy",
        whyChosen: "Available specifically for Punjab residents starting rural businesses"
      }
    ],
    'Rajasthan': [
      {
        name: "Rajasthan Startup Policy",
        description: "Support for startups and new businesses in Rajasthan",
        eligibility: "Registered businesses in Rajasthan",
        benefits: "Infrastructure and mentoring support",
        whyChosen: "Tailored for Rajasthan entrepreneurs with focus on traditional crafts and agriculture"
      }
    ],
    'Uttar Pradesh': [
      {
        name: "One District One Product (ODOP) UP",
        description: "District-specific product development scheme",
        eligibility: "Businesses aligned with district products",
        benefits: "Marketing and development support",
        whyChosen: "Leverages local products and traditional skills in your district"
      }
    ]
  }

  return stateSchemes[state] || []
}

export async function POST(req: Request) {
  try {
  const { sector, context }: { sector: string; context: string } = await req.json()

    // Extract user profile from conversation context
    const userProfile = extractUserProfile(context)

    // Simple prompt that returns structured text
    const prompt = `Generate business recommendations for a rural entrepreneur in India starting a ${sector} business.

Context: ${context}

Please provide recommendations in the following format:

SCHEMES:
1. [Scheme Name]: [Description] - Why chosen: [Explanation]
2. [Scheme Name]: [Description] - Why chosen: [Explanation]

BANKS:
1. [Bank Name] - [Loan Type]: Why chosen: [Explanation]
2. [Bank Name] - [Loan Type]: Why chosen: [Explanation]

LICENSES:
1. [License Name]: [Description] - Why required: [Explanation]
2. [License Name]: [Description] - Why required: [Explanation]

TRAINING:
1. [Program Name]: Why recommended: [Explanation]

BUDGET:
Initial Investment: [Amount]
Projected ROI: [Percentage]

NEXT STEPS:
1. [Step 1]
2. [Step 2]
3. [Step 3]

Keep recommendations specific to rural India and the ${sector} sector.`

    const result = await generateText({
      model: groq("llama-3.3-70b-versatile", {
      apiKey: process.env.GROQ_API_KEY,
    }),
    prompt,
    temperature: 0.7,
      maxTokens: 1000,
    })

    // Parse the structured response into JSON format
    console.log("AI Response:", result.text)
    const recommendations = parseRecommendationsResponse(result.text)

    return Response.json(recommendations)
  } catch (error) {
    console.error("Recommendations API error:", error)
    return Response.json({
      error: "Failed to generate recommendations",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}

// Helper function to parse the structured text response
function parseRecommendationsResponse(text: string) {
  if (!text || typeof text !== 'string') {
    console.log("Invalid text received:", text)
    return getDefaultRecommendations()
  }
  
  const lines = text.split('\n')
  const recommendations = {
    schemes: [] as any[],
    banks: [] as any[],
    licenses: [] as any[],
    training: [] as any[],
    budget: { initialInvestment: "₹50,000", projectedROI: "20%" },
    nextSteps: [] as string[]
  }

  let currentSection = ''
  
  for (const line of lines) {
    const trimmedLine = line.trim()
    
    if (trimmedLine.startsWith('SCHEMES:')) {
      currentSection = 'schemes'
    } else if (trimmedLine.startsWith('BANKS:')) {
      currentSection = 'banks'
    } else if (trimmedLine.startsWith('LICENSES:')) {
      currentSection = 'licenses'
    } else if (trimmedLine.startsWith('TRAINING:')) {
      currentSection = 'training'
    } else if (trimmedLine.startsWith('BUDGET:')) {
      currentSection = 'budget'
    } else if (trimmedLine.startsWith('NEXT STEPS:')) {
      currentSection = 'nextSteps'
    } else if (trimmedLine.match(/^\d+\./)) {
      // Parse numbered items
      const content = trimmedLine.replace(/^\d+\.\s*/, '')
      
      if (currentSection === 'schemes') {
        const [name, rest] = content.split(': ')
        if (name && rest) {
          const [description, whyChosen] = rest.split(' - Why chosen: ')
          recommendations.schemes.push({
            name: name.trim(),
            description: description?.trim() || '',
            whyChosen: whyChosen?.trim() || 'Recommended for this business type'
          })
        }
      } else if (currentSection === 'banks') {
        const [nameAndType, whyChosen] = content.split(': Why chosen: ')
        if (nameAndType && whyChosen) {
          const [name, loanType] = nameAndType.split(' - ')
          recommendations.banks.push({
            name: name?.trim() || '',
            loanType: loanType?.trim() || '',
            whyChosen: whyChosen.trim()
          })
        }
      } else if (currentSection === 'licenses') {
        const [name, rest] = content.split(': ')
        if (name && rest) {
          const [description, whyChosen] = rest.split(' - Why required: ')
          recommendations.licenses.push({
            name: name.trim(),
            description: description?.trim() || '',
            whyChosen: whyChosen?.trim() || 'Required for this business type'
          })
        }
      } else if (currentSection === 'training') {
        const [program, whyChosen] = content.split(': Why recommended: ')
        if (program && whyChosen) {
          recommendations.training.push({
            program: program.trim(),
            whyChosen: whyChosen.trim()
          })
        }
      } else if (currentSection === 'nextSteps') {
        recommendations.nextSteps.push(content)
      }
    } else if (currentSection === 'budget' && trimmedLine.includes(':')) {
      const [key, value] = trimmedLine.split(': ')
      if (key?.includes('Investment')) {
        recommendations.budget.initialInvestment = value?.trim() || '₹50,000'
      } else if (key?.includes('ROI')) {
        recommendations.budget.projectedROI = value?.trim() || '20%'
      }
    }
  }

  // Ensure we have at least some default recommendations
  if (recommendations.schemes.length === 0) {
    recommendations.schemes = [
      {
        name: "PMEGP (Prime Minister's Employment Generation Programme)",
        description: "Government scheme for micro-enterprise development",
        whyChosen: "Provides financial assistance for new business ventures"
      },
      {
        name: "Mudra Yojana",
        description: "Micro finance scheme for small businesses",
        whyChosen: "Easy access to credit for entrepreneurs"
      }
    ]
  }

  if (recommendations.banks.length === 0) {
    recommendations.banks = [
      {
        name: "State Bank of India",
        loanType: "MSME Loan",
        whyChosen: "Competitive interest rates and government backing"
      },
      {
        name: "National Bank for Agriculture and Rural Development (NABARD)",
        loanType: "Rural Development Loan",
        whyChosen: "Specialized in rural business financing"
      }
    ]
  }

  if (recommendations.licenses.length === 0) {
    recommendations.licenses = [
      {
        name: "GST Registration",
        description: "Goods and Services Tax registration",
        whyChosen: "Required for businesses with turnover above ₹20 lakhs"
      },
      {
        name: "MSME Registration",
        description: "Micro, Small and Medium Enterprise registration",
        whyChosen: "Provides benefits and recognition for small businesses"
      }
    ]
  }

  if (recommendations.training.length === 0) {
    recommendations.training = [
      {
        program: "Entrepreneurship Development Programme",
        whyChosen: "Comprehensive business training for new entrepreneurs"
      }
    ]
  }

  if (recommendations.nextSteps.length === 0) {
    recommendations.nextSteps = [
      "Apply for required licenses and registrations",
      "Secure funding from recommended sources",
      "Start business operations with proper planning"
    ]
  }

  return recommendations
}

// Helper function to provide default recommendations when parsing fails
function getDefaultRecommendations() {
  return {
    schemes: [
      {
        name: "PMEGP (Prime Minister's Employment Generation Programme)",
        description: "Government scheme for micro-enterprise development",
        whyChosen: "Provides financial assistance for new business ventures"
      },
      {
        name: "Mudra Yojana",
        description: "Micro finance scheme for small businesses",
        whyChosen: "Easy access to credit for entrepreneurs"
      }
    ],
    banks: [
      {
        name: "State Bank of India",
        loanType: "MSME Loan",
        whyChosen: "Competitive interest rates and government backing"
      },
      {
        name: "National Bank for Agriculture and Rural Development (NABARD)",
        loanType: "Rural Development Loan",
        whyChosen: "Specialized in rural business financing"
      }
    ],
    licenses: [
      {
        name: "GST Registration",
        description: "Goods and Services Tax registration",
        whyChosen: "Required for businesses with turnover above ₹20 lakhs"
      },
      {
        name: "MSME Registration",
        description: "Micro, Small and Medium Enterprise registration",
        whyChosen: "Provides benefits and recognition for small businesses"
      }
    ],
    training: [
      {
        program: "Entrepreneurship Development Programme",
        whyChosen: "Comprehensive business training for new entrepreneurs"
      }
    ],
    budget: {
      initialInvestment: "₹50,000",
      projectedROI: "20%"
    },
    nextSteps: [
      "Apply for required licenses and registrations",
      "Secure funding from recommended sources",
      "Start business operations with proper planning"
    ]
  }
}
