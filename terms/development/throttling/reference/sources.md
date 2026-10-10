---
title: 쓰로틀링 출처 목록
description: MDN 용어집과 Lodash 문서에서 확인한 내용과 미확인·충돌 항목
---

# 출처

조회일: 2026-10-10

| 제목 | URL | 등급 | 확인한 내용 |
| --- | --- | --- | --- |
| MDN Glossary: Throttle | https://developer.mozilla.org/en-US/docs/Glossary/Throttle | A | 정의, 스크롤 핸들러 예시, 선행/후행 지점, 디바운스와의 차이, 네트워크 쓰로틀링. |
| MDN Glossary: Rate limit | https://developer.mozilla.org/en-US/docs/Glossary/Rate_limit | A | 서버가 클라이언트 요청 수를 제한하는 맥락, 429 응답, "보통 throttling 과 동의어"라는 서술. |
| Lodash Documentation: _.throttle | https://lodash.com/docs/4.17.15#throttle | A | wait 당 최대 한 번 호출, leading 과 trailing 기본값 true. |
| MDN Glossary: Debounce | https://developer.mozilla.org/en-US/docs/Glossary/Debounce | A | 쓰로틀과의 차이. |

## 미확인·충돌

- 충돌: MDN Rate limit 항목은 rate limiting 이 "보통 throttling 과 동의어"라고 쓴다. 본 위키는 설명의 편의상 클라이언트 함수 실행 빈도 제한(쓰로틀링)과 서버의 요청 수 제한(rate limiting)을 구분했고, 이 구분은 MDN 이 명시한 것이 아니라 맥락에 따른 편집상 구분이다.
- 스크롤 예시의 최소 구현 코드는 일반적인 시간 비교 패턴이며 특정 출처의 코드를 인용한 것이 아니다.
- Lodash 문서의 `_.throttle` 이후 일부 구간(전체 페이지 끝부분)은 읽지 못했으나 쓰로틀 항목 자체는 확인했다.
