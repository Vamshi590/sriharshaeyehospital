import { Activity, Baby, Droplets, Eye, Gauge, Glasses, ScanEye, Shield, Siren, Sparkles, Stethoscope } from "lucide-react"
import type { Service } from "../data/services"

const icons = { eye: Eye, scan: ScanEye, droplets: Droplets, baby: Baby, gauge: Gauge, sparkles: Sparkles, glasses: Glasses, shield: Shield, stethoscope: Stethoscope, siren: Siren, activity: Activity }

export function ServiceIcon({ name, size = 24, className }: { name: Service["icon"]; size?: number; className?: string }) {
  const Icon = icons[name]
  return <Icon size={size} className={className} aria-hidden="true" />
}
