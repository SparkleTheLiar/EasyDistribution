import { useState } from 'react'
import type { JSX } from 'react'
import { ArrowDownRight, ArrowUpRight, ChevronRight, Clock3 } from 'lucide-react'
import type { DeliveryRoute } from '../../routes/types/route.types'
import './CurrentRoutesPanel.css'

interface CurrentRoutesPanelProps {
  routes: DeliveryRoute[]
  selectedRouteId: string
  secondsUntilNextUpdate: number
  onRouteSelect: (routeId: string) => void
}

function CurrentRoutesPanel(props: CurrentRoutesPanelProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const sortedRoutes = [...props.routes].sort((firstRoute, secondRoute) => (
    secondRoute.name.localeCompare(firstRoute.name)
  ))

  function togglePanel(): void {
    setIsOpen((currentValue) => !currentValue)
  }

  return (
    <section className="current-routes" aria-labelledby="current-routes-title">
      <header className="current-routes__header">
        <div className="current-routes__heading">
          <h2 className="current-routes__title" id="current-routes-title">Rute curente</h2>
          <span
            className="current-routes__countdown"
            role="timer"
            aria-live="off"
            aria-label={`Următoarea actualizare în ${props.secondsUntilNextUpdate} secunde`}
            title="Timp până la următoarea actualizare"
          >
            00:{String(props.secondsUntilNextUpdate).padStart(2, '0')}
          </span>
        </div>
        <button
          className="current-routes__toggle"
          type="button"
          aria-label={isOpen ? 'Restrânge rutele curente' : 'Deschide rutele curente'}
          aria-expanded={isOpen}
          aria-controls="current-routes-list"
          onClick={togglePanel}
        >
          <ChevronRight className={`current-routes__chevron${isOpen ? ' current-routes__chevron--open' : ''}`} aria-hidden="true" />
        </button>
      </header>

      <div
        className={`current-routes__content${isOpen ? ' current-routes__content--open' : ''}`}
        id="current-routes-list"
        aria-hidden={!isOpen}
      >
        <div className="current-routes__content-inner">
          <div className="current-routes__list">
            {sortedRoutes.map((route) => {
              const isSelected = route.id === props.selectedRouteId
              const deliveredStops = route.stops.filter((stop) => stop.status === 'delivered').length
              const totalStops = route.stops.length
              const routeEndTime = route.status === 'pending'
                ? route.estimatedFinishTime
                : route.completedAt ?? '—'

              return (
                <button
                  key={route.id}
                  className={`current-route${isSelected ? ' current-route--selected' : ''}`}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => props.onRouteSelect(route.id)}
                >
                  <span className="current-route__name">{route.name}</span>
                  <span
                    className="current-route__progress"
                    aria-label={`${deliveredStops} din ${totalStops} opriri livrate`}
                  >
                    {deliveredStops}
                    <span aria-hidden="true">/</span>
                    {totalStops}
                  </span>
                  <span className="current-route__details">
                    <span className="current-route__time-range">
                      <Clock3 aria-hidden="true" />
                      <span className="current-route__time-point">
                        <span className="current-route__time-label">Start</span>
                        <span>{route.startedAt}</span>
                      </span>
                      <span className="current-route__time-separator" aria-hidden="true">→</span>
                      <span className="current-route__time-point">
                        <span className="current-route__time-label">
                          {route.status === 'pending' ? 'Estimat' : 'Finalizat la'}
                        </span>
                        <span>{routeEndTime}</span>
                      </span>
                    </span>
                    {route.status === 'pending' ? (
                      <span className="current-route__status current-route__status--pending" aria-label="În desfășurare">
                        <span className="current-route__status-dot" />
                      </span>
                    ) : route.status === 'delivered' ? (
                      <span className="current-route__status current-route__status--delivered">
                        <ArrowUpRight aria-hidden="true" />
                        <span>Finalizat la {route.completedAt}</span>
                      </span>
                    ) : (
                      <span className="current-route__status current-route__status--refused" aria-label="Rută refuzată">
                        <ArrowDownRight aria-hidden="true" />
                      </span>
                    )}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export { CurrentRoutesPanel }
