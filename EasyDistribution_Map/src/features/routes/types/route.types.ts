export type RouteStopStatus = 'pending' | 'delivered' | 'refused'
export type DeliveryRouteStatus = 'pending' | 'delivered' | 'refused'

export interface RouteStop {
  id: string
  routeId: string
  order: number
  position: [latitude: number, longitude: number]
  status: RouteStopStatus
  startedAt: string
  estimatedFinishAt: string
  finishedAt?: string
}

export interface DeliveryRoute {
  id: string
  name: string
  status: DeliveryRouteStatus
  startedAt: string
  estimatedFinishTime: string
  completedAt?: string
  stops: RouteStop[]
}
