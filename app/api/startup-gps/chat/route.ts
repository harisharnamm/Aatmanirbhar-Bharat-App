import { streamText, convertToModelMessages, consumeStream, type UIMessage } from "ai"
import { groq } from "@ai-sdk/groq"

export const maxDuration = 30

const SYSTEM_PROMPT = `You are a helpful assistant for rural entrepreneurs in India. Your role is to ask qualifying questions to understand their business needs and provide personalized recommendations.

IMPORTANT: Collect detailed profile information to enable adaptive recommendations. Ask these key questions in a natural conversation:

1. EDUCATION: Ask about their education level (especially if below 10th grade - this affects PMEGP eligibility)
2. CAPITAL: Ask about available capital/savings (if they have capital, filter out loan schemes)
3. LOCATION: Ask for their state and district (for state-specific schemes and regional tailoring)
4. EXPERIENCE: Ask about business/farming experience
5. TIMELINE: When they plan to start
6. CHALLENGES: What challenges they anticipate

After gathering 4-6 key details, summarize what you learned and tell them you'll generate personalized recommendations.

Be encouraging and supportive. Many users may have limited business experience. Use simple language.`

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { messages, sector }: { messages?: UIMessage[]; sector?: string } = body

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Messages array is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      })
    }

    const result = streamText({
      model: groq("llama-3.3-70b-versatile", {
        apiKey: process.env.GROQ_API_KEY,
      }),
      system: `${SYSTEM_PROMPT}\n\nUser's selected sector: ${sector || "Not specified"}`,
      messages: convertToModelMessages(messages),
      temperature: 0.7,
      maxTokens: 500,
      abortSignal: req.signal,
    })

    return result.toUIMessageStreamResponse({
      consumeSseStream: consumeStream,
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    })
  }
}
