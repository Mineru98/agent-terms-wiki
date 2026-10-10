---
title: 출처 목록
description: 구조화 출력 항목의 조사 출처와 미확인 항목
---

조회일: 2026-10-10

## 출처

| 제목 | URL | 등급 | 확인한 내용 |
| --- | --- | --- | --- |
| OpenAI, Structured Outputs guide | https://developers.openai.com/api/docs/guides/structured-outputs | A | 스키마 준수, JSON 모드는 유효한 JSON 만 보장, `refusal` 필드, `text.format` 의 `json_schema` 와 `strict: true`, 잘림/거절 시 예외. 페이지 앞 100000자만 확인 |
| Anthropic, Structured outputs | https://platform.claude.com/docs/en/docs/build-with-claude/structured-outputs | A | `output_config.format`, 엄격한 도구 사용, 보장 범위, 지원하지 않는 스키마 기능, 거절/잘림 예외, 첫 요청 지연과 24시간 캐시. 페이지 끝 약 3000자는 미열람 |

## 미확인·충돌

- 두 제공사의 지원 스키마 범위와 모델 지원 목록은 서로 다르며, 이 항목은 일반 원리만 다룬다.
- "값의 사실 여부를 보증하지 않는다"는 문장은 문서가 형식 보장만 서술한다는 점에서 이끈 정리로, 직접 인용 근거는 없다.
- 충돌하는 출처는 발견하지 못했다.
