import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SectorTile } from "@/components/startup-gps/sector-tile"
import { Sprout, Store, Milk, Palette, Hammer, Shirt, Package, Utensils, ArrowRight, Sparkles } from "lucide-react"

const sectors = [
  {
    id: "farming",
    name: "Farming & Agriculture",
    icon: Sprout,
    description: "Crops, livestock, organic farming",
  },
  {
    id: "dairy",
    name: "Dairy Business",
    icon: Milk,
    description: "Milk production, dairy products",
  },
  {
    id: "retail",
    name: "Small Shop / Retail",
    icon: Store,
    description: "Grocery, general store, kirana",
  },
  {
    id: "handicrafts",
    name: "Handicrafts & Crafts",
    icon: Palette,
    description: "Traditional crafts, artisan work",
  },
  {
    id: "manufacturing",
    name: "Small Manufacturing",
    icon: Hammer,
    description: "Production, assembly, processing",
  },
  {
    id: "textiles",
    name: "Textiles & Garments",
    icon: Shirt,
    description: "Weaving, tailoring, embroidery",
  },
  {
    id: "food",
    name: "Food Processing",
    icon: Utensils,
    description: "Snacks, pickles, packaged foods",
  },
  {
    id: "other",
    name: "Other Business",
    icon: Package,
    description: "Services, trading, other ventures",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(var(--primary-rgb,34,197,94),0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(var(--accent-rgb,22,163,74),0.06),transparent_50%)]" />

        <div className="container relative mx-auto px-4 py-16 md:py-24 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-card/50 px-4 py-2 text-sm backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Unified Government Portal</span>
            </div>

            <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Aatmanirbhar Bharat
              <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Unified Portal
              </span>
            </h1>

            <p className="mb-8 text-pretty text-lg text-muted-foreground md:text-xl">
              Your single gateway to India's self-reliance ecosystem. Access government schemes, business licenses,
              funding opportunities, training programs, and comprehensive support for entrepreneurs—all in one place.
            </p>

            <Button size="lg" className="group" asChild>
              <a href="#sectors">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Sector Selection */}
      <section id="sectors" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Choose Your Business Sector</h2>
            <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
              Select your sector to access sector-specific government schemes, funding options, licenses, and training programs
              available through the Aatmanirbhar Bharat Unified Portal.
            </p>
          </div>

          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
              {sectors.map((sector) => (
                <Link key={sector.id} href={`/startup-gps/chat?sector=${sector.id}`}>
                  <SectorTile icon={sector.icon} name={sector.name} description={sector.description} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">How the Unified Portal Works</h2>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-xl font-bold text-primary-foreground">
                  1
                </div>
                <h3 className="mb-2 text-xl font-semibold">Select Your Sector</h3>
                <p className="text-pretty text-muted-foreground">
                  Choose from 8 business sectors to access sector-specific government resources and support programs.
                </p>
              </div>

              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-xl font-bold text-primary-foreground">
                  2
                </div>
                <h3 className="mb-2 text-xl font-semibold">Get Personalized Guidance</h3>
                <p className="text-pretty text-muted-foreground">
                  Our AI assistant evaluates your profile and provides tailored recommendations from available government schemes and programs.
                </p>
              </div>

              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-xl font-bold text-primary-foreground">
                  3
                </div>
                <h3 className="mb-2 text-xl font-semibold">Access Complete Support</h3>
                <p className="text-pretty text-muted-foreground">
                  Get comprehensive support including funding options, business licenses, training programs, and implementation guidance—all in one unified portal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
              Unified Portal Services
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border bg-card p-6">
                <h3 className="mb-2 text-lg font-semibold">Government Schemes Database</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive database of central and state government schemes with eligibility criteria and application processes.
                </p>
              </div>

              <div className="rounded-xl border bg-card p-6">
                <h3 className="mb-2 text-lg font-semibold">Unified Funding Portal</h3>
                <p className="text-sm text-muted-foreground">
                  Access multiple funding sources including banks, NBFCs, venture capital, and government grants in one place.
                </p>
              </div>

              <div className="rounded-xl border bg-card p-6">
                <h3 className="mb-2 text-lg font-semibold">License Management Hub</h3>
                <p className="text-sm text-muted-foreground">
                  Complete checklist of required licenses, permits, and registrations with processing timelines and status tracking.
                </p>
              </div>

              <div className="rounded-xl border bg-card p-6">
                <h3 className="mb-2 text-lg font-semibold">Skill Development Center</h3>
                <p className="text-sm text-muted-foreground">
                  Access government-sponsored training programs, workshops, online courses, and mentorship opportunities.
                </p>
              </div>

              <div className="rounded-xl border bg-card p-6">
                <h3 className="mb-2 text-lg font-semibold">Business Planning Tools</h3>
                <p className="text-sm text-muted-foreground">
                  Financial planning tools, cost calculators, market analysis, and ROI projections for informed decision making.
                </p>
              </div>

              <div className="rounded-xl border bg-card p-6">
                <h3 className="mb-2 text-lg font-semibold">Implementation Roadmap</h3>
                <p className="text-sm text-muted-foreground">
                  Step-by-step implementation guides, compliance checklists, and milestone tracking for successful business launch.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-gradient-to-br from-primary/5 to-primary/10 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Join India's Self-Reliance Movement</h2>
          <p className="mb-8 text-pretty text-lg text-muted-foreground">
            Access the complete ecosystem of government support through the Aatmanirbhar Bharat Unified Portal.
            Start your entrepreneurial journey with comprehensive guidance and resources.
          </p>
          <Button size="lg" className="group" asChild>
            <a href="#sectors">
              Access Portal Services
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  )
}
