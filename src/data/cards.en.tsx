import type { CardData, Hero } from './cards'
import {
  heroChenko,
  heroYeonwoo,
  heroAmane,
  deployWrongHero,
  deployRemoveHero,
  deployEmptySlot,
  selectHeroesOx,
  deployHalfTroops,
  deployEqualize,
  mapBearRally,
  rallyMembers,
} from './images'

export const HEROES_EN: Hero[] = [
  { name: 'Chenko', image: heroChenko, hint: 'Purple hair\nHorse icon' },
  { name: 'Yeonwoo', image: heroYeonwoo, hint: 'Blue hat\nBow icon' },
  { name: 'Amane', image: heroAmane, hint: 'Dark hair\nBow icon' },
]

export const CARDS_EN: CardData[] = [
  {
    id: 'cover',
    variant: 'cover',
    title: 'Bear Hunt: Pick the Right Heroes',
    body: 'A 3-minute guide for Gen-1 alliance beginners',
    cue: 'Swipe to start →',
  },
  {
    id: 'what-is-bear-hunt',
    variant: 'text',
    badge: 'The basics',
    title: 'What is Bear Hunt?',
    body: (
      <>
        <p>
          Alliance members gather in <strong>rallies</strong> to beat up a
          giant bear. The bear never fights back, so your troops can&apos;t
          die.
        </p>
        <p>
          Your only job: join rallies with the{' '}
          <strong>right hero + as many troops as possible</strong>.
        </p>
      </>
    ),
  },
  {
    id: 'first-slot-rule',
    variant: 'text',
    badge: 'The one rule',
    title: 'Only the first slot counts',
    body: (
      <>
        <p>
          When you join a rally, only the skill of the hero in your{' '}
          <strong>first slot</strong> applies to the whole rally.
        </p>
        <p>
          The other two slots don&apos;t matter. So{' '}
          <strong>who goes first</strong> is everything.
        </p>
      </>
    ),
  },
  {
    id: 'answer-heroes',
    variant: 'heroes',
    badge: 'The answer',
    title: 'Put one of these three first!',
    body: (
      <p>
        In Gen 1, only <strong>Chenko · Yeonwoo · Amane</strong> have Bear
        Hunt skills. Remember their faces.
      </p>
    ),
    heroes: HEROES_EN,
  },
  {
    id: 'wrong-example',
    variant: 'screenshot',
    badge: "Don't do this",
    title: 'Random hero in slot 1 ❌',
    body: (
      <p>
        Even a high-power hero is <strong>useless to the rally</strong>{' '}
        without a Bear Hunt skill.
      </p>
    ),
    image: deployWrongHero,
    imageAlt: 'Deploy screen with a wrong hero in the first slot, marked with an X',
  },
  {
    id: 'fix-remove',
    variant: 'screenshot',
    badge: 'STEP 1',
    title: 'Remove the wrong hero',
    body: (
      <p>
        Tap the <strong>orange ➖ button</strong> at the top right of the
        hero card.
      </p>
    ),
    image: deployRemoveHero,
    imageAlt: 'Minus button on the hero card circled',
  },
  {
    id: 'fix-add',
    variant: 'screenshot',
    badge: 'STEP 2',
    title: 'Tap the first slot',
    body: (
      <p>
        Tap the <strong>➕ on the empty first slot</strong> to open hero
        selection. It must be the first slot!
      </p>
    ),
    image: deployEmptySlot,
    imageAlt: 'Plus button on the empty first hero slot circled',
  },
  {
    id: 'fix-select',
    variant: 'screenshot',
    badge: 'STEP 3',
    title: 'Pick just ONE of the three',
    body: (
      <p>
        Pick <strong>only one</strong> of Chenko · Yeonwoo · Amane for the
        first slot. Don&apos;t put all three in one march! Save the other two
        for the <strong>first slot of your other marches</strong>.
      </p>
    ),
    image: selectHeroesOx,
    imageAlt: 'Hero selection popup with Chenko and Yeonwoo circled, others crossed out',
  },
  {
    id: 'equalize',
    variant: 'screenshot',
    badge: 'Magic button',
    title: 'One tap: Equalize',
    body: (
      <p>
        Tap the <strong>scale button (Equalize)</strong> at the bottom and
        your troops are <strong>split evenly</strong> across your march
        queues. No slider fiddling needed.
      </p>
    ),
    image: deployEqualize,
    imageAlt: 'Deploy screen with the Equalize button circled',
  },
  {
    id: 'troops-split',
    variant: 'screenshot',
    badge: 'What you get',
    title: 'Split troops, join every rally!',
    body: (
      <p>
        This is what it looks like after Equalize: every march gets an{' '}
        <strong>equal share</strong> of your troops. Joining{' '}
        <strong>as many rallies as you have march queues</strong> is the key
        to a high score.
      </p>
    ),
    image: deployHalfTroops,
    imageAlt: 'Deploy screen with troops split evenly after Equalize',
  },
  {
    id: 'distance-tip',
    variant: 'screenshot',
    badge: 'Pro tip',
    title: 'Join nearby rallies',
    body: (
      <p>
        Your troops walk from the <strong>rally leader&apos;s city</strong>{' '}
        to the bear. The closer the rally opened to the bear, the sooner you
        arrive — and the more you hit.
      </p>
    ),
    image: mapBearRally,
    imageAlt: 'World map showing march distances from rally leaders to the bear',
  },
  {
    id: 'final-checklist',
    variant: 'checklist',
    badge: 'Wrap-up',
    title: 'Check it in action!',
    body: (
      <p>
        On the rally screen you can see <strong>everyone&apos;s first
        hero</strong>. Below, <strong>Saye · uhuy are bad examples</strong> —
        the rest are good. Now go get that bear! 🐻
      </p>
    ),
    image: rallyMembers,
    imageAlt:
      'Rally member list — Saye and uhuy have wrong first heroes, the rest are correct (circled)',
    checklist: [
      'First slot = one of Chenko · Yeonwoo · Amane per march',
      'Equalize to split troops evenly',
      'Join every rally + prefer nearby ones',
    ],
  },
]
