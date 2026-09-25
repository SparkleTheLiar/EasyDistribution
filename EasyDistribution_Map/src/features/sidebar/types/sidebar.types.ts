import type { LucideIcon } from 'lucide-react'

export type SidebarPageId = 'home' | 'map'

export interface SidebarItem {
  id: string
  label: string
  icon: LucideIcon
  href: string
  pageId: SidebarPageId
}
