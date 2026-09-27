import type { DeliveryRoute } from '../types/route.types'

export function advanceRoute(route: DeliveryRoute, finishedAt: string): DeliveryRoute {
  const nextStop = [...route.stops]
    .sort((firstStop, secondStop) => firstStop.order - secondStop.order)
    .find((stop) => stop.status === 'pending')

  if (!nextStop) {
    return route
  }

  const updatedStops = route.stops.map((stop) => (
    stop.id === nextStop.id
      ? { ...stop, status: 'delivered' as const, finishedAt }
      : stop
  ))
  const hasPendingStops = updatedStops.some((stop) => stop.status === 'pending')

  return {
    ...route,
    stops: updatedStops,
    status: hasPendingStops ? 'pending' : 'delivered',
    completedAt: hasPendingStops ? route.completedAt : finishedAt,
  }
}
