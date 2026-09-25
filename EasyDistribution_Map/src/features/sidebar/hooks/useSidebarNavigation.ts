import { useState } from 'react'


interface UseSidebarNavigationProps {
  initialActiveItemId: string
}

interface UseSidebarNavigationResult {
  activeItemId: string
  setActiveItem: (itemId: string) => void
}

export function useSidebarNavigation(
  props: UseSidebarNavigationProps,
): UseSidebarNavigationResult {
  const [activeItemId, setActiveItemId] = useState<string>(props.initialActiveItemId)

  function setActiveItem(itemId: string): void {
    setActiveItemId(itemId)
  }

  return { activeItemId, setActiveItem }
}
