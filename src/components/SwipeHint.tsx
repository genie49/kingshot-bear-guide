import { useEffect, useState } from 'react'

export function SwipeHint({ atStart }: { atStart: boolean }) {
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (!atStart) setDismissed(true)
  }, [atStart])

  if (dismissed || !atStart) return null
  return (
    <div className="swipe-hint" aria-hidden="true">
      ←
    </div>
  )
}
