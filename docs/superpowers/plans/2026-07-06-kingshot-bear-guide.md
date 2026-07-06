# 킹샷 곰 사냥 초보자 가이드 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 킹샷 초보 연맹원이 곰 사냥 집결에 올바른 영웅(첸코·연우·아마네)과 최대 병력으로 참여하도록 안내하는 모바일 전용 스와이프 카드뉴스 웹사이트.

**Architecture:** Vite + React SPA. 카드 12장의 콘텐츠는 `src/data/cards.tsx`에 데이터로 정의하고, `Card` 컴포넌트가 variant별로 렌더링. `embla-carousel-react`로 좌우 스와이프, App이 현재 인덱스를 들고 진행 도트/스와이프 힌트를 제어.

**Tech Stack:** Vite 6, React 19, TypeScript, embla-carousel-react 8, vitest + @testing-library/react (단위 테스트), sips (이미지 최적화, macOS 내장)

## Global Constraints

- 모바일 전용: 앱 컨테이너 `max-width: 480px`, `height: 100dvh`, 데스크톱에선 중앙 정렬
- 런타임 의존성은 `react`, `react-dom`, `embla-carousel-react` 3개만
- 카드는 정확히 12장, 카피는 모두 한국어, 초보자용 짧은 문장
- 언급 가능한 영웅은 1세대 첸코·연우·아마네뿐 (보상 얘기 금지)
- 스크린샷 이미지는 각 250KB 이하로 최적화 (`--resampleWidth 720`, jpeg 품질 70)
- 원본 이미지는 `raw-assets/`(git 추적됨), 최적화본은 `src/assets/`
- 모든 커밋 메시지 끝에 `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>` 포함
- 작업 디렉토리: `/Users/genie/workspace/kingshot-bear` (git 원격: github.com/genie49/kingshot-bear-guide)

---

### Task 1: 프로젝트 스캐폴딩 + 툴체인

`npm create vite`는 비어있지 않은 디렉토리에서 인터랙티브 프롬프트를 띄우므로 설정 파일을 직접 작성한다.

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `.gitignore`
- Create: `src/main.tsx`, `src/App.tsx` (플레이스홀더), `src/index.css` (최소 리셋)

**Interfaces:**
- Produces: `npm run dev / build / preview / test` 스크립트, `src/main.tsx`가 `App` 기본 내보내기를 마운트

- [ ] **Step 1: 설정 파일 작성**

`package.json`:

```json
{
  "name": "kingshot-bear-guide",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview",
    "test": "vitest run"
  },
  "dependencies": {
    "embla-carousel-react": "^8.6.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  },
  "devDependencies": {
    "@testing-library/react": "^16.3.0",
    "@types/react": "^19.1.8",
    "@types/react-dom": "^19.1.6",
    "@vitejs/plugin-react": "^4.5.2",
    "jsdom": "^26.1.0",
    "typescript": "~5.8.3",
    "vitest": "^3.2.4"
  }
}
```

`vite.config.ts`:

```ts
/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
})
```

`tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "types": ["vite/client"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

`index.html`:

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="theme-color" content="#17100a" />
    <meta property="og:title" content="곰 사냥, 영웅 이렇게 고르세요" />
    <meta property="og:description" content="1세대 초보 연맹원을 위한 곰 사냥 집결 가이드" />
    <title>🐻 곰 사냥 영웅 가이드</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

`.gitignore`:

```
node_modules
dist
*.local
.DS_Store
```

`src/main.tsx`:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

`src/App.tsx` (플레이스홀더 — Task 5에서 교체):

```tsx
export default function App() {
  return <h1>kingshot bear guide</h1>
}
```

`src/index.css` (최소 리셋 — Task 5에서 전체 교체):

```css
* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: #0b0805; color: #f5ead7; }
```

- [ ] **Step 2: 의존성 설치**

Run: `cd /Users/genie/workspace/kingshot-bear && npm install`
Expected: 에러 없이 완료, `package-lock.json` 생성

- [ ] **Step 3: 빌드 스모크 테스트**

Run: `npm run build`
Expected: `dist/` 생성, "✓ built in ..." 출력

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json vite.config.ts tsconfig.json index.html .gitignore src/
git commit -m "chore: Vite + React + TS 프로젝트 스캐폴딩

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 2: 이미지 최적화

**Files:**
- Create: `src/assets/*.jpg` (스크린샷 8장, 720px 리사이즈), `src/assets/*.png` (영웅 초상화 3장, 원본 복사)

**Interfaces:**
- Produces: Task 3의 `cards.tsx`가 import할 파일명 — `hero-chenko.png`, `hero-yeonwoo.png`, `hero-amane.png`, `deploy-wrong-hero.jpg`, `deploy-remove-hero.jpg`, `deploy-empty-slot.jpg`, `select-heroes-ox.jpg`, `deploy-half-troops.jpg`, `deploy-equalize.jpg`, `map-bear-rally.jpg`, `rally-members-example.jpg`

- [ ] **Step 1: sips로 리사이즈·압축**

```bash
cd /Users/genie/workspace/kingshot-bear
mkdir -p src/assets
for f in raw-assets/*.jpeg; do
  base=$(basename "$f" .jpeg)
  sips --resampleWidth 720 -s format jpeg -s formatOptions 70 "$f" --out "src/assets/${base}.jpg"
done
cp raw-assets/hero-chenko.png raw-assets/hero-yeonwoo.png raw-assets/hero-amane.png src/assets/
```

- [ ] **Step 2: 용량 검증**

Run: `du -h src/assets/* | sort -h`
Expected: jpg 각 250KB 이하 (원본 1~2MB → 대략 60~180KB). 250KB 초과 파일이 있으면 해당 파일만 `-s formatOptions 60`으로 재실행

- [ ] **Step 3: Commit**

```bash
git add src/assets
git commit -m "assets: 가이드 이미지 11장 최적화 추가 (720px, q70)

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 3: 카드 데이터 (`cards.tsx`) — TDD

**Files:**
- Create: `src/data/cards.tsx`
- Test: `src/data/cards.test.ts`

**Interfaces:**
- Consumes: Task 2의 `src/assets/` 이미지 파일들
- Produces:
  - `interface Hero { name: string; image: string; hint: string }`
  - `const HEROES: Hero[]` — 첸코·연우·아마네 순서 고정
  - `type CardVariant = 'cover' | 'text' | 'heroes' | 'screenshot' | 'checklist'`
  - `interface CardData { id: string; variant: CardVariant; badge?: string; title: string; body: ReactNode; image?: string; imageAlt?: string; checklist?: string[] }`
  - `const CARDS: CardData[]` — 12장

- [ ] **Step 1: 실패하는 테스트 작성**

`src/data/cards.test.ts`:

```ts
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
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npx vitest run src/data/cards.test.ts`
Expected: FAIL — "Failed to resolve import ./cards"

- [ ] **Step 3: `cards.tsx` 구현**

`src/data/cards.tsx`:

```tsx
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
    title: '셋 중 하나만 고르기',
    body: (
      <p>
        <strong>첸코 · 연우 · 아마네</strong>만 선택! 나머지 영웅은 모두
        ❌예요.
      </p>
    ),
    image: selectHeroesOx,
    imageAlt: '영웅 선택 팝업에서 첸코와 연우에 동그라미, 나머지는 X 표시',
  },
  {
    id: 'troops-matter',
    variant: 'screenshot',
    badge: '한 가지 더',
    title: '병력은 최대한 많이',
    body: (
      <p>
        슬라이더를 대충 두면 <strong>1,053명</strong>만 가요. 병력이
        많을수록 곰을 더 세게 때릴 수 있어요.
      </p>
    ),
    image: deployHalfTroops,
    imageAlt: '병력이 절반만 채워진 배치 화면',
  },
  {
    id: 'equalize',
    variant: 'screenshot',
    badge: '꿀버튼',
    title: 'Equalize 한 번이면 끝',
    body: (
      <p>
        아래 <strong>저울 버튼(Equalize)</strong>은 보유 병력을 부대 수만큼
        자동으로 균등하게 나눠줘요. 한 번에 <strong>3,141명!</strong> 모든
        집결에 편하게 최대 병력을 보낼 수 있어요.
      </p>
    ),
    image: deployEqualize,
    imageAlt: 'Equalize 버튼에 동그라미, 병력이 가득 찬 배치 화면',
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
        집결 대기 화면에서 <strong>모두의 첫 영웅</strong>이 보여요. 이제
        곰 잡으러 가요! 🐻
      </p>
    ),
    image: rallyMembers,
    imageAlt: '집결 멤버 목록에서 올바른 첫 영웅에 동그라미 표시',
    checklist: [
      '첫 슬롯 = 첸코 · 연우 · 아마네',
      'Equalize로 병력 꽉 채우기',
      '곰에서 가까운 집결 참여',
    ],
  },
]
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `npx vitest run src/data/cards.test.ts`
Expected: PASS (5 tests)

- [ ] **Step 5: Commit**

```bash
git add src/data
git commit -m "feat: 카드뉴스 12장 콘텐츠 데이터 정의

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 4: Card 컴포넌트 — TDD

**Files:**
- Create: `src/components/Card.tsx`
- Test: `src/components/Card.test.tsx`

**Interfaces:**
- Consumes: `CardData`, `HEROES` (Task 3)
- Produces: `function Card({ card, eager }: { card: CardData; eager?: boolean }): JSX` — named export. `eager`가 true면 이미지 `loading="eager"`, 아니면 `"lazy"`

- [ ] **Step 1: 실패하는 테스트 작성**

`src/components/Card.test.tsx`:

```tsx
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
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npx vitest run src/components/Card.test.tsx`
Expected: FAIL — "Failed to resolve import ./Card"

- [ ] **Step 3: `Card.tsx` 구현**

`src/components/Card.tsx`:

```tsx
import type { CardData } from '../data/cards'
import { HEROES } from '../data/cards'

export function Card({ card, eager = false }: { card: CardData; eager?: boolean }) {
  return (
    <article className={`card card--${card.variant}`}>
      {card.badge && <span className="card__badge">{card.badge}</span>}
      {card.variant === 'cover' && (
        <div className="card__emoji" aria-hidden="true">
          🐻
        </div>
      )}
      <h2 className="card__title">{card.title}</h2>
      <div className="card__body">{card.body}</div>
      {card.variant === 'heroes' && (
        <ul className="hero-row">
          {HEROES.map((hero) => (
            <li key={hero.name} className="hero-row__item">
              <img
                src={hero.image}
                alt={hero.name}
                className="hero-row__img"
                loading={eager ? 'eager' : 'lazy'}
              />
              <strong className="hero-row__name">{hero.name}</strong>
              <span className="hero-row__hint">{hero.hint}</span>
            </li>
          ))}
        </ul>
      )}
      {card.checklist && (
        <ul className="checklist">
          {card.checklist.map((item) => (
            <li key={item}>{`✅ ${item}`}</li>
          ))}
        </ul>
      )}
      {card.image && (
        <div className="card__imagewrap">
          <img
            src={card.image}
            alt={card.imageAlt ?? card.title}
            loading={eager ? 'eager' : 'lazy'}
            className="card__image"
          />
        </div>
      )}
      {card.variant === 'cover' && (
        <p className="card__swipe-cue">옆으로 밀어서 시작 →</p>
      )}
    </article>
  )
}
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `npx vitest run src/components/Card.test.tsx`
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add src/components/Card.tsx src/components/Card.test.tsx
git commit -m "feat: variant별 카드 렌더링 컴포넌트

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 5: Carousel · ProgressDots · SwipeHint · App 조립 + 전체 스타일

embla는 jsdom에 ResizeObserver가 없어 단위 테스트가 어려우므로, ProgressDots만 단위 테스트하고 캐러셀 동작은 Task 6에서 브라우저로 검증한다.

**Files:**
- Create: `src/components/Carousel.tsx`, `src/components/ProgressDots.tsx`, `src/components/SwipeHint.tsx`
- Test: `src/components/ProgressDots.test.tsx`
- Modify: `src/App.tsx` (플레이스홀더 전체 교체), `src/index.css` (전체 교체)

**Interfaces:**
- Consumes: `Card`(Task 4), `CARDS`(Task 3)
- Produces:
  - `function Carousel({ children, onIndexChange }: { children: ReactNode; onIndexChange: (i: number) => void }): JSX` — children은 `.embla__slide` div들이어야 함
  - `function ProgressDots({ count, current }: { count: number; current: number }): JSX` — "N / count" 카운터 표시 (current는 0-기준)
  - `function SwipeHint({ atStart }: { atStart: boolean }): JSX | null` — atStart가 한 번이라도 false가 되면 영구 숨김

- [ ] **Step 1: ProgressDots 실패하는 테스트 작성**

`src/components/ProgressDots.test.tsx`:

```tsx
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
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npx vitest run src/components/ProgressDots.test.tsx`
Expected: FAIL — "Failed to resolve import ./ProgressDots"

- [ ] **Step 3: 컴포넌트 3개 구현**

`src/components/ProgressDots.tsx`:

```tsx
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
```

`src/components/Carousel.tsx`:

```tsx
import useEmblaCarousel from 'embla-carousel-react'
import { useEffect } from 'react'
import type { ReactNode } from 'react'

export function Carousel({
  children,
  onIndexChange,
}: {
  children: ReactNode
  onIndexChange: (index: number) => void
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start' })

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => onIndexChange(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onIndexChange])

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">{children}</div>
    </div>
  )
}
```

`src/components/SwipeHint.tsx`:

```tsx
import { useEffect, useState } from 'react'

export function SwipeHint({ atStart }: { atStart: boolean }) {
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (!atStart) setDismissed(true)
  }, [atStart])

  if (dismissed || !atStart) return null
  return (
    <div className="swipe-hint" aria-hidden="true">
      ←
    </div>
  )
}
```

- [ ] **Step 4: App 조립**

`src/App.tsx` (전체 교체):

```tsx
import { useState } from 'react'
import { CARDS } from './data/cards'
import { Card } from './components/Card'
import { Carousel } from './components/Carousel'
import { ProgressDots } from './components/ProgressDots'
import { SwipeHint } from './components/SwipeHint'

export default function App() {
  const [index, setIndex] = useState(0)

  return (
    <div className="app">
      <Carousel onIndexChange={setIndex}>
        {CARDS.map((card, i) => (
          <div className="embla__slide" key={card.id}>
            <Card card={card} eager={i < 2} />
          </div>
        ))}
      </Carousel>
      <SwipeHint atStart={index === 0} />
      <ProgressDots count={CARDS.length} current={index} />
    </div>
  )
}
```

- [ ] **Step 5: 전체 스타일 작성**

`src/index.css` (전체 교체):

```css
:root {
  --bg: #17100a;
  --bg-card: #241a10;
  --ink: #f5ead7;
  --ink-dim: #c4b394;
  --gold: #e8b04b;
  --radius: 20px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#root {
  height: 100%;
}

body {
  background: #0b0805;
  color: var(--ink);
  font-family:
    'Pretendard',
    -apple-system,
    BlinkMacSystemFont,
    'Apple SD Gothic Neo',
    'Noto Sans KR',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  overscroll-behavior: none;
}

.app {
  position: relative;
  height: 100dvh;
  max-width: 480px;
  margin: 0 auto;
  background: linear-gradient(180deg, var(--bg) 0%, #100a06 100%);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* --- 캐러셀 --- */
.embla {
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.embla__container {
  display: flex;
  height: 100%;
  touch-action: pan-y pinch-zoom;
}

.embla__slide {
  flex: 0 0 100%;
  min-width: 0;
  height: 100%;
  padding: 20px 20px 8px;
}

/* --- 카드 공통 --- */
.card {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: var(--bg-card);
  border: 1px solid rgba(232, 176, 75, 0.25);
  border-radius: var(--radius);
  padding: 24px 20px;
  overflow: hidden;
}

.card__badge {
  align-self: flex-start;
  background: var(--gold);
  color: #241a10;
  font-weight: 800;
  font-size: 13px;
  padding: 4px 12px;
  border-radius: 999px;
  letter-spacing: 0.02em;
}

.card__title {
  font-size: 26px;
  font-weight: 800;
  line-height: 1.25;
  color: var(--gold);
}

.card__body {
  font-size: 17px;
  line-height: 1.55;
  color: var(--ink-dim);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card__body strong {
  color: var(--ink);
}

/* --- 표지 --- */
.card--cover {
  justify-content: center;
  text-align: center;
  align-items: center;
}

.card--cover .card__title {
  font-size: 34px;
  color: var(--ink);
  word-break: keep-all;
}

.card__emoji {
  font-size: 72px;
  line-height: 1;
}

.card__swipe-cue {
  margin-top: 28px;
  color: var(--gold);
  font-weight: 700;
  animation: cue 1.6s ease-in-out infinite;
}

@keyframes cue {
  0%,
  100% {
    transform: translateX(0);
    opacity: 0.7;
  }
  50% {
    transform: translateX(8px);
    opacity: 1;
  }
}

/* --- 이미지 --- */
.card__imagewrap {
  flex: 1;
  min-height: 0;
  display: flex;
  justify-content: center;
}

.card__image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 12px;
}

/* --- 영웅 카드 --- */
.hero-row {
  list-style: none;
  display: flex;
  gap: 10px;
  margin-top: 8px;
}

.hero-row__item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  background: rgba(232, 176, 75, 0.08);
  border: 1px solid rgba(232, 176, 75, 0.35);
  border-radius: 14px;
  padding: 12px 6px;
  text-align: center;
}

.hero-row__img {
  width: 72px;
  height: 72px;
  object-fit: contain;
  border-radius: 10px;
}

.hero-row__name {
  font-size: 17px;
  color: var(--gold);
}

.hero-row__hint {
  font-size: 12px;
  color: var(--ink-dim);
  line-height: 1.35;
  white-space: pre-line;
}

/* --- 체크리스트 --- */
.checklist {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 16px;
  color: var(--ink);
}

/* --- 진행 표시 --- */
.progress {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 10px 0 calc(12px + env(safe-area-inset-bottom));
}

.progress__dots {
  display: flex;
  gap: 6px;
}

.progress__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: rgba(245, 234, 215, 0.25);
  transition: all 0.25s;
}

.progress__dot--active {
  background: var(--gold);
  width: 20px;
  border-radius: 999px;
}

.progress__counter {
  font-size: 12px;
  color: var(--ink-dim);
}

/* --- 스와이프 힌트 --- */
.swipe-hint {
  position: absolute;
  right: 14px;
  top: 50%;
  font-size: 28px;
  color: var(--gold);
  animation: hint 1.2s ease-in-out infinite;
  pointer-events: none;
}

@keyframes hint {
  0%,
  100% {
    transform: translate(0, -50%);
    opacity: 0.4;
  }
  50% {
    transform: translate(-10px, -50%);
    opacity: 1;
  }
}
```

- [ ] **Step 6: 전체 테스트 통과 확인**

Run: `npm test`
Expected: PASS — cards 5개, Card 3개, ProgressDots 2개 (총 10 tests)

- [ ] **Step 7: Commit**

```bash
git add src/App.tsx src/index.css src/components
git commit -m "feat: 스와이프 캐러셀 + 진행 도트 + 힌트로 카드뉴스 조립

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 6: 빌드 검증 + README + 푸시

**Files:**
- Create: `README.md`

**Interfaces:**
- Consumes: 전체 앱 (Task 1~5)

- [ ] **Step 1: 타입체크 + 프로덕션 빌드**

Run: `npm run build`
Expected: tsc 에러 0, `dist/` 생성, 이미지 에셋 번들 포함

- [ ] **Step 2: 브라우저 검증 (모바일 뷰포트)**

Run: `npm run preview` 후 브라우저에서 열어 확인 (또는 사용자에게 확인 요청):
- 카드 12장이 좌우 스와이프/드래그로 넘어감
- 하단 도트와 카운터(1 / 12)가 스와이프에 맞춰 갱신
- 첫 카드에서 ← 힌트가 깜빡이고, 한 번 넘기면 다시 안 나타남
- 스크린샷의 빨간/파란 마킹이 뭉개지지 않고 읽힘

- [ ] **Step 3: README 작성**

`README.md`:

````markdown
# 🐻 킹샷 곰 사냥 영웅 가이드

킹샷(Kingshot) 초보 연맹원을 위한 곰 사냥 집결 영웅 선택 가이드.
모바일 전용 카드뉴스 스타일 — 좌우로 스와이프하며 봅니다.

## 내용

- 곰 사냥 집결에서는 **첫 번째 영웅 슬롯만** 효과가 적용됩니다
- 1세대 기준 정답: **첸코 · 연우 · 아마네**
- Equalize 버튼으로 병력 균등 분배, 가까운 집결 참여 팁

## 개발

```bash
npm install
npm run dev      # 개발 서버
npm test         # 단위 테스트
npm run build    # 프로덕션 빌드 → dist/
npm run preview  # 빌드 결과 미리보기
```

빌드 산출물은 `dist/` — 아무 정적 호스팅(GitHub Pages, Netlify 등)에 올리면 됩니다.

## 콘텐츠 수정

카드 내용은 전부 `src/data/cards.tsx`에 있습니다. 카드 추가/수정은 이 파일만 고치면 됩니다.
````

- [ ] **Step 4: Commit & Push**

```bash
git add README.md
git commit -m "docs: README 추가

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
git push origin main
```
