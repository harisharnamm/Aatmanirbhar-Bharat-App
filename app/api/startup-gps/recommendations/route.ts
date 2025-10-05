import { generateObject } from "ai"
import { groq } from "@ai-sdk/groq"
import { z } from "zod"

const recommendationSchema = z.object({
  schemes: z
    .array(
      z.object({
        name: z.string(),
        description: z.string(),
        eligibility: z.string(),
        benefits: z.string(),
        applyUrl: z.string().optional(),
      }),
    )
    .describe("Government schemes the user qualifies for"),
  banks: z
    .array(
      z.object({
        name: z.string(),
        loanType: z.string(),
        interestRate: z.string(),
        maxAmount: z.string(),
        requirements: z.string(),
      }),
    )
    .describe("Banks and financial institutions offering relevant loans"),
  licenses: z
    .array(
      z.object({
        name: z.string(),
        description: z.string(),
        authority: z.string(),
        estimatedTime: z.string(),
      }),
    )
    .describe("Required licenses and registrations"),
  training: z
    .array(
      z.object({
        program: z.string(),
        provider: z.string(),
        duration: z.string(),
        cost: z.string(),
      }),
    )
    .describe("Relevant training programs and skill development"),
  budget: z.object({
    initialInvestment: z.string(),
    monthlyExpenses: z.string(),
    breakEvenPeriod: z.string(),
    projectedROI: z.string(),
  }),
  nextSteps: z.array(z.string()).describe("Actionable next steps in priority order"),
})

export async function POST(req: Request) {
  const { sector, context }: { sector: string; context: string } = await req.json()

  const prompt = `Based on the following information about a rural entrepreneur in India:

Sector: ${sector}
User Context: ${context}

Generate personalized recommendations including:
1. 2-3 relevant government schemes (PMEGP, Mudra, Stand-Up India, state schemes, etc.)
2. 2-3 banks/financial institutions with suitable loan products
3. Required licenses and registrations for this business
4. 1-2 training programs or skill development opportunities
5. Realistic budget estimates and ROI projections
6. 5-7 actionable next steps in priority order

Make recommendations specific to rural India, considering accessibility and practical constraints. Use real scheme names and realistic estimates.`

  const { object } = await generateObject({
    model: groq("meta-llama/llama-4-scout-17b-16e-instruct", {
      apiKey: process.env.GROQ_API_KEY,
    }),
    schema: recommendationSchema,
    prompt,
    temperature: 0.7,
  })

  return Response.json(object)
}
