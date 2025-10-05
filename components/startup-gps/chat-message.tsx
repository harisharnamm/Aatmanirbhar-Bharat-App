import type { UIMessage } from "ai"
import { Bot, User } from "lucide-react"

interface ChatMessageProps {
  message: UIMessage
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"
  const textContent = message.parts.find((p) => p.type === "text")?.text || ""

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"
        }`}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>
      <div
        className={`flex-1 rounded-lg px-4 py-3 ${
          isUser ? "bg-accent text-accent-foreground ml-12" : "bg-card border border-border mr-12"
        }`}
      >
        <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{textContent}</p>
      </div>
    </div>
  )
}
