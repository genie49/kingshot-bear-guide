import { useState } from 'react'
import { CARDS } from './data/cards'
import { Card } from './components/Card'
import { Carousel } from './components/Carousel'
import { ProgressDots } from './components/ProgressDots'
import { SwipeHint } from './components/SwipeHint'

export default function App() {
  const [index, setIndex] = useState(0)

  return (
    <div className="app">
      <Carousel onIndexChange={setIndex}>
        {CARDS.map((card, i) => (
          <div className="embla__slide" key={card.id}>
            <Card card={card} eager={i < 5} />
          </div>
        ))}
      </Carousel>
      <SwipeHint atStart={index === 0} />
      <ProgressDots count={CARDS.length} current={index} />
    </div>
  )
}
