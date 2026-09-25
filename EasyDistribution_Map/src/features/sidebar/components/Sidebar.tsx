import type { JSX } from 'react'
import type { LucideIcon } from 'lucide-react'
import { sidebarItems } from '../data/sidebarItems'
import type { SidebarItem, SidebarPageId } from '../types/sidebar.types'
import './Sidebar.css'

interface SidebarItemIconProps {
  icon: SidebarItem['icon']
}

function SidebarItemIcon(props: SidebarItemIconProps): JSX.Element {
  const IconComponent: LucideIcon = props.icon

  return <IconComponent className="sidebar__icon" aria-hidden="true" />
}

interface SidebarProps {
  className?: string
  activePageId: SidebarPageId
  onNavigate: (pageId: SidebarPageId) => void
}

export function Sidebar(props: SidebarProps): JSX.Element {
  return (
    <aside
      className={`sidebar${props.className ? ` ${props.className}` : ''}`}
      aria-label="Navigare principală"
    >
      <div className="sidebar__brand" aria-label="EasyDistribution">
        <span className="sidebar__brand-mark" aria-hidden="true">e</span>
        <span className="sidebar__brand-name">EasyDistribution</span>
      </div>

      <div className="sidebar__divider" aria-hidden="true" />

      <nav className="sidebar__navigation">
        {sidebarItems.map((item) => {
          const isActive = props.activePageId === item.pageId

          return (
            <a
              key={item.id}
              className={`sidebar__link${isActive ? ' sidebar__link--active' : ''}`}
              href={item.href}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              title={item.label}
              onClick={() => {
                props.onNavigate(item.pageId)
              }}
            >
              <SidebarItemIcon icon={item.icon} />
              <span className="sidebar__link-label">{item.label}</span>
            </a>
          )
        })}
      </nav>

    </aside>
  )
}
