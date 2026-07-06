import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card } from './Card'
import { getCards } from '../data/cards'

describe('Card', () => {
  it('heroes 카드(ko)에 세 영웅 이름이 보인다', () => {
    const heroesCard = getCards('ko').find((c) => c.variant === 'heroes')!
    render(<Card card={heroesCard} />)
    expect(screen.getByText('첸코')).toBeTruthy()
    expect(screen.getByText('연우')).toBeTruthy()
    expect(screen.getByText('아마네')).toBeTruthy()
  })

  it('heroes 카드(en)에 영어 영웅 이름이 보인다', () => {
    const heroesCard = getCards('en').find((c) => c.variant === 'heroes')!
    render(<Card card={heroesCard} />)
    expect(screen.getByText('Chenko')).toBeTruthy()
    expect(screen.getByText('Yeonwoo')).toBeTruthy()
    expect(screen.getByText('Amane')).toBeTruthy()
  })

  it('checklist 카드에 체크 항목이 모두 보인다', () => {
    const checklistCard = getCards('ko').find((c) => c.variant === 'checklist')!
    render(<Card card={checklistCard} />)
    for (const item of checklistCard.checklist!) {
      expect(screen.getByText(`✅ ${item}`)).toBeTruthy()
    }
  })

  it('screenshot 카드는 badge와 이미지를 렌더링한다', () => {
    const shot = getCards('ko').find((c) => c.id === 'fix-remove')!
    render(<Card card={shot} />)
    expect(screen.getByText('STEP 1')).toBeTruthy()
    expect(screen.getByAltText(shot.imageAlt!)).toBeTruthy()
  })

  it('cover 카드는 cue 문구를 렌더링한다', () => {
    const cover = getCards('en')[0]
    render(<Card card={cover} />)
    expect(screen.getByText(cover.cue!)).toBeTruthy()
  })
})
