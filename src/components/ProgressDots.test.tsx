import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProgressDots } from './ProgressDots'

describe('ProgressDots', () => {
  it('현재 위치 카운터를 1-기준으로 표시한다', () => {
    render(<ProgressDots count={12} current={2} />)
    expect(screen.getByText('3 / 12')).toBeTruthy()
  })

  it('도트를 count개 렌더링하고 현재 도트에 active 클래스를 준다', () => {
    const { container } = render(<ProgressDots count={12} current={2} />)
    const dots = container.querySelectorAll('.progress__dot')
    expect(dots).toHaveLength(12)
    expect(dots[2].className).toContain('progress__dot--active')
  })
})
