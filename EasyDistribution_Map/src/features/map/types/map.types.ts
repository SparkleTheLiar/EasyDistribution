export interface MapViewSettings {
  center: [latitude: number, longitude: number]
  zoom: number
}

export interface DeliveryMapProps {
  settings?: MapViewSettings
}
