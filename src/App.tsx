import { useState } from 'react'
import type { Lang } from './data/cards'
import { getCards } from './data/cards'
import { Card } from './components/Card'
import { Carousel } from './components/Carousel'
import { ProgressDots } from './components/ProgressDots'
import { SwipeHint } from './components/SwipeHint'

export default function App() {
  const [index, setIndex] = useState(0)
  const [lang, setLang] = useState<Lang>('en')
  const cards = getCards(lang)

  return (
    <div className="app">
      <div className="lang-toggle" role="group" aria-label="Language">
        <button
          type="button"
          className={`lang-toggle__btn${lang === 'en' ? ' lang-toggle__btn--active' : ''}`}
          onClick={() => setLang('en')}
        >
          EN
        </button>
        <button
          type="button"
          className={`lang-toggle__btn${lang === 'ko' ? ' lang-toggle__btn--active' : ''}`}
          onClick={() => setLang('ko')}
        >
          한국어
        </button>
      </div>
      <Carousel onIndexChange={setIndex}>
        {cards.map((card, i) => (
          <div className="embla__slide" key={card.id}>
            <Card card={card} eager={i < 5} />
          </div>
        ))}
      </Carousel>
      <SwipeHint atStart={index === 0} />
      <ProgressDots count={cards.length} current={index} />
    </div>
  )
}
