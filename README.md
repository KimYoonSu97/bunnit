# 🗓️ Bunnit - React Native 캘린더 애플리케이션

캘린더 애플리케이션입니다. 월간/주간 뷰 전환, 제스처 기반 인터랙션을 제공합니다.

## 📱 주요 기능

### 🎯 핵심 기능
- **월간/주간 캘린더 뷰**: 직관적인 제스처로 뷰 전환
- **제스처 기반 인터랙션**: 상,하 스와이프로 월간/주간 전환
- **반응형 디자인**: 다양한 화면 크기에 최적화
- **성능 최적화**: React.memo, useMemo, useCallback 활용

### 🚀 기술적 특징
- **메모이제이션 최적화**: 불필요한 리렌더링 방지
- **컴포넌트 분리**: 단일 책임 원칙에 따른 구조화
- **타입 안정성**: TypeScript로 타입 안정성 보장
- **애니메이션**: React Native Reanimated 활용

## 🛠️ 기술 스택

### Frontend
- **React Native** 0.80.1
- **React** 19.1.0
- **TypeScript** 5.0.4

### Navigation
- **React Navigation** 7.x
- **Bottom Tab Navigator**

### Animation & Gesture
- **React Native Reanimated** 3.18.0
- **React Native Gesture Handler** 2.27.1

### Date Management
- **Day.js** 1.11.13

### Development Tools
- **ESLint** - 코드 품질 관리
- **Prettier** - 코드 포맷팅
- **Jest** - 테스트 프레임워크

## 📁 프로젝트 구조

```
bunnit/
├── src/
│   ├── core/
│   │   ├── constant/
│   │   │   └── calendar.ts          # 캘린더 상수
│   │   └── navigation/
│   │       └── BottomTabNavigation.tsx
│   └── presentation/
│       ├── screen/
│       │   ├── CalendarBottomScreen/
│       │   │   ├── components/
│       │   │   │   ├── level2/      # 기본 월간 캘린더
│       │   │   │   └── level3/      # 고급 제스처 캘린더
│       │   │   │       ├── components/
│       │   │   │       ├── context/
│       │   │   │       ├── util/
│       │   │   │       └── useGestureCalendar.ts
│       │   │   └── index.tsx
│       │   ├── HomeBottomScreen/
│       │   ├── LibraryBottomScreen/
│       │   └── MypageBottomScreen/
│       └── shared/
│           ├── hook/
│           └── style/
├── android/                          # Android 네이티브 코드
├── ios/                             # iOS 네이티브 코드
└── package.json
```

## 🚀 설치 및 실행

### 필수 요구사항
- Node.js >= 18
- React Native CLI
- Android Studio (Android 개발용)
- Xcode (iOS 개발용)

### 1. 저장소 클론
```bash
git clone [repository-url]
cd bunnit
```

### 2. 의존성 설치
```bash
npm install
# 또는
yarn install
```

### 3. iOS 의존성 설치 (iOS 개발 시)
```bash
cd ios
pod install
cd ..
```

### 4. 개발 서버 실행
```bash
# Metro 번들러 시작
npm start
# 또는
yarn start
```

### 5. 앱 실행

#### Android
```bash
npm run android
# 또는
yarn android
```

#### iOS
```bash
npm run ios
# 또는
yarn ios
```

## 📖 사용법

### 캘린더 기능
1. **월간 뷰**: 기본적으로 월간 캘린더가 표시됩니다
2. **주간 뷰 전환**: 아래로 스와이프하여 주간 뷰로 전환
3. **월간 뷰 복귀**: 위로 스와이프하여 월간 뷰로 복귀
4. **날짜 선택**: 원하는 날짜를 탭하여 선택

### 레벨 전환
- **Level 2**: 기본 월간 캘린더 뷰
- **Level 3**: 고급 제스처 기반 캘린더 뷰

## 🔧 개발 가이드

### 코드 스타일
- **들여쓰기**: 2칸 공백
- **세미콜론**: 필수 사용
- **문자열**: 단일 따옴표 사용
- **네이밍**: camelCase (변수/함수), PascalCase (컴포넌트)

### 성능 최적화
- `React.memo`를 사용한 컴포넌트 메모이제이션
- `useMemo`와 `useCallback` 활용
- 불필요한 리렌더링 방지

### 컴포넌트 구조
```
GestureCalendar
├── DayHeader (메모이제이션)
├── MonthlyCalendarBody
│   ├── DayItem (메모이제이션)
│   └── WeekRow (메모이제이션)
└── WeeklyCalendarBody
    └── WeeklyDayItem (메모이제이션)
```

## 🧪 테스트

```bash
# 테스트 실행
npm test
# 또는
yarn test
```

## 📝 주요 최적화 사항

### 1. 메모이제이션 최적화
- 컴포넌트별 `React.memo` 적용
- Props 변경 시에만 리렌더링
- Context 값 메모이제이션

### 2. 성능 개선
- FlatList 최적화 (`getItemLayout`, `keyExtractor`)
- 이벤트 핸들러 메모이제이션
- 스타일 계산 최적화

### 3. 코드 품질
- TypeScript 타입 안정성
- 일관된 코딩 컨벤션
- 컴포넌트 분리 및 재사용성

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 👨‍💻 개발자

- **개발자**: [Your Name]
- **이메일**: [your.email@example.com]
- **GitHub**: [@yourusername]

---

⭐ 이 프로젝트가 도움이 되었다면 스타를 눌러주세요!
