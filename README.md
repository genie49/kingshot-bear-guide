# 🐻 킹샷 곰 사냥 영웅 가이드 / Kingshot Bear Hunt Hero Guide

킹샷(Kingshot) 초보 연맹원을 위한 곰 사냥 집결 영웅 선택 가이드.
모바일 전용 카드뉴스 스타일 — 좌우로 스와이프하며 봅니다. **영어(기본)/한국어** 토글 지원.

## 내용

- 곰 사냥 집결에서는 **첫 번째 영웅 슬롯만** 효과가 적용됩니다
- 1세대 기준 정답: **첸코(Chenko) · 연우(Yeonwoo) · 아마네(Amane)** — 부대마다 1명씩
- Equalize 버튼으로 병력 균등 분배 → 여러 집결에 모두 참여, 가까운 집결 우선

## 개발

```bash
npm install
npm run dev      # 개발 서버
npm test         # 단위 테스트
npm run build    # 프로덕션 빌드 → dist/
npm run preview  # 빌드 결과 미리보기
```

## 배포 (Railway)

Railway에서 이 repo를 연결하면 자동으로 `npm run build` 후 `npm start`로 서빙됩니다
(`start` 스크립트가 Railway의 `$PORT`에 바인딩).

1. [railway.app](https://railway.app) → New Project → **Deploy from GitHub repo** → 이 저장소 선택
2. 빌드/시작 커맨드는 자동 감지 (Build: `npm run build`, Start: `npm start`)
3. Settings → Networking → **Generate Domain**으로 공개 URL 발급

## 콘텐츠 수정

카드 내용은 언어별 파일에 있습니다:

- 한국어: `src/data/cards.ko.tsx`
- 영어: `src/data/cards.en.tsx`

카드 추가/수정은 두 파일을 함께 고치면 됩니다 (id 순서는 두 언어가 동일해야 함 — 테스트가 검증).
