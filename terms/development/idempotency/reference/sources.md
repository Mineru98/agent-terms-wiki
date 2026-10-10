---
title: 멱등성 출처 모음
description: 멱등성 항목 조사 출처와 미확인 사항
---

조회일: 2026-10-10

## 출처

| 제목 | URL | 등급 | 확인한 내용 |
| --- | --- | --- | --- |
| RFC 9110, HTTP Semantics, 9.2.2 Idempotent Methods | https://www.rfc-editor.org/rfc/rfc9110.html | A | 멱등 메서드의 정의, PUT, DELETE 와 안전한 메서드가 멱등. 안전한 메서드는 9.2.1 에서 GET, HEAD, OPTIONS, TRACE |
| IETF Internet-Draft, The Idempotency-Key HTTP Header Field (-07) | https://datatracker.ietf.org/doc/html/draft-ietf-httpapi-idempotency-key-header | A | 헤더 문법(Structured Header 문자열), 400/409/422 권고, 초안이며 2026-04-18 만료 표시 |
| Stripe API, Idempotent requests | https://docs.stripe.com/api/idempotent_requests | A | 키 재시도 시 저장된 응답 반환, 255자 제한, 24시간 이후 제거 가능, 파라미터 불일치 오류, GET/DELETE 에는 불필요 |

## 미확인·충돌

- RFC 9110 의 응답 유실 후 자동 재시도에 관한 문장은 검색 요약으로 확인했고 9.2.2 전체 문장을 끝까지 읽지는 않았다. 정의와 메서드 목록은 직접 열람했다.
- DELETE 의 200/404 예시는 2차 자료(검색 요약)에 근거하며 RFC 본문에서 직접 확인하지 않았다.
- 코딩 에이전트 맥락은 출처 없는 일반 설명이다.
- IETF 초안이 만료 후 RFC 로 발행되었는지는 확인하지 못했다.
