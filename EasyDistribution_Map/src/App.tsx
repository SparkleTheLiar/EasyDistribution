import { useState } from 'react'
import type { JSX } from 'react'
import { DeliveryMap } from './features/map/components/DeliveryMap'
import { Sidebar } from './features/sidebar/components/Sidebar'
import { useSidebarNavigation } from './features/sidebar/hooks/useSidebarNavigation'
import type { SidebarPageId } from './features/sidebar/types/sidebar.types'
import './App.css'

interface AppProps {
  serviceName?: string
}

function App(props: AppProps): JSX.Element {
  const serviceName = props.serviceName ?? 'EasyDistribution'
  const navigation = useSidebarNavigation({ initialActiveItemId: 'home' })

  function navigateToPage(pageId: SidebarPageId): void {
    navigation.setActiveItem(pageId)
  }

  return (
    <div className="app-shell" id="home">
      <Sidebar activePageId={navigation.activeItemId} onNavigate={navigateToPage} />
      {navigation.activeItemId === 'map' ? (
        <main className="map-page" id="map" aria-label="Hartă interactivă">
          <DeliveryMap />
        </main>
      ) : (
        <main className="home-page" aria-label="Pagina principală EasyDistribution">
          <h1 className="home-page__title">{serviceName}</h1>
        </main>
      )}
    </div>
  )
}

export default App
