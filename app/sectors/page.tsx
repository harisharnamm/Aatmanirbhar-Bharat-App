import Link from "next/link"
import { SectorTile } from "@/components/startup-gps/sector-tile"
import { Sprout, Store, Milk, Palette, Hammer, Shirt, Package, Utensils, ArrowLeft } from "lucide-react"

const sectors = [
  {
    id: "farming",
    name: "Farming & Agriculture",
    icon: Sprout,
    description: "Crops, livestock, organic farming",
    stats: "45% of businesses",
  },
  {
    id: "dairy",
    name: "Dairy Business",
    icon: Milk,
    description: "Milk production, dairy products",
    stats: "18% of businesses",
  },
  {
    id: "retail",
    name: "Small Shop / Retail",
    icon: Store,
    description: "Grocery, general store, kirana",
    stats: "22% of businesses",
  },
  {
    id: "handicrafts",
    name: "Handicrafts & Crafts",
    icon: Palette,
    description: "Traditional crafts, artisan work",
    stats: "8% of businesses",
  },
  {
    id: "manufacturing",
    name: "Small Manufacturing",
    icon: Hammer,
    description: "Production, assembly, processing",
    stats: "4% of businesses",
  },
  {
    id: "textiles",
    name: "Textiles & Garments",
    icon: Shirt,
    description: "Weaving, tailoring, embroidery",
    stats: "2% of businesses",
  },
  {
    id: "food",
    name: "Food Processing",
    icon: Utensils,
    description: "Snacks, pickles, packaged foods",
    stats: "1% of businesses",
  },
  {
    id: "other",
    name: "Other Business",
    icon: Package,
    description: "Services, trading, other ventures",
    stats: "0% of businesses",
  },
]

export default function SectorsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-card/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center gap-4 px-4 py-4">
          <Link href="/">
            <button className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-accent transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Choose Your Business Sector</h1>
            <p className="text-sm text-muted-foreground">
              Select your sector to get personalized guidance and resources
            </p>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(var(--primary-rgb,34,197,94),0.08),transparent_50%)]" />
        <div className="container relative mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">
            What Business Are You Planning?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose your business sector below to access sector-specific government schemes,
            funding opportunities, licenses, and personalized guidance tailored to your industry.
          </p>
        </div>
      </section>

      {/* Sector Selection */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sectors.map((sector) => (
                <Link key={sector.id} href={`/startup-gps/chat?sector=${sector.id}`}>
                  <div className="group">
                    <SectorTile icon={sector.icon} name={sector.name} description={sector.description} />
                    <div className="mt-3 text-center">
                      <span className="inline-block px-3 py-1 text-xs bg-primary/10 text-primary rounded-full font-medium">
                        {sector.stats}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Sectors */}
      <section className="border-t bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h3 className="mb-4 text-2xl font-bold">Most Popular Sectors</h3>
              <p className="text-muted-foreground">
                Based on current trends and entrepreneurial interest across India
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border bg-card p-6 text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Sprout className="h-8 w-8" />
                </div>
                <h4 className="mb-2 text-lg font-semibold">Agriculture & Farming</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  India's backbone sector with growing demand for organic and sustainable farming practices.
                </p>
                <div className="text-2xl font-bold text-primary mb-2">45%</div>
                <div className="text-xs text-muted-foreground">of our entrepreneurs</div>
              </div>

              <div className="rounded-xl border bg-card p-6 text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Store className="h-8 w-8" />
                </div>
                <h4 className="mb-2 text-lg font-semibold">Retail & Kirana</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Essential local businesses that form the foundation of community commerce.
                </p>
                <div className="text-2xl font-bold text-primary mb-2">22%</div>
                <div className="text-xs text-muted-foreground">of our entrepreneurs</div>
              </div>

              <div className="rounded-xl border bg-card p-6 text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Milk className="h-8 w-8" />
                </div>
                <h4 className="mb-2 text-lg font-semibold">Dairy & Livestock</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Growing sector with increasing demand for quality dairy products and animal husbandry.
                </p>
                <div className="text-2xl font-bold text-primary mb-2">18%</div>
                <div className="text-xs text-muted-foreground">of our entrepreneurs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Your Sector */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h3 className="mb-6 text-2xl font-bold">Why Sector Selection Matters</h3>
            <p className="text-lg text-muted-foreground mb-12">
              Different sectors have unique government schemes, funding opportunities, and regulatory requirements.
              Choosing the right sector ensures you get the most relevant support and guidance.
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="text-left">
                <h4 className="mb-3 text-lg font-semibold">Tailored Government Support</h4>
                <p className="text-sm text-muted-foreground">
                  Each sector has specific schemes designed by the government. Agriculture gets PM-KISAN,
                  retail businesses get GST benefits, and manufacturing gets industrial incentives.
                </p>
              </div>

              <div className="text-left">
                <h4 className="mb-3 text-lg font-semibold">Industry-Specific Guidance</h4>
                <p className="text-sm text-muted-foreground">
                  Get expert advice from people who understand your industry, market trends,
                  and best practices specific to your chosen sector.
                </p>
              </div>

              <div className="text-left">
                <h4 className="mb-3 text-lg font-semibold">Regulatory Clarity</h4>
                <p className="text-sm text-muted-foreground">
                  Know exactly which licenses, permits, and certifications you need
                  for your specific type of business and location.
                </p>
              </div>

              <div className="text-left">
                <h4 className="mb-3 text-lg font-semibold">Funding Opportunities</h4>
                <p className="text-sm text-muted-foreground">
                  Access sector-specific funding programs, subsidies, and loan schemes
                  that are most relevant to your business type.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
