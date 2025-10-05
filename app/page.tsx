import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Target, Users, Award, TrendingUp, Shield, Heart } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(var(--primary-rgb,34,197,94),0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(var(--accent-rgb,22,163,74),0.06),transparent_50%)]" />

        <div className="container relative mx-auto px-4 py-16 md:py-24 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border bg-card/50 px-4 py-2 text-sm backdrop-blur-sm">
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

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Button size="lg" className="group text-lg px-8 py-6" asChild>
                <Link href="/sectors">
                  Explore Business Sectors
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
                <Link href="/about">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">Our Mission</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                To empower every Indian entrepreneur with the tools, knowledge, and resources needed
                to build successful businesses and contribute to India's economic self-reliance.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Target className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Comprehensive Support</h3>
                <p className="text-sm text-muted-foreground">
                  End-to-end guidance from business ideation to successful launch and growth.
                </p>
              </div>

              <div className="text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Inclusive Access</h3>
                <p className="text-sm text-muted-foreground">
                  Accessible to entrepreneurs from all backgrounds, regions, and business sizes.
                </p>
              </div>

              <div className="text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Government Integration</h3>
                <p className="text-sm text-muted-foreground">
                  Seamlessly connects you with all relevant government schemes and programs.
                </p>
              </div>

              <div className="text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Sustainable Growth</h3>
                <p className="text-sm text-muted-foreground">
                  Focus on building profitable, scalable businesses that create long-term value.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="border-t bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">Making a Real Impact</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Every business we help launch contributes to India's economic growth, job creation,
                and journey towards self-reliance.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-4 text-4xl font-bold text-primary">10,000+</div>
                <h3 className="mb-2 text-lg font-semibold">Entrepreneurs Supported</h3>
                <p className="text-sm text-muted-foreground">
                  Rural and urban entrepreneurs empowered with knowledge and resources.
                </p>
              </div>

              <div className="text-center">
                <div className="mb-4 text-4xl font-bold text-primary">₹500Cr+</div>
                <h3 className="mb-2 text-lg font-semibold">Funding Facilitated</h3>
                <p className="text-sm text-muted-foreground">
                  Government and private funding secured for business growth.
                </p>
              </div>

              <div className="text-center">
                <div className="mb-4 text-4xl font-bold text-primary">50,000+</div>
                <h3 className="mb-2 text-lg font-semibold">Jobs Created</h3>
                <p className="text-sm text-muted-foreground">
                  Employment opportunities generated through successful businesses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">Comprehensive Portal Services</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Everything you need to start, grow, and sustain your business under one unified platform.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="group">
                <div className="rounded-xl border bg-card p-6 h-full transition-all hover:shadow-lg hover:border-primary/50">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-lg font-semibold">Government Schemes Database</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Comprehensive database of central and state government schemes with eligibility criteria and application processes.
                  </p>
                  <div className="text-xs text-primary font-medium">200+ Active Schemes</div>
                </div>
              </div>

              <div className="group">
                <div className="rounded-xl border bg-card p-6 h-full transition-all hover:shadow-lg hover:border-primary/50">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-lg font-semibold">Unified Funding Portal</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Access multiple funding sources including banks, NBFCs, venture capital, and government grants in one place.
                  </p>
                  <div className="text-xs text-primary font-medium">₹1000Cr+ Available</div>
                </div>
              </div>

              <div className="group">
                <div className="rounded-xl border bg-card p-6 h-full transition-all hover:shadow-lg hover:border-primary/50">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Award className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-lg font-semibold">License Management Hub</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Complete checklist of required licenses, permits, and registrations with processing timelines and status tracking.
                  </p>
                  <div className="text-xs text-primary font-medium">50+ License Types</div>
                </div>
              </div>

              <div className="group">
                <div className="rounded-xl border bg-card p-6 h-full transition-all hover:shadow-lg hover:border-primary/50">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-lg font-semibold">Skill Development Center</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Access government-sponsored training programs, workshops, online courses, and mentorship opportunities.
                  </p>
                  <div className="text-xs text-primary font-medium">1000+ Programs</div>
                </div>
              </div>

              <div className="group">
                <div className="rounded-xl border bg-card p-6 h-full transition-all hover:shadow-lg hover:border-primary/50">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Target className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-lg font-semibold">Business Planning Tools</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Financial planning tools, cost calculators, market analysis, and ROI projections for informed decision making.
                  </p>
                  <div className="text-xs text-primary font-medium">AI-Powered Insights</div>
                </div>
              </div>

              <div className="group">
                <div className="rounded-xl border bg-card p-6 h-full transition-all hover:shadow-lg hover:border-primary/50">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Heart className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-lg font-semibold">Implementation Roadmap</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Step-by-step implementation guides, compliance checklists, and milestone tracking for successful business launch.
                  </p>
                  <div className="text-xs text-primary font-medium">End-to-End Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">Success Stories</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Real entrepreneurs who transformed their dreams into successful businesses with our support.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-xl border bg-card p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-semibold text-primary">RS</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Rajesh Sharma</h4>
                    <p className="text-sm text-muted-foreground">Organic Farming, Punjab</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  "The portal helped me secure government subsidies and training. My organic farm now exports to 5 countries."
                </p>
                <div className="mt-4 text-xs text-primary font-medium">Revenue: ₹2.5Cr annually</div>
              </div>

              <div className="rounded-xl border bg-card p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-semibold text-primary">PK</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Priya Kapoor</h4>
                    <p className="text-sm text-muted-foreground">Handicrafts, Rajasthan</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  "From a small workshop to international exhibitions. The funding and marketing support was crucial."
                </p>
                <div className="mt-4 text-xs text-primary font-medium">50+ Artisans employed</div>
              </div>

              <div className="rounded-xl border bg-card p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-semibold text-primary">MS</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Mohammed Singh</h4>
                    <p className="text-sm text-muted-foreground">Food Processing, UP</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  "The business planning tools and license guidance saved me months of effort. Now supplying to major retailers."
                </p>
                <div className="mt-4 text-xs text-primary font-medium">25 local jobs created</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t bg-gradient-to-br from-primary/5 to-primary/10 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">Ready to Build Your Success Story?</h2>
          <p className="mb-8 text-pretty text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of successful entrepreneurs who have transformed their ideas into thriving businesses
            with the support of India's Aatmanirbhar Bharat Unified Portal.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="group text-lg px-8 py-6" asChild>
              <Link href="/sectors">
                Start Your Business Journey
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
              <Link href="/contact">
                Get Expert Consultation
              </Link>
            </Button>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            Free registration • No hidden fees • 24/7 Support available
          </p>
        </div>
      </section>
    </div>
  )
}
