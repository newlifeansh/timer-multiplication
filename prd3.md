# PRD 3.0 - Monthly Dividend Stocks App

## 프로젝트 개요
월별 배당주 ETF 정보를 제공하는 하이브리드 웹 애플리케이션

## 기술 스택
- Next.js 16.0.8
- React 19.2.0
- Tailwind CSS v4
- TypeScript
- Figma MCP 연동

## 디바이스 타겟
- **기준 디바이스**: iPhone 13 mini (375px)
- **반응형 요구사항**:
  - 상단 네비게이션 바는 화면 너비에 따라 늘어남 (전체 너비)
  - 콘텐츠는 최대 375px로 가운데 정렬
  - 하이브리드 웹처럼 동작

## 1. Home 페이지 (Splash Screen)

### Figma 링크
- 디자인: [Home Screen](https://www.figma.com/design/91m5DIO9Z44wQvOuqli78R/%EB%94%B0%EB%B0%95%EB%94%B0%EB%B0%95)

### 요구사항
- 3초 후 자동으로 OOBE 페이지로 이동
- "Monthly dividend stocks" 텍스트 표시
- 그라데이션 텍스트 (from-[#888888] to-[#222222])
- 중앙 아이콘/이미지 표시

### 레이아웃
- 배경색: #f8f8f8
- 전체 화면 가운데 정렬
- 최대 너비: 375px

---

## 2. OOBE 페이지

### Figma 링크
- 디자인: [OOBE Screen](https://www.figma.com/design/91m5DIO9Z44wQvOuqli78R/%EB%94%B0%EB%B0%95%EB%94%B0%EB%B0%95?node-id=3-8&m=dev)
- 월 선택 화면: [Select Month](https://www.figma.com/design/91m5DIO9Z44wQvOuqli78R/%EB%94%B0%EB%B0%95%EB%94%B0%EB%B0%95?node-id=7-1679&m=dev)

### 요구사항
- 사용자가 원하는 정보를 선택하는 화면
- 두 가지 옵션 제공:
  1. "I would like to know the returns for the entire year." → Monthly List (months=all)
  2. "I have a preferred month." → Select Month 페이지

### 레이아웃 및 간격 (Figma Auto Layout)
```
상단 네비게이션: 전체 너비, px-[34px] py-[16px]

콘텐츠 영역 (최대 375px, 가운데 정렬):
├── Title + Subtitle (mt-[73px])
│   └── gap-[11px]
│
└── Options Container (gap-[50px] from title)
    ├── Option 1
    │   └── gap-[45px] ← **중요: 피그마 Auto Layout 간격 유지**
    └── Option 2
```

### 스타일링
- 배경: bg-white
- 옵션 버튼:
  - 기본: bg-[rgba(53,56,62,0.05)]
  - Hover: bg-[rgba(53,56,62,0.1)]
  - padding: p-[15px]
  - border-radius: rounded-[22.5px]
  - gap: gap-[15px]

---

## 3. Select Month 페이지

### Figma 링크
- 디자인: [Select Month](https://www.figma.com/design/91m5DIO9Z44wQvOuqli78R/%EB%94%B0%EB%B0%95%EB%94%B0%EB%B0%95?node-id=7-1679&m=dev)

### 요구사항
- 12개월 모두 표시 (2열 그리드)
- 복수 선택 가능
- 선택된 월은 #FFAA04CC 배경색 표시
- 선택 완료 시 하단에 "{n}개월 선택 완료" 버튼 표시
- 확인 버튼 클릭 시 Monthly List로 이동 (선택된 월만)

### 레이아웃
```
상단 네비게이션: 전체 너비

콘텐츠 영역 (최대 375px, 가운데 정렬):
├── Title (mt-[73px])
├── Subtitle (mt-[20px])
└── Month Grid (mt-[45px])
    └── gap-[19px] between rows
        └── gap-[14px] between columns
```

### 스타일링
- 선택 안됨: bg-[rgba(53,56,62,0.05)]
- 선택됨: bg-[rgba(255,170,4,0.1)] with checkmark
- 체크마크 색상: text-[#805d19]
- 확인 버튼: bg-[#FFAA04], fixed bottom-8, z-50

---

## 4. Monthly List 페이지

### Figma 링크
- 디자인: [Monthly List](https://www.figma.com/design/91m5DIO9Z44wQvOuqli78R/%EB%94%B0%EB%B0%95%EB%94%B0%EB%B0%95?node-id=11-1485&m=dev)

### 요구사항

#### 월 캐러셀
- **표시 방식**:
  - months=all → 1월~12월 전체 표시
  - months=1,3,5 → 선택된 월만 표시
- **기본 선택**: 가장 빠른 월 자동 선택 (#FFAA04CC)
- **UX 동작**:
  - 좌우 스크롤링 가능한 캐러셀 방식
  - **월 선택 없이도 드래그 모션으로 캐러셀 움직임 가능** ✓ 중요
  - 월 클릭 시 선택 + 자동 중앙 정렬
  - 선택된 월이 자동으로 화면 가운데로 스크롤

#### 자동 중앙 정렬 스크롤
- 선택된 월이 바뀔 때마다 자동으로 화면 가운데로 부드럽게 스크롤
- useEffect 훅 사용
- behavior: 'smooth'

#### ETF 카드 레이아웃 (Figma Auto Layout 준수)
```
카드 내부 구조:
├── Top Section
│   ├── Ticker + Name (gap-[7px]) ← **피그마 간격 유지**
│   └── Favorites
│   └── gap-[16px] ← **피그마 간격 유지**
│
└── Bottom Section
    └── "Dividends per share" + Price
```

### 레이아웃
```
전체 화면:
├── Background decorative elements (fixed, 전체 화면 기준)
├── Status Bar (전체 너비, z-10)
└── Content (최대 375px, 가운데 정렬, z-10)
    ├── Month Carousel (mt-8 mb-6)
    ├── Results count (px-[25px])
    ├── Filter chips (px-[19px] mb-8)
    └── ETF Cards (px-[19px] space-y-4)
```

### 스타일링

**월 캐러셀:**
- 선택 안됨: bg-white with shadow
- 선택됨: bg-[rgba(255,170,4,0.8)], text-[#805d19]
- 크기: w-[64px] h-[70px]
- gap: gap-3
- overflow-x-scroll with scrollbar-hide
- cursor: grab/grabbing

**ETF 카드:**
- bg-white
- rounded-[15px]
- shadow-[0px_4px_32px_0px_rgba(0,0,0,0.04)]
- p-[20px]
- gap-[16px] (sections)
- gap-[7px] (ticker/name)

**배경 장식:**
- fixed position
- opacity-30
- pointer-events-none
- 퍼센트 기반 위치 (반응형)

---

## 5. 공통 요구사항

### Status Bar (모든 페이지)
- **레이아웃**: 전체 너비 반응형
- **위치**: 최상단 고정
- **내용**:
  - 시간: 9:41 (text-sm font-semibold)
  - 아이콘: 신호, WiFi, 배터리 (SVG)
- **스타일**: px-[34px] py-[16px], bg-white
- **피그마 디자인과 정확히 일치** ✓ 중요

### 반응형 전략
```css
모든 페이지 공통:
.page-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.status-bar {
  width: 100%; /* 전체 너비 */
}

.content {
  width: 100%;
  max-width: 375px; /* 아이폰 13 미니 기준 */
  /* 가운데 정렬 */
}
```

### Viewport 설정
```typescript
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}
```

---

## 6. 이전 버전 대비 주요 변경사항

### v2.0 → v3.0 변경사항

1. **반응형 레이아웃 추가**
   - 상단 네비게이션: 전체 너비
   - 콘텐츠: 최대 375px, 가운데 정렬
   - 배경 요소: 퍼센트 기반 위치

2. **이미지 처리**
   - Home 페이지 이미지를 SVG 아이콘으로 대체
   - 외부 이미지 의존성 제거

3. **피그마 Auto Layout 정확한 준수**
   - OOBE 옵션 간격: gap-[45px]
   - 타이틀/서브타이틀: gap-[11px]
   - ETF 카드 내부: gap-[16px], gap-[7px]

4. **캐러셀 UX 개선**
   - 월 선택 없이도 드래그로 이동 가능
   - 스크롤 스냅 적용
   - 마우스 커서 변경 (grab/grabbing)

5. **보안 업데이트**
   - Next.js 16.0.6 → 16.0.8 (CVE-2025-66478 해결)

---

## 7. 체크리스트

### 기능
- [x] Home → OOBE 3초 자동 이동
- [x] OOBE 두 가지 옵션 분기
- [x] 월 복수 선택
- [x] 월 캐러셀 스크롤
- [x] 선택된 월 자동 중앙 정렬
- [x] 드래그로 캐러셀 이동
- [x] ETF 카드 표시

### 디자인 (Figma 일치)
- [x] Status Bar 정확한 재현
- [x] OOBE 간격 (gap-[45px])
- [x] ETF 카드 간격 (gap-[16px], gap-[7px])
- [x] 색상 정확도
- [x] 폰트 크기 및 두께

### 반응형
- [x] Status Bar 전체 너비
- [x] 콘텐츠 375px 최대, 가운데 정렬
- [x] Viewport 메타태그 설정

### 성능 및 보안
- [x] Next.js 최신 버전
- [x] 빌드 에러 없음
- [x] 보안 취약점 해결

---

## 8. 배포 정보

- **저장소**: https://github.com/newlifeansh/timer-multiplication
- **배포 플랫폼**: Vercel
- **배포 URL**: timer-multiplication-go71.vercel.app

---

## 9. 개발 노트

### 주요 기술 결정사항

1. **Suspense 사용**
   - useSearchParams() 사용 시 Suspense 경계 필수
   - MonthlyListContent를 별도 컴포넌트로 분리

2. **CSS Scroll Snap**
   - 무한 스크롤 대신 snap-based 캐러셀 선택
   - 더 나은 UX와 성능

3. **Fixed vs Absolute Positioning**
   - 배경 요소: fixed (스크롤과 무관)
   - Status Bar: relative (문서 흐름 유지)
   - 콘텐츠: relative (z-index 관리)

4. **이미지 처리**
   - 외부 이미지 URL 제거
   - SVG로 대체하여 로딩 문제 해결

---

## 10. 향후 개선 사항

- [ ] 실제 ETF 데이터 API 연동
- [ ] 필터 기능 구현
- [ ] 즐겨찾기 기능
- [ ] 다크모드 지원
- [ ] 애니메이션 개선
- [ ] 실제 디바이스 테스트
