import { useState } from 'react'
import type { SidebarPageId } from '../types/sidebar.types'


interface UseSidebarNavigationProps {
  initialActiveItemId: SidebarPageId
}

interface UseSidebarNavigationResult {
  activeItemId: SidebarPageId
  setActiveItem: (itemId: SidebarPageId) => void
}

export function useSidebarNavigation(
  props: UseSidebarNavigationProps,
): UseSidebarNavigationResult {
  const [activeItemId, setActiveItemId] = useState<SidebarPageId>(props.initialActiveItemId)

  function setActiveItem(itemId: SidebarPageId): void {
    setActiveItemId(itemId)
  }

  return { activeItemId, setActiveItem }
}
