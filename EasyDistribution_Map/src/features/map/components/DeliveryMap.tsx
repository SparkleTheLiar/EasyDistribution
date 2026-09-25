import type { JSX } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { defaultMapSettings } from '../data/mapSettings'
import { useMapAutoResize } from '../hooks/useMapAutoResize'
import type { DeliveryMapProps } from '../types/map.types'
import './DeliveryMap.css'

function MapResizeObserver(): null {
  useMapAutoResize()
  return null
}

export function DeliveryMap(props: DeliveryMapProps): JSX.Element {
  const settings = props.settings ?? defaultMapSettings

  return (
    <div className="delivery-map" aria-label="Hartă OpenStreetMap">
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
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
        />
        <MapResizeObserver />
      </MapContainer>
    </div>
  )
}
