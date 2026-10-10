---
title: 디바운스 출처 목록
description: MDN 용어집과 Lodash 문서에서 확인한 내용과 미확인 항목
---

# 출처

조회일: 2026-10-10

| 제목 | URL | 등급 | 확인한 내용 |
| --- | --- | --- | --- |
| MDN Glossary: Debounce | https://developer.mozilla.org/en-US/docs/Glossary/Debounce | A | 정의, 선행/후행 지점, 후행 실행이 일반적이며 선행·양쪽 실행도 가능하다는 점, 쓰로틀과의 차이. 코드 예시는 없음. |
| Lodash Documentation: _.debounce | https://lodash.com/docs/4.17.15#debounce | A | 시그니처, 기본값 wait=0, leading=false, trailing=true, maxWait 설명. |
| MDN Glossary: Throttle | https://developer.mozilla.org/en-US/docs/Glossary/Throttle | A | 디바운스와 쓰로틀의 차이 서술. |
| lodash.debounce 소스 JSDoc 미러 (검색 결과) | https://ouroboros.rocks/cgit/website/tree/node_modules/lodash.debounce/index.js | C | leading/trailing 동시 사용 시 후행 실행 조건, cancel/flush 메서드. 미러 사본이라 등급 C. |

## 미확인·충돌

- 양쪽 옵션 사용 시 "호출이 두 번 이상일 때만 후행 실행" 규칙은 공식 문서 페이지에서 직접 확인하지 못했고 소스 주석 미러(C)로만 확인했다. 본문에서 출처를 밝혀 서술했다.
- 검색창 예시의 최소 구현 코드는 일반적인 setTimeout 패턴이며 특정 출처의 코드를 인용한 것이 아니다.
- 충돌하는 출처는 발견하지 못했다.
