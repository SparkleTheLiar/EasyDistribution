import type { DeliveryRoute } from '../types/route.types'

export const mockRoutes: DeliveryRoute[] = [
  {
    id: 'route-003',
    name: 'Ruta 003',
    status: 'pending',
    startedAt: '12:30',
    estimatedFinishTime: '15:40',
    stops: [
      { id: 'r003-s01', routeId: 'route-003', order: 1, position: [47.0105, 28.8638], status: 'delivered', startedAt: '12:40', estimatedFinishAt: '13:05', finishedAt: '13:15' },
      { id: 'r003-s02', routeId: 'route-003', order: 2, position: [47.0152, 28.8715], status: 'pending', startedAt: '13:20', estimatedFinishAt: '13:45' },
      { id: 'r003-s03', routeId: 'route-003', order: 3, position: [47.0196, 28.8587], status: 'refused', startedAt: '13:50', estimatedFinishAt: '14:10', finishedAt: '14:12' },
      { id: 'r003-s04', routeId: 'route-003', order: 4, position: [47.0234, 28.8791], status: 'pending', startedAt: '14:15', estimatedFinishAt: '14:35' },
      { id: 'r003-s05', routeId: 'route-003', order: 5, position: [47.0067, 28.8834], status: 'pending', startedAt: '14:40', estimatedFinishAt: '15:00' },
    ],
  },
  {
    id: 'route-002',
    name: 'Ruta 002',
    status: 'delivered',
    startedAt: '11:50',
    estimatedFinishTime: '14:20',
    completedAt: '13:55',
    stops: [
      { id: 'r002-s01', routeId: 'route-002', order: 1, position: [47.0063, 28.8508], status: 'delivered', startedAt: '12:00', estimatedFinishAt: '12:30', finishedAt: '12:40' },
      { id: 'r002-s02', routeId: 'route-002', order: 2, position: [47.0124, 28.8443], status: 'delivered', startedAt: '12:45', estimatedFinishAt: '13:00', finishedAt: '13:05' },
      { id: 'r002-s03', routeId: 'route-002', order: 3, position: [47.0178, 28.8491], status: 'delivered', startedAt: '13:10', estimatedFinishAt: '13:50', finishedAt: '13:55' },
    ],
  },
  {
    id: 'route-001',
    name: 'Ruta 001',
    status: 'refused',
    startedAt: '10:45',
    estimatedFinishTime: '16:10',
    completedAt: '11:48',
    stops: [
      { id: 'r001-s01', routeId: 'route-001', order: 1, position: [47.0252, 28.8582], status: 'refused', startedAt: '11:00', estimatedFinishAt: '11:20', finishedAt: '11:24' },
      { id: 'r001-s02', routeId: 'route-001', order: 2, position: [47.0292, 28.8676], status: 'refused', startedAt: '11:30', estimatedFinishAt: '11:45', finishedAt: '11:48' },
    ],
  },
]
