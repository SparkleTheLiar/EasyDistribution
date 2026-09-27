/*
 * Ierarhia componentelor:
 * CurrentRoutesPanel
 * ├── PanelHeader
 * └── RouteList
 *     └── RouteCard (pentru fiecare rută)
 *         ├── RouteTimeRange
 *         └── RouteStatus
 */
import { useState } from 'react'
import type { JSX } from 'react'
import { ArrowDownRight, ArrowUpRight, ChevronRight, Clock3 } from 'lucide-react'

import type { DeliveryRoute } from '../types/route.types'
import './CurrentRoutesPanel.css'

interface RouteTimeRangeProps {
  route: DeliveryRoute
}

function RouteTimeRange(props: RouteTimeRangeProps): JSX.Element {
  const isPending = props.route.status === 'pending'
  const finishLabel = isPending ? 'Estimat' : 'Finalizat la'
  const finishTime = isPending
    ? props.route.estimatedFinishTime
    : props.route.completedAt ?? '—'

  return (
    <span className="current-route__time-range">
      <Clock3 />
      <span className="current-route__time-point">
        <span className="current-route__time-label">Start</span>
        <span>{props.route.startedAt}</span>
      </span>
      <span className="current-route__time-separator">→</span>
      <span className="current-route__time-point">
        <span className="current-route__time-label">{finishLabel}</span>
        <span>{finishTime}</span>
      </span>
    </span>
  )
}

interface RouteStatusProps {
  route: DeliveryRoute
}

function RouteStatus(props: RouteStatusProps): JSX.Element {
  switch (props.route.status) {
    case 'pending':
      return (
        <span className="current-route__status current-route__status--pending">
          <span className="current-route__status-dot" />
        </span>
      )
    case 'delivered':
      return (
        <span className="current-route__status current-route__status--delivered">
          <ArrowUpRight />
          <span>Finalizat la {props.route.completedAt ?? '—'}</span>
        </span>
      )
    case 'refused':
      return (
        <span className="current-route__status current-route__status--refused">
          <ArrowDownRight />
        </span>
      )
  }
}

interface RouteCardProps {
  route: DeliveryRoute
  isSelected: boolean
  onSelect: (routeId: string) => void
}

function RouteCard(props: RouteCardProps): JSX.Element {
  const deliveredStops = props.route.stops.filter((stop) => stop.status === 'delivered').length
  const totalStops = props.route.stops.length

  return (
    <button
      className={`current-route${props.isSelected ? ' current-route--selected' : ''}`}
      type="button"
      onClick={() => props.onSelect(props.route.id)}
    >
      <span className="current-route__name">{props.route.name}</span>
      <span
        className="current-route__progress"
      >
        {deliveredStops}<span>/</span>{totalStops}
      </span>
      <span className="current-route__details">
        <RouteTimeRange route={props.route} />
        <RouteStatus route={props.route} />
      </span>
    </button>
  )
}

interface RouteListProps {
  routes: DeliveryRoute[]
  selectedRouteId: string
  onRouteSelect: (routeId: string) => void
}

function RouteList(props: RouteListProps): JSX.Element {
  const sortedRoutes = [...props.routes].sort((firstRoute, secondRoute) => (
    secondRoute.name.localeCompare(firstRoute.name)
  ))

  return (
    <div className="current-routes__list">
      {sortedRoutes.map((route) => (
        <RouteCard
          key={route.id}
          route={route}
          isSelected={route.id === props.selectedRouteId}
          onSelect={props.onRouteSelect}
        />
      ))}
    </div>
  )
}

interface PanelHeaderProps {
  isOpen: boolean
  secondsUntilNextUpdate: number
  onToggle: () => void
}

function PanelHeader(props: PanelHeaderProps): JSX.Element {
  const countdown = `00:${String(props.secondsUntilNextUpdate).padStart(2, '0')}`

  return (
    <header className="current-routes__header">
      <div className="current-routes__heading">
        <h2 className="current-routes__title">Rute curente</h2>
        <span
          className="current-routes__countdown"
          role="timer"
          title="Timp până la următoarea actualizare"
        >
          {countdown}
        </span>
      </div>
      <button
        className="current-routes__toggle"
        type="button"
        onClick={props.onToggle}
      >
        <ChevronRight
          className={`current-routes__chevron${props.isOpen ? ' current-routes__chevron--open' : ''}`}
        />
      </button>
    </header>
  )
}

interface CurrentRoutesPanelProps {
  routes: DeliveryRoute[]
  selectedRouteId: string
  secondsUntilNextUpdate: number
  onRouteSelect: (routeId: string) => void
}

function CurrentRoutesPanel(props: CurrentRoutesPanelProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(true)

  function togglePanel(): void {
    setIsOpen((currentValue) => !currentValue)
  }

  return (
    <section className="current-routes">
      <PanelHeader
        isOpen={isOpen}
        secondsUntilNextUpdate={props.secondsUntilNextUpdate}
        onToggle={togglePanel}
      />
      <div
        className={`current-routes__content${isOpen ? ' current-routes__content--open' : ''}`}
      >
        <div className="current-routes__content-inner">
          <RouteList
            routes={props.routes}
            selectedRouteId={props.selectedRouteId}
            onRouteSelect={props.onRouteSelect}
          />
        </div>
      </div>
    </section>
  )
}

export { CurrentRoutesPanel }
