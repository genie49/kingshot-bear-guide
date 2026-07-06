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
