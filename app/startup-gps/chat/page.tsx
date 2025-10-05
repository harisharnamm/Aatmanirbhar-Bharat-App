"use client"

import type React from "react"
import type { UIMessage } from "ai"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChatMessage } from "@/components/startup-gps/chat-message"
import { VoiceInput } from "@/components/startup-gps/voice-input"
import { ArrowLeft, Send, Sparkles } from "lucide-react"
import Link from "next/link"

export default function ChatPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sector = searchParams.get("sector") || "general"
  const [inputValue, setInputValue] = useState("")
  const [messages, setMessages] = useState<UIMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const initialMessageSentRef = useRef(false)

  // Send initial message when component mounts
  useEffect(() => {
    if (messages.length === 0 && !initialMessageSentRef.current) {
      initialMessageSentRef.current = true
      handleSendMessage(`I want to start a business in ${sector}. Can you help me?`)
    }
  }, [messages.length])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (messageContent: string) => {
    if (!messageContent.trim()) return

    const userMessage: UIMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      parts: [{ type: "text", text: messageContent }],
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await fetch("/api/startup-gps/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          sector,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error("No response body")

      const decoder = new TextDecoder()
      let aiMessageContent = ""
      const aiMessageId = `ai-${Date.now()}`

      const aiMessage: UIMessage = {
        id: aiMessageId,
        role: "assistant",
        parts: [{ type: "text", text: "" }],
      }

      setMessages(prev => [...prev, aiMessage])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split("\n")

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6)
            if (data === "[DONE]") continue

            try {
              const parsed = JSON.parse(data)
              if (parsed.type === "text-delta" && parsed.delta) {
                aiMessageContent += parsed.delta
                setMessages(prev =>
                  prev.map(msg =>
                    msg.id === aiMessageId
                      ? { ...msg, parts: [{ type: "text", text: aiMessageContent }] }
                      : msg
                  )
                )
              }
            } catch (e) {
              // Ignore parsing errors
            }
          }
        }
      }
    } catch (error) {
      console.error("Error sending message:", error)
      setMessages(prev => [...prev, {
        id: `error-${Date.now()}`,
        role: "assistant",
        parts: [{ type: "text", text: "Sorry, I encountered an error. Please try again." }],
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return

    const messageToSend = inputValue
    setInputValue("")
    handleSendMessage(messageToSend)
  }

  const handleVoiceInput = (transcript: string) => {
    setInputValue(transcript)
  }

  const handleGenerateRecommendations = () => {
    // Store conversation context and navigate to recommendations
    const conversationSummary = messages
      .filter((m) => m.role === "user")
      .map((m) => m.parts?.find((p) => p.type === "text")?.text || "")
      .join(" | ")

    router.push(`/startup-gps/recommendations?sector=${sector}&context=${encodeURIComponent(conversationSummary)}`)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-card/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center gap-4 px-4 py-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <h1 className="text-lg font-semibold">AI Assistant</h1>
            </div>
            <p className="text-sm capitalize text-muted-foreground">{sector.replace("-", " ")} Business</p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto max-w-3xl px-4 py-6">
          <div className="space-y-6">
            {messages.map((message, index) => (
              <ChatMessage key={`${message.id}-${index}`} message={message} />
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:0s]" />
                <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:0.2s]" />
                <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:0.4s]" />
                <span className="text-sm">AI is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Generate Recommendations Button */}
          {messages.length >= 6 && (
            <div className="mt-12 rounded-xl border bg-gradient-to-br from-primary/5 to-primary/10 p-6 text-center">
              <h3 className="mb-2 text-lg font-semibold">Ready for Your Personalized Roadmap?</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Based on our conversation, we can now generate tailored recommendations for your business.
              </p>
              <Button onClick={handleGenerateRecommendations} size="lg" className="group">
                Generate My Recommendations
                <Sparkles className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="sticky bottom-0 border-t bg-card/80 backdrop-blur-md">
        <div className="container mx-auto max-w-3xl px-4 py-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your answer..."
              disabled={isLoading}
              className="flex-1 rounded-full"
            />
            <VoiceInput onTranscript={handleVoiceInput} disabled={true} />
            <Button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              size="icon"
              className="rounded-full"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
