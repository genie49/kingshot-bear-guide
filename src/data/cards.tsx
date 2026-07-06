import type { ReactNode } from 'react'
import heroChenko from '../assets/hero-chenko.png'
import heroYeonwoo from '../assets/hero-yeonwoo.png'
import heroAmane from '../assets/hero-amane.png'
import deployWrongHero from '../assets/deploy-wrong-hero.jpg'
import deployRemoveHero from '../assets/deploy-remove-hero.jpg'
import deployEmptySlot from '../assets/deploy-empty-slot.jpg'
import selectHeroesOx from '../assets/select-heroes-ox.jpg'
import deployHalfTroops from '../assets/deploy-half-troops.jpg'
import deployEqualize from '../assets/deploy-equalize.jpg'
import mapBearRally from '../assets/map-bear-rally.jpg'
import rallyMembers from '../assets/rally-members-example.jpg'

export interface Hero {
  name: string
  image: string
  hint: string
}

export const HEROES: Hero[] = [
  { name: '첸코', image: heroChenko, hint: '보라 머리\n말 아이콘' },
  { name: '연우', image: heroYeonwoo, hint: '파란 모자\n활 아이콘' },
  { name: '아마네', image: heroAmane, hint: '검은 머리\n활 아이콘' },
]

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
}

export const CARDS: CardData[] = [
  {
    id: 'cover',
    variant: 'cover',
    title: '곰 사냥, 영웅 이렇게 고르세요',
    body: '1세대 초보 연맹원을 위한 3분 가이드',
  },
  {
    id: 'what-is-bear-hunt',
    variant: 'text',
    badge: '먼저 알아둬요',
    title: '곰 사냥이란?',
    body: (
      <>
        <p>
          연맹원들이 <strong>집결(랠리)</strong>에 모여 거대한 곰을 두들기는
          이벤트예요. 곰은 반격하지 않으니 병력이 죽을 걱정은 없어요.
        </p>
        <p>
          우리가 할 일은 하나! <strong>올바른 영웅 + 최대 병력</strong>으로
          집결에 참여하는 거예요.
        </p>
      </>
    ),
  },
  {
    id: 'first-slot-rule',
    variant: 'text',
    badge: '핵심 규칙',
    title: '첫 번째 슬롯이 전부예요',
    body: (
      <>
        <p>
          집결에 참여하면 내 영웅 3명 중 <strong>첫 번째 슬롯 한 명의
          스킬만</strong> 집결 전체에 적용돼요.
        </p>
        <p>
          나머지 두 칸은 누구를 넣어도 상관없어요. 그래서{' '}
          <strong>첫 슬롯에 누구를 넣느냐</strong>가 전부랍니다.
        </p>
      </>
    ),
  },
  {
    id: 'answer-heroes',
    variant: 'heroes',
    badge: '정답 공개',
    title: '이 셋 중 하나를 첫 슬롯에!',
    body: (
      <p>
        1세대 기준 곰 사냥 스킬을 가진 영웅은 <strong>첸코 · 연우 ·
        아마네</strong>뿐이에요. 얼굴로 기억해두세요.
      </p>
    ),
  },
  {
    id: 'wrong-example',
    variant: 'screenshot',
    badge: '이러면 안 돼요',
    title: '첫 슬롯에 아무 영웅 ❌',
    body: (
      <p>
        전투력이 높아 보여도 곰 사냥 스킬이 없는 영웅은 집결에{' '}
        <strong>아무 도움이 안 돼요.</strong>
      </p>
    ),
    image: deployWrongHero,
    imageAlt: '첫 슬롯에 잘못된 영웅이 배치된 화면에 X 표시',
  },
  {
    id: 'fix-remove',
    variant: 'screenshot',
    badge: 'STEP 1',
    title: '잘못된 영웅 빼기',
    body: (
      <p>
        영웅 카드 오른쪽 위의 <strong>주황색 ➖ 버튼</strong>을 누르면
        빠져요.
      </p>
    ),
    image: deployRemoveHero,
    imageAlt: '영웅 카드의 마이너스 버튼에 동그라미 표시',
  },
  {
    id: 'fix-add',
    variant: 'screenshot',
    badge: 'STEP 2',
    title: '첫 번째 칸 누르기',
    body: (
      <p>
        비어 있는 <strong>첫 번째 칸의 ➕</strong>를 눌러 영웅 선택 창을
        여세요. 꼭 첫 번째 칸이어야 해요!
      </p>
    ),
    image: deployEmptySlot,
    imageAlt: '비어 있는 첫 번째 영웅 슬롯의 플러스 버튼에 동그라미 표시',
  },
  {
    id: 'fix-select',
    variant: 'screenshot',
    badge: 'STEP 3',
    title: '셋 중 한 명만 고르기',
    body: (
      <p>
        첸코 · 연우 · 아마네 중 <strong>딱 한 명만</strong> 골라 첫 번째
        칸에! 셋 다 한 부대에 넣으면 안 돼요. 남은 두 명은{' '}
        <strong>다른 집결에 보낼 부대의 첫 번째 칸</strong>에 쓰세요.
      </p>
    ),
    image: selectHeroesOx,
    imageAlt: '영웅 선택 팝업에서 첸코와 연우에 동그라미, 나머지는 X 표시',
  },
  {
    id: 'equalize',
    variant: 'screenshot',
    badge: '꿀버튼',
    title: 'Equalize 한 번이면 끝',
    body: (
      <p>
        아래 <strong>저울 버튼(Equalize)</strong>을 누르면 보유 병력이 부대
        수만큼 <strong>자동으로 균등하게</strong> 나눠져요. 슬라이더를
        일일이 조절할 필요가 없어요.
      </p>
    ),
    image: deployEqualize,
    imageAlt: 'Equalize 버튼에 동그라미 표시된 배치 화면',
  },
  {
    id: 'troops-split',
    variant: 'screenshot',
    badge: '이렇게 돼요',
    title: '나눠진 병력으로 모든 집결에!',
    body: (
      <p>
        Equalize를 누른 뒤의 모습이에요. 내 병력이 부대마다{' '}
        <strong>똑같이 나눠</strong> 담겨요. 이렇게{' '}
        <strong>부대 수만큼 여러 집결에 모두 참여</strong>하는 게 고득점
        비결이에요.
      </p>
    ),
    image: deployHalfTroops,
    imageAlt: 'Equalize 후 병력이 균등 분배된 배치 화면',
  },
  {
    id: 'distance-tip',
    variant: 'screenshot',
    badge: '꿀팁',
    title: '가까운 집결에 참여해요',
    body: (
      <p>
        내 병력은 <strong>집결을 연 사람의 성</strong>에서 곰까지 걸어가요.
        곰 근처에서 열린 집결일수록 빨리 도착해서 더 많이 때릴 수 있어요.
      </p>
    ),
    image: mapBearRally,
    imageAlt: '월드맵에서 집결 리더 위치별 곰까지의 거리를 화살표로 표시',
  },
  {
    id: 'final-checklist',
    variant: 'checklist',
    badge: '마무리',
    title: '실전에서 확인!',
    body: (
      <p>
        집결 대기 화면에서 <strong>모두의 첫 영웅</strong>이 보여요.
        아래에서 <strong>Saye · uhuy는 안 좋은 예시</strong>, 나머지는{' '}
        <strong>좋은 예시</strong>예요. 이제 곰 잡으러 가요! 🐻
      </p>
    ),
    image: rallyMembers,
    imageAlt:
      '집결 멤버 목록 — Saye와 uhuy는 잘못된 첫 영웅, 나머지는 올바른 첫 영웅(동그라미 표시)',
    checklist: [
      '부대마다 첫 슬롯 = 첸코 · 연우 · 아마네 중 1명',
      'Equalize로 병력 균등 분배',
      '여러 집결에 모두 참여 + 가까운 집결 우선',
    ],
  },
]
