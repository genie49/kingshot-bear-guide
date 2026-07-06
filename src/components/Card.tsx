import type { CardData } from '../data/cards'
import { HEROES } from '../data/cards'

export function Card({ card, eager = false }: { card: CardData; eager?: boolean }) {
  return (
    <article className={`card card--${card.variant}`}>
      {card.badge && <span className="card__badge">{card.badge}</span>}
      {card.variant === 'cover' && (
        <div className="card__emoji" aria-hidden="true">
          🐻
        </div>
      )}
      <h2 className="card__title">{card.title}</h2>
      <div className="card__body">{card.body}</div>
      {card.variant === 'heroes' && (
        <ul className="hero-row">
          {HEROES.map((hero) => (
            <li key={hero.name} className="hero-row__item">
              <img
                src={hero.image}
                alt={hero.name}
                className="hero-row__img"
                loading={eager ? 'eager' : 'lazy'}
              />
              <strong className="hero-row__name">{hero.name}</strong>
              <span className="hero-row__hint">{hero.hint}</span>
            </li>
          ))}
        </ul>
      )}
      {card.checklist && (
        <ul className="checklist">
          {card.checklist.map((item) => (
            <li key={item}>{`✅ ${item}`}</li>
          ))}
        </ul>
      )}
      {card.image && (
        <div className="card__imagewrap">
          <img
            src={card.image}
            alt={card.imageAlt ?? card.title}
            loading={eager ? 'eager' : 'lazy'}
            className="card__image"
          />
        </div>
      )}
      {card.variant === 'cover' && (
        <p className="card__swipe-cue">옆으로 밀어서 시작 →</p>
      )}
    </article>
  )
}
