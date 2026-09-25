import { useEffect } from 'react'
import { useMap } from 'react-leaflet'

export function useMapAutoResize(): void {
  const map = useMap()

  useEffect(() => {
    const mapContainer = map.getContainer()
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize({ pan: false, debounceMoveend: true })
    })

    resizeObserver.observe(mapContainer)

    return () => resizeObserver.disconnect()
  }, [map])
}
