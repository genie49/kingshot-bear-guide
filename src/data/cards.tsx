import type { ReactNode } from 'react'
import { CARDS_EN, HEROES_EN } from './cards.en'
import { CARDS_KO, HEROES_KO } from './cards.ko'

export type Lang = 'en' | 'ko'

export interface Hero {
  name: string
  image: string
  hint: string
}

export type CardVariant = 'cover' | 'text' | 'heroes' | 'screenshot' | 'checklist'

export interface CardData {
  id: string
  variant: CardVariant
  badge?: string
  title: string
  body: ReactNode
  image?: string
  imageAlt?: string
  checklist?: string[]
  heroes?: Hero[]
  cue?: string
}

export const LANGS: Lang[] = ['en', 'ko']

export function getCards(lang: Lang): CardData[] {
  return lang === 'ko' ? CARDS_KO : CARDS_EN
}

export function getHeroes(lang: Lang): Hero[] {
  return lang === 'ko' ? HEROES_KO : HEROES_EN
}
