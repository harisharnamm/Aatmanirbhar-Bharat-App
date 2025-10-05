import { Card } from "@/components/ui/card"
import type { ReactNode } from "react"

interface RecommendationCardProps {
  title: string
  description: string
  items: Array<{
    title: string
    content: ReactNode
  }>
}

export function RecommendationCard({ title, description, items }: RecommendationCardProps) {
  return (
    <Card className="p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-1">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="border-l-2 border-primary pl-4 py-2">
            <h3 className="font-semibold mb-2">{item.title}</h3>
            {item.content}
          </div>
        ))}
      </div>
    </Card>
  )
}
