import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card } from './Card'
import { CARDS } from '../data/cards'

describe('Card', () => {
  it('heroes 카드에 세 영웅 이름이 보인다', () => {
    const heroesCard = CARDS.find((c) => c.variant === 'heroes')!
    render(<Card card={heroesCard} />)
    expect(screen.getByText('첸코')).toBeTruthy()
    expect(screen.getByText('연우')).toBeTruthy()
    expect(screen.getByText('아마네')).toBeTruthy()
  })

  it('checklist 카드에 체크 항목이 모두 보인다', () => {
    const checklistCard = CARDS.find((c) => c.variant === 'checklist')!
    render(<Card card={checklistCard} />)
    for (const item of checklistCard.checklist!) {
      expect(screen.getByText(`✅ ${item}`)).toBeTruthy()
    }
  })

  it('screenshot 카드는 badge와 이미지를 렌더링한다', () => {
    const shot = CARDS.find((c) => c.id === 'fix-remove')!
    render(<Card card={shot} />)
    expect(screen.getByText('STEP 1')).toBeTruthy()
    expect(screen.getByAltText(shot.imageAlt!)).toBeTruthy()
  })
})
