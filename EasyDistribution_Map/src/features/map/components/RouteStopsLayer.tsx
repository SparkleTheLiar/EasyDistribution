import { divIcon } from 'leaflet'
import type { DivIcon } from 'leaflet'
import { memo } from 'react'
import type { JSX } from 'react'
import { Marker, Popup } from 'react-leaflet'
import type { DeliveryRoute, RouteStop } from '../../routes/types/route.types'
import './RouteStopMarker.css'

type RouteStopVisualStatus = 'current' | 'visited' | 'refused' | 'upcoming'

interface RouteStopMarkerProps {
  route: DeliveryRoute
  stop: RouteStop
  visualStatus: RouteStopVisualStatus
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function createRouteStopIcon(props: RouteStopMarkerProps): DivIcon {
  const routeName = escapeHtml(props.route.name)
  const className = `route-stop-marker route-stop-marker--${props.visualStatus}`
  const html = `
    <div class="${className}">
      <span class="route-stop-marker__route">${routeName}</span>
      <span class="route-stop-marker__pin">
        <span class="route-stop-marker__number">${props.stop.order}</span>
      </span>
    </div>
  `

  return divIcon({
    className: 'route-stop-leaflet-icon',
    html,
    iconSize: [140, 72],
    iconAnchor: [70, 67],
  })
}

interface RouteStopDetailsProps {
  route: DeliveryRoute
  stop: RouteStop
}

function RouteStopDetails(props: RouteStopDetailsProps): JSX.Element {
  const isPending = props.stop.status === 'pending'
  const statusLabel = {
    pending: 'De livrat',
    delivered: 'Livrat',
    refused: 'Refuzat',
  }[props.stop.status]
  const finishLabel = isPending ? 'Final estimat' : 'Finalizat la'
  const finishTime = isPending
    ? props.stop.estimatedFinishAt
    : props.stop.finishedAt ?? '—'

  return (
    <section className={`route-stop-details route-stop-details--${props.stop.status}`}>
      <h3 className="route-stop-details__title">
        {props.route.name} · Oprirea {props.stop.order}
      </h3>
      <div className="route-stop-details__row">
        <span>Început</span>
        <time>{props.stop.startedAt}</time>
      </div>
      <div className="route-stop-details__row">
        <span>{finishLabel}</span>
        <time>{finishTime}</time>
      </div>
      <div className="route-stop-details__row route-stop-details__row--status">
        <span>Status</span>
        <strong>{statusLabel}</strong>
      </div>
    </section>
  )
}

interface RouteStopsLayerProps {
  route: DeliveryRoute
}

export const RouteStopsLayer = memo(function RouteStopsLayer(props: RouteStopsLayerProps): JSX.Element {
  const sortedStops = [...props.route.stops].sort((firstStop, secondStop) => firstStop.order - secondStop.order)
  const currentStop = sortedStops.find((stop) => stop.status === 'pending')
  const isRouteComplete = currentStop === undefined

  return (
    <>
      {sortedStops.map((stop) => {
        let visualStatus: RouteStopVisualStatus = 'upcoming'

        if (stop.status === 'refused') {
          visualStatus = 'refused'
        } else if (stop.status === 'delivered') {
          visualStatus = 'visited'
        } else if (stop.id === currentStop?.id) {
          visualStatus = 'current'
        }

        const markerProps: RouteStopMarkerProps = {
          route: props.route,
          stop,
          visualStatus,
        }

        return (
          <Marker
            key={stop.id}
            position={stop.position}
            icon={createRouteStopIcon(markerProps)}
            opacity={isRouteComplete ? 0.48 : 1}
            zIndexOffset={visualStatus === 'current' ? 1000 : stop.order}
            title={`${props.route.name} — oprirea ${stop.order}`}
            riseOnHover
            riseOffset={1000}
          >
            <Popup className="route-stop-popup" offset={[0, 140]}>
              <RouteStopDetails route={props.route} stop={stop} />
            </Popup>
          </Marker>
        )
      })}
    </>
  )
})
