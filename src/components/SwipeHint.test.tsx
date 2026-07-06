import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { SwipeHint } from './SwipeHint'

describe('SwipeHint', () => {
  it('시작 카드에서는 힌트가 보인다', () => {
    const { container } = render(<SwipeHint atStart={true} />)
    expect(container.querySelector('.swipe-hint')).toBeTruthy()
  })

  it('한 번 벗어나면 다시 돌아와도 영구히 숨겨진다', () => {
    const { container, rerender } = render(<SwipeHint atStart={true} />)
    rerender(<SwipeHint atStart={false} />)
    expect(container.querySelector('.swipe-hint')).toBeNull()
    rerender(<SwipeHint atStart={true} />)
    expect(container.querySelector('.swipe-hint')).toBeNull()
  })
})
