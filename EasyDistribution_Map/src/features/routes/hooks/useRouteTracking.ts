import { useEffect, useRef, useState } from 'react'

import { mockRoutes } from '../data/mockRoutes'
import type { DeliveryRoute } from '../types/route.types'
import { advanceRoute } from '../utils/advanceRoute'

const ROUTE_UPDATE_INTERVAL_MS = 30_000

interface UseRouteTrackingResult {
  routes: DeliveryRoute[]
  selectedRoute: DeliveryRoute
  selectedRouteId: string
  secondsUntilNextUpdate: number
  selectRoute: (routeId: string) => void
}

export function useRouteTracking(): UseRouteTrackingResult {
  const [routes, setRoutes] = useState<DeliveryRoute[]>(mockRoutes)
  const [selectedRouteId, setSelectedRouteId] = useState<string>(mockRoutes[0].id)
  const selectedRouteIdRef = useRef<string>(selectedRouteId)
  const [nextUpdateAt, setNextUpdateAt] = useState<number>(() => Date.now() + ROUTE_UPDATE_INTERVAL_MS)
  const [currentTime, setCurrentTime] = useState<number>(() => Date.now())

  useEffect(() => {
    const updateInterval = window.setInterval(() => {
      const finishedAt = new Date().toLocaleTimeString('ro-RO', {
        hour: '2-digit',
        minute: '2-digit',
      })
      setRoutes((currentRoutes) => currentRoutes.map((route) => (
        route.id === selectedRouteIdRef.current ? advanceRoute(route, finishedAt) : route
      )))
      setNextUpdateAt(Date.now() + ROUTE_UPDATE_INTERVAL_MS)
    }, ROUTE_UPDATE_INTERVAL_MS)

    return () => window.clearInterval(updateInterval)
  }, [])

  useEffect(() => {
    const clockInterval = window.setInterval(() => setCurrentTime(Date.now()), 1_000)
    return () => window.clearInterval(clockInterval)
  }, [])

  function selectRoute(routeId: string): void {
    selectedRouteIdRef.current = routeId
    setSelectedRouteId(routeId)
  }

  const selectedRoute = routes.find((route) => route.id === selectedRouteId) ?? routes[0]
  const secondsUntilNextUpdate = Math.max(
    0,
    Math.ceil((nextUpdateAt - currentTime) / 1_000),
  )

  return { routes, selectedRoute, selectedRouteId, secondsUntilNextUpdate, selectRoute }
}
