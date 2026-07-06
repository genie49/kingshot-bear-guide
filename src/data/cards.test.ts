import { describe, expect, it } from 'vitest'
import { LANGS, getCards, getHeroes } from './cards'

describe.each(LANGS)('CARDS (%s)', (lang) => {
  const cards = getCards(lang)

  it('정확히 12장이다', () => {
    expect(cards).toHaveLength(12)
  })

  it('id가 중복되지 않는다', () => {
    const ids = cards.map((c) => c.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('첫 카드는 cover, 마지막 카드는 checklist다', () => {
    expect(cards[0].variant).toBe('cover')
    expect(cards[cards.length - 1].variant).toBe('checklist')
  })

  it('screenshot/checklist 카드는 이미지를 가진다', () => {
    for (const c of cards) {
      if (c.variant === 'screenshot' || c.variant === 'checklist') {
        expect(c.image, `${c.id} 카드에 이미지 없음`).toBeTruthy()
      }
    }
  })

  it('heroes 카드는 영웅 3명을 포함한다', () => {
    const heroesCard = cards.find((c) => c.variant === 'heroes')!
    expect(heroesCard.heroes).toHaveLength(3)
  })
})

describe('언어별 카드 id 일치', () => {
  it('en과 ko의 카드 id 순서가 같다', () => {
    expect(getCards('en').map((c) => c.id)).toEqual(
      getCards('ko').map((c) => c.id),
    )
  })
})

describe('HEROES', () => {
  it('ko는 첸코·연우·아마네 3명이다', () => {
    expect(getHeroes('ko').map((h) => h.name)).toEqual(['첸코', '연우', '아마네'])
  })

  it('en은 Chenko·Yeonwoo·Amane 3명이다', () => {
    expect(getHeroes('en').map((h) => h.name)).toEqual([
      'Chenko',
      'Yeonwoo',
      'Amane',
    ])
  })
})
