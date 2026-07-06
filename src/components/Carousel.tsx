import useEmblaCarousel from 'embla-carousel-react'
import { useEffect } from 'react'
import type { ReactNode } from 'react'

export function Carousel({
  children,
  onIndexChange,
}: {
  children: ReactNode
  onIndexChange: (index: number) => void
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start' })

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => onIndexChange(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onIndexChange])

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">{children}</div>
    </div>
  )
}
