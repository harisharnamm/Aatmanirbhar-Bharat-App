import type { LucideIcon } from "lucide-react"

interface SectorTileProps {
  icon: LucideIcon
  name: string
  description: string
}

export function SectorTile({ icon: Icon, name, description }: SectorTileProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/5 touch-manipulation">
      <div className="aspect-square p-4 sm:p-6 flex flex-col items-center justify-center text-center gap-3 sm:gap-4">
        {/* Icon container */}
        <div className="relative">
          <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-primary/20 blur-xl transition-all group-hover:bg-primary/30" />
          <div className="relative flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary/20">
            <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary transition-transform group-hover:scale-110" strokeWidth={1.5} />
          </div>
        </div>

        {/* Text content */}
        <div className="space-y-1 px-1">
          <h3 className="text-balance text-sm sm:text-base font-semibold leading-tight md:text-lg line-clamp-2">{name}</h3>
          <p className="text-pretty text-xs text-muted-foreground md:text-sm leading-snug line-clamp-2">{description}</p>
        </div>
      </div>

      {/* Hover gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-primary/0 opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  )
}
