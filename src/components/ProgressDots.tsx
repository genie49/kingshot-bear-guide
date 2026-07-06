export function ProgressDots({ count, current }: { count: number; current: number }) {
  return (
    <footer className="progress">
      <div className="progress__dots" aria-hidden="true">
        {Array.from({ length: count }, (_, i) => (
          <span
            key={i}
            className={`progress__dot${i === current ? ' progress__dot--active' : ''}`}
          />
        ))}
      </div>
      <span className="progress__counter">{`${current + 1} / ${count}`}</span>
    </footer>
  )
}
