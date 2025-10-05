"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { RecommendationCard } from "@/components/startup-gps/recommendation-card"
import { ArrowLeft, Download, Share2, Loader2 } from "lucide-react"
import Link from "next/link"

type Recommendations = {
  schemes: Array<{
    name: string
    description: string
    eligibility: string
    benefits: string
    applyUrl?: string
  }>
  banks: Array<{
    name: string
    loanType: string
    interestRate: string
    maxAmount: string
    requirements: string
  }>
  licenses: Array<{
    name: string
    description: string
    authority: string
    estimatedTime: string
  }>
  training: Array<{
    program: string
    provider: string
    duration: string
    cost: string
  }>
  budget: {
    initialInvestment: string
    monthlyExpenses: string
    breakEvenPeriod: string
    projectedROI: string
  }
  nextSteps: string[]
}

export default function RecommendationsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sector = searchParams.get("sector") || "general"
  const context = searchParams.get("context") || ""

  const [recommendations, setRecommendations] = useState<Recommendations | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        const response = await fetch("/api/startup-gps/recommendations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sector, context }),
        })

        if (!response.ok) throw new Error("Failed to generate recommendations")

        const data = await response.json()
        setRecommendations(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [sector, context])

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "My Startup GPS Recommendations",
        text: `Personalized business recommendations for ${sector}`,
        url: window.location.href,
      })
    } else {
      await navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  const handleDownload = () => {
    if (!recommendations) return

    const content = `
STARTUP GPS - Your Personalized Business Roadmap
Sector: ${sector}

GOVERNMENT SCHEMES
${recommendations.schemes.map((s) => `• ${s.name}\n  ${s.description}\n  Eligibility: ${s.eligibility}\n`).join("\n")}

FINANCING OPTIONS
${recommendations.banks.map((b) => `• ${b.name} - ${b.loanType}\n  Interest: ${b.interestRate} | Max: ${b.maxAmount}\n`).join("\n")}

REQUIRED LICENSES
${recommendations.licenses.map((l) => `• ${l.name} (${l.authority})\n  ${l.description}\n`).join("\n")}

TRAINING PROGRAMS
${recommendations.training.map((t) => `• ${t.program} by ${t.provider}\n  Duration: ${t.duration} | Cost: ${t.cost}\n`).join("\n")}

BUDGET ESTIMATES
Initial Investment: ${recommendations.budget.initialInvestment}
Monthly Expenses: ${recommendations.budget.monthlyExpenses}
Break-even Period: ${recommendations.budget.breakEvenPeriod}
Projected ROI: ${recommendations.budget.projectedROI}

NEXT STEPS
${recommendations.nextSteps.map((step, i) => `${i + 1}. ${step}`).join("\n")}
    `.trim()

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `startup-gps-${sector}-recommendations.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Generating Your Personalized Roadmap</h2>
          <p className="text-muted-foreground">Analyzing schemes, funding options, and opportunities...</p>
        </div>
      </div>
    )
  }

  if (error || !recommendations) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-xl font-semibold mb-2">Unable to Generate Recommendations</h2>
          <p className="text-muted-foreground mb-4">{error || "Please try again"}</p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/startup-gps">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-lg font-semibold">Your Personalized Roadmap</h1>
                <p className="text-sm text-muted-foreground capitalize">{sector} Business</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="space-y-8">
          {/* Government Schemes */}
          <RecommendationCard
            title="Government Schemes You Qualify For"
            description="Financial assistance and support programs"
            items={recommendations.schemes.map((scheme) => ({
              title: scheme.name,
              content: (
                <div className="space-y-2">
                  <p className="text-sm">{scheme.description}</p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Eligibility:</strong> {scheme.eligibility}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Benefits:</strong> {scheme.benefits}
                  </p>
                </div>
              ),
            }))}
          />

          {/* Banks & Financing */}
          <RecommendationCard
            title="Financing Options"
            description="Banks and loan products for your business"
            items={recommendations.banks.map((bank) => ({
              title: `${bank.name} - ${bank.loanType}`,
              content: (
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>Interest Rate:</strong> {bank.interestRate}
                  </p>
                  <p>
                    <strong>Maximum Amount:</strong> {bank.maxAmount}
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Requirements:</strong> {bank.requirements}
                  </p>
                </div>
              ),
            }))}
          />

          {/* Licenses */}
          <RecommendationCard
            title="Required Licenses & Registrations"
            description="Legal requirements to start your business"
            items={recommendations.licenses.map((license) => ({
              title: license.name,
              content: (
                <div className="space-y-1 text-sm">
                  <p>{license.description}</p>
                  <p className="text-muted-foreground">
                    <strong>Authority:</strong> {license.authority}
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Processing Time:</strong> {license.estimatedTime}
                  </p>
                </div>
              ),
            }))}
          />

          {/* Training */}
          <RecommendationCard
            title="Training & Skill Development"
            description="Programs to enhance your business skills"
            items={recommendations.training.map((program) => ({
              title: program.program,
              content: (
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>Provider:</strong> {program.provider}
                  </p>
                  <p>
                    <strong>Duration:</strong> {program.duration}
                  </p>
                  <p>
                    <strong>Cost:</strong> {program.cost}
                  </p>
                </div>
              ),
            }))}
          />

          {/* Budget */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Budget Estimates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Initial Investment</p>
                <p className="text-lg font-semibold">{recommendations.budget.initialInvestment}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Monthly Expenses</p>
                <p className="text-lg font-semibold">{recommendations.budget.monthlyExpenses}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Break-even Period</p>
                <p className="text-lg font-semibold">{recommendations.budget.breakEvenPeriod}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Projected ROI</p>
                <p className="text-lg font-semibold text-primary">{recommendations.budget.projectedROI}</p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Your Next Steps</h2>
            <ol className="space-y-3">
              {recommendations.nextSteps.map((step, index) => (
                <li key={index} className="flex gap-3">
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-accent text-accent-foreground text-sm font-semibold">
                    {index + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* CTA */}
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">Ready to start a different business?</p>
            <Link href="/startup-gps">
              <Button variant="outline">Explore Other Sectors</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
