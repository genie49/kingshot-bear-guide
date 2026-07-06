import { describe, expect, it } from 'vitest'
import { CARDS, HEROES } from './cards'

describe('CARDS', () => {
  it('정확히 12장이다', () => {
    expect(CARDS).toHaveLength(12)
  })

  it('id가 중복되지 않는다', () => {
    const ids = CARDS.map((c) => c.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('첫 카드는 cover, 마지막 카드는 checklist다', () => {
    expect(CARDS[0].variant).toBe('cover')
    expect(CARDS[CARDS.length - 1].variant).toBe('checklist')
  })

  it('screenshot/checklist 카드는 이미지를 가진다', () => {
    for (const c of CARDS) {
      if (c.variant === 'screenshot' || c.variant === 'checklist') {
        expect(c.image, `${c.id} 카드에 이미지 없음`).toBeTruthy()
      }
    }
  })
})

describe('HEROES', () => {
  it('첸코·연우·아마네 3명이다', () => {
    expect(HEROES.map((h) => h.name)).toEqual(['첸코', '연우', '아마네'])
  })
})
