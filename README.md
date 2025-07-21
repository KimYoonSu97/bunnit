# Bunnit

React Native로 개발된 모바일 애플리케이션입니다. 직관적인 캘린더 기능과 제스처 기반의 부드러운 사용자 경험을 제공합니다.

## 주요 기능

- 📅 **캘린더**: 월간/주간 뷰 전환이 가능한 인터렉티브 캘린더
- 🎯 **제스처 기반 UI**: 스와이프 제스처로 캘린더 뷰를 자연스럽게 전환
- ✨ **부드러운 애니메이션**: React Native Reanimated를 활용한 매끄러운 전환 효과
- 📱 **멀티 탭 네비게이션**: 홈, 캘린더, 라이브러리, 마이페이지로 구성된 탭 구조

### 필수 요구사항

- Node.js >= 18
- React Native CLI
- iOS: Xcode 14+
- Android: Android SDK 33+

## 캘린더 기능 상세

### level 1

- **네비게이션**: bottomTab에 home, calendar, library, mypage, 4가지 화면 구현

### level 2

- **캘린더 구현**: 라이브러리 없이 월 캘린더 구현

### level 3

- **주간 월간 전환형 캘린더 구현**: reanimated, react-native-gesture-handler를 활용한 월 <-> 주 전환형 캘린더 구현

### 제스처 캘린더

- **월간 ↔ 주간 전환**: 상하 스와이프로 뷰 모드 변경
- **부드러운 전환**: 0.1초 교차 시간을 통한 깜빡임 방지
- **애니메이션**: 위치와 투명도를 활용한 자연스러운 전환 효과

### 캘린더 컨텍스트

- 월간/주간 캘린더 데이터 관리
- 현재 주차 인덱스 추적
- 전역 상태 관리를 통한 일관된 데이터 제공

## 스크립트

```bash
# 개발 서버 시작
npm start

# 앱 실행
npm run ios     # iOS
npm run android # Android

# 코드 품질
npm run lint    # ESLint 검사
npm test        # Jest 테스트 실행
```
