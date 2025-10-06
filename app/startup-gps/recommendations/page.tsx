"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Share2, Loader2, CheckCircle, ChevronRight, ChevronLeft, Sparkles, Building2, Banknote, FileText, GraduationCap, Calculator, MapPin } from "lucide-react"
import Link from "next/link"

type Recommendations = {
  userProfile?: {
    education?: string
    capital?: string
    state?: string
    district?: string
    experience?: string
    targetMarket?: string
    timeline?: string
    challenges?: string[]
  }
  schemes: Array<{
    name: string
    description: string
    eligibility?: string
    benefits?: string
    applyUrl?: string
    whyChosen: string
  }>
  banks: Array<{
    name: string
    loanType: string
    interestRate?: string
    maxAmount?: string
    requirements?: string
    whyChosen: string
  }>
  licenses: Array<{
    name: string
    description: string
    authority?: string
    estimatedTime?: string
    whyChosen: string
  }>
  training: Array<{
    program: string
    provider?: string
    duration?: string
    cost?: string
    whyChosen: string
  }>
  budget: {
    initialInvestment: string
    monthlyExpenses?: string
    breakEvenPeriod?: string
    projectedROI: string
    financialProjections?: {
      baseCase?: string
      optimisticCase?: string
      pessimisticCase?: string
      sensitivityAnalysis?: string[]
      riskFactors?: string[]
    }
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
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const steps = [
    { id: 0, title: "Government Schemes", icon: Building2, color: "bg-blue-500", description: "Financial assistance programs" },
    { id: 1, title: "Banking Options", icon: Banknote, color: "bg-green-500", description: "Loans and financing" },
    { id: 2, title: "Required Licenses", icon: FileText, color: "bg-purple-500", description: "Legal requirements" },
    { id: 3, title: "Training Programs", icon: GraduationCap, color: "bg-orange-500", description: "Skill development" },
    { id: 4, title: "Budget Planning", icon: Calculator, color: "bg-indigo-500", description: "Financial projections" },
    { id: 5, title: "Next Steps", icon: MapPin, color: "bg-pink-500", description: "Action plan" },
  ]

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        // Get context from sessionStorage if not in URL params
        const contextData = context || sessionStorage.getItem('recommendationContext') || ''
        
        const response = await fetch("/api/startup-gps/recommendations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            sector, 
            context: contextData
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.details || "Failed to generate recommendations")
        }

        const data = await response.json()
        setRecommendations(data)
      } catch (err) {
        console.error("Error fetching recommendations:", err)
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [sector, context])

  const handleStepComplete = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps(prev => [...prev, currentStep])
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleStepClick = (stepId: number) => {
    setCurrentStep(stepId)
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "My Startup GPS Recommendations",
        text: `Check out my personalized business roadmap for ${sector} sector!`,
        url: window.location.href,
      })
    }
  }

  const handleDownload = () => {
    if (!recommendations) return

    const content = `
STARTUP GPS - Your Personalized Business Roadmap
Sector: ${sector}

GOVERNMENT SCHEMES
${recommendations.schemes.map((s) => `• ${s.name}\n  ${s.description}\n  Why chosen: ${s.whyChosen}\n`).join("\n")}

FINANCING OPTIONS
${recommendations.banks.map((b) => `• ${b.name} - ${b.loanType}\n  Why chosen: ${b.whyChosen}\n`).join("\n")}

REQUIRED LICENSES
${recommendations.licenses.map((l) => `• ${l.name}\n  ${l.description}\n  Why required: ${l.whyChosen}\n`).join("\n")}

TRAINING PROGRAMS
${recommendations.training.map((t) => `• ${t.program}\n  Why recommended: ${t.whyChosen}\n`).join("\n")}

BUDGET ESTIMATES
Initial Investment: ${recommendations.budget.initialInvestment}
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
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-background to-muted/20 z-50">
        <div className="w-full max-w-sm px-6 text-center">
          <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary/20 border-t-primary"></div>
            <Sparkles className="absolute inset-0 m-auto h-6 w-6 animate-pulse text-primary" />
          </div>
          <h2 className="mb-3 text-xl font-semibold">Crafting Your Roadmap</h2>
          <p className="text-muted-foreground">Analyzing your profile and generating personalized recommendations...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted/20">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <Sparkles className="h-8 w-8 text-destructive" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-destructive">Oops! Something went wrong</h1>
          <p className="mb-6 text-muted-foreground">{error}</p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    )
  }

  if (!recommendations) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted/20">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Sparkles className="h-8 w-8 text-muted-foreground" />
          </div>
          <h1 className="mb-2 text-2xl font-bold">No Recommendations</h1>
          <p className="mb-6 text-muted-foreground">Unable to generate recommendations.</p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    )
  }

  const renderStepContent = () => {
    const currentStepData = steps[currentStep]
    const Icon = currentStepData.icon

    switch (currentStep) {
      case 0: // Schemes
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${currentStepData.color}`}>
                <Icon className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">{currentStepData.title}</h2>
              <p className="text-muted-foreground">{currentStepData.description}</p>
            </div>
            <div className="space-y-6">
              {recommendations.schemes.map((scheme, index) => (
                <div key={index} className="rounded-xl border bg-card p-4 sm:p-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 flex-shrink-0">
                      <Building2 className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-3">{scheme.name}</h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">{scheme.description}</p>
                      <div className="rounded-lg bg-blue-50 p-4 border-l-4 border-blue-500">
                        <p className="text-sm font-medium text-blue-700 leading-relaxed">
                          <strong>Why this scheme:</strong> {scheme.whyChosen}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 1: // Banks
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${currentStepData.color}`}>
                <Icon className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">{currentStepData.title}</h2>
              <p className="text-muted-foreground">{currentStepData.description}</p>
            </div>
            <div className="space-y-6">
              {recommendations.banks.map((bank, index) => (
                <div key={index} className="rounded-xl border bg-card p-4 sm:p-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 flex-shrink-0">
                      <Banknote className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-3">{bank.name}</h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">{bank.loanType}</p>
                      <div className="rounded-lg bg-green-50 p-4 border-l-4 border-green-500">
                        <p className="text-sm font-medium text-green-700 leading-relaxed">
                          <strong>Why this option:</strong> {bank.whyChosen}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 2: // Licenses
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${currentStepData.color}`}>
                <Icon className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">{currentStepData.title}</h2>
              <p className="text-muted-foreground">{currentStepData.description}</p>
            </div>
            <div className="space-y-6">
              {recommendations.licenses.map((license, index) => (
                <div key={index} className="rounded-xl border bg-card p-4 sm:p-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600 flex-shrink-0">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-3">{license.name}</h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">{license.description}</p>
                      <div className="rounded-lg bg-purple-50 p-4 border-l-4 border-purple-500">
                        <p className="text-sm font-medium text-purple-700 leading-relaxed">
                          <strong>Why required:</strong> {license.whyChosen}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 3: // Training
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${currentStepData.color}`}>
                <Icon className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">{currentStepData.title}</h2>
              <p className="text-muted-foreground">{currentStepData.description}</p>
            </div>
            <div className="space-y-6">
              {recommendations.training.map((program, index) => (
                <div key={index} className="rounded-xl border bg-card p-4 sm:p-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600 flex-shrink-0">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-4">{program.program}</h3>
                      <div className="rounded-lg bg-orange-50 p-4 border-l-4 border-orange-500">
                        <p className="text-sm font-medium text-orange-700 leading-relaxed">
                          <strong>Why recommended:</strong> {program.whyChosen}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 4: // Budget
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${currentStepData.color}`}>
                <Icon className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">{currentStepData.title}</h2>
              <p className="text-muted-foreground">{currentStepData.description}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border bg-card p-4 sm:p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 flex-shrink-0">
                    <Calculator className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg">Initial Investment</h3>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-primary">{recommendations.budget.initialInvestment}</p>
              </div>
              <div className="rounded-xl border bg-card p-4 sm:p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 flex-shrink-0">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg">Projected ROI</h3>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-primary">{recommendations.budget.projectedROI}</p>
              </div>
            </div>
            {recommendations.budget.monthlyExpenses && (
              <div className="rounded-xl border bg-card p-4 sm:p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-4">Monthly Expenses</h3>
                <p className="text-xl sm:text-2xl font-bold">{recommendations.budget.monthlyExpenses}</p>
              </div>
            )}
            {recommendations.budget.breakEvenPeriod && (
              <div className="rounded-xl border bg-card p-4 sm:p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-4">Break-even Period</h3>
                <p className="text-xl sm:text-2xl font-bold">{recommendations.budget.breakEvenPeriod}</p>
              </div>
            )}
          </div>
        )

      case 5: // Next Steps
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${currentStepData.color}`}>
                <Icon className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">{currentStepData.title}</h2>
              <p className="text-muted-foreground">{currentStepData.description}</p>
            </div>
            <div className="space-y-6">
              {recommendations.nextSteps.map((step, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-start gap-4 rounded-xl border bg-card p-4 sm:p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 text-pink-600 font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base leading-relaxed">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-card/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-6">
          {/* Mobile-first responsive layout */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Left section with back button and title */}
            <div className="flex items-center gap-4">
              <Link href="/startup-gps/chat">
                <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex-1">
                <h1 className="text-lg sm:text-xl font-semibold">Your Business Roadmap</h1>
                <p className="text-sm capitalize text-muted-foreground">{sector.replace("-", " ")} Business</p>
              </div>
            </div>
            
            {/* Right section with action buttons */}
            <div className="flex gap-3 sm:gap-2">
              <Button variant="outline" size="sm" onClick={handleShare} className="flex-1 sm:flex-none">
                <Share2 className="mr-2 h-4 w-4" />
                <span className="hidden xs:inline">Share</span>
                <span className="xs:hidden">Share</span>
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload} className="flex-1 sm:flex-none">
                <Download className="mr-2 h-4 w-4" />
                <span className="hidden xs:inline">Export</span>
                <span className="xs:hidden">Export</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          {/* Mobile-first progress layout */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Step counter and progress dots */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <span className="text-sm font-medium">Step {currentStep + 1} of {steps.length}</span>
              <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
                {steps.map((step) => {
                  const Icon = step.icon
                  const isCompleted = completedSteps.includes(step.id)
                  const isCurrent = currentStep === step.id
                  
                  return (
                    <button
                      key={step.id}
                      onClick={() => handleStepClick(step.id)}
                      className={`flex h-10 w-10 items-center justify-center rounded-full transition-all touch-manipulation ${
                        isCompleted
                          ? `${step.color} text-white`
                          : isCurrent
                          ? `border-2 ${step.color.replace('bg-', 'border-')} bg-white text-${step.color.replace('bg-', '')}`
                          : 'border border-muted-foreground/30 bg-muted/50 text-muted-foreground'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
            
            {/* Progress percentage */}
            <div className="text-center sm:text-right">
              <span className="text-sm text-muted-foreground">
                {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-2xl border bg-card p-6 sm:p-8 shadow-lg">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Button
            variant="outline"
            onClick={handlePreviousStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2 h-12 px-6"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex items-center justify-center gap-2">
            {completedSteps.includes(currentStep) && (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Completed</span>
              </div>
            )}
          </div>

          {currentStep < steps.length - 1 ? (
            <Button
              onClick={handleStepComplete}
              className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 h-12 px-6"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleStepComplete}
              className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 h-12 px-6"
            >
              <CheckCircle className="h-4 w-4" />
              Complete Roadmap
            </Button>
          )}
        </div>

        {/* Final CTA - Show when all steps completed */}
        {completedSteps.length === steps.length && (
          <div className="mt-8 rounded-xl border bg-gradient-to-br from-primary/5 to-accent/5 p-6 sm:p-8 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-4 text-xl sm:text-2xl font-bold">🎉 Congratulations!</h3>
            <p className="mb-8 text-muted-foreground max-w-md mx-auto">
              You've completed your personalized roadmap for starting a {sector.replace("-", " ")} business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Button size="lg" onClick={handleShare} className="bg-gradient-to-r from-primary to-primary/80 h-12">
                <Share2 className="mr-2 h-4 w-4" />
                Share My Roadmap
              </Button>
              <Button size="lg" variant="outline" onClick={handleDownload} className="h-12">
                <Download className="mr-2 h-4 w-4" />
                Export as PDF
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}