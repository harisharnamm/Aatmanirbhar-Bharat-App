import { streamText, convertToModelMessages, consumeStream, type UIMessage } from "ai"
import { groq } from "@ai-sdk/groq"

export const maxDuration = 30

const SYSTEM_PROMPT = `You are a helpful assistant for rural entrepreneurs in India. Your role is to ask qualifying questions to understand their business needs and provide personalized recommendations.

Based on the user's sector, ask 3-5 relevant questions about:
- Their experience level
- Available capital/budget
- Location (district/state)
- Target market
- Specific challenges they face
- Timeline for starting

Keep questions simple, conversational, and in easy-to-understand language. After gathering enough information, summarize what you learned and tell them you'll generate personalized recommendations.

Be encouraging and supportive. Many users may have limited business experience.`

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
