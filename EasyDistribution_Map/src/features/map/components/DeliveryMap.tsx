import type { JSX } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import { CurrentRoutesPanel } from '../../routes/components/CurrentRoutesPanel'
import { RouteStopsLayer } from '../../routes/components/RouteStopsLayer'
import { useRouteTracking } from '../../routes/hooks/useRouteTracking'
import { defaultMapSettings } from '../data/mapSettings'
import { useMapAutoResize } from '../hooks/useMapAutoResize'
import type { MapViewSettings } from '../types/map.types'
import './DeliveryMap.css'


function MapResizeObserver(): null {
  useMapAutoResize()
  return null
}

interface DeliveryMapProps {
  settings?: MapViewSettings
}

export function DeliveryMap(props: DeliveryMapProps): JSX.Element {
  const settings = props.settings ?? defaultMapSettings
  const routeTracking = useRouteTracking()

  return (
    <div className="delivery-map">
      <MapContainer
        className="delivery-map__canvas"
        center={settings.center}
        zoom={settings.zoom}
        scrollWheelZoom
        dragging
        doubleClickZoom
        keyboard
        zoomControl
      >
        <RouteStopsLayer route={routeTracking.selectedRoute} />
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
        />
        <MapResizeObserver />
      </MapContainer>
      <CurrentRoutesPanel
        routes={routeTracking.routes}
        selectedRouteId={routeTracking.selectedRouteId}
        secondsUntilNextUpdate={routeTracking.secondsUntilNextUpdate}
        onRouteSelect={routeTracking.selectRoute}
      />
    </div>
  )
}
