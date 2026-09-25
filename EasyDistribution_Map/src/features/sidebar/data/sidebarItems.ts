import { Map, UserRound } from 'lucide-react'
import type { SidebarItem } from '../types/sidebar.types'

export const sidebarItems: SidebarItem[] = [
  {
    id: 'home',
    label: 'Pagina principală',
    icon: UserRound,
    href: '#home',
    pageId: 'home',
  },
  {
    id: 'map',
    label: 'Hartă',
    icon: Map,
    href: '#map',
    pageId: 'map',
  },
]
