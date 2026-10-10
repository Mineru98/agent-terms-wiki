---
title: 출처 목록
description: 온도 항목의 조사 출처와 미확인 항목
---

조회일: 2026-10-10

## 출처

| 제목 | URL | 등급 | 확인한 내용 |
| --- | --- | --- | --- |
| Anthropic, Messages API reference (create) | https://platform.claude.com/docs/en/api/messages/create | A | temperature: 무작위성의 양, 기본 1.0, 범위 0.0~1.0, 분석/객관식은 0에 가깝게 창작은 1에 가깝게, 0.0이어도 완전히 결정적이지 않음, Opus 4.6 이후 모델은 설정 미지원(1.0만 수용). top_p: 핵 샘플링 정의, 같은 지원 제한 |
| OpenAI API reference (chat completions) | https://platform.openai.com/docs/api-reference/chat/create | A(열람 실패) | 403 으로 열람하지 못함. 경로를 바꾼 시도는 404 |
| OpenAI 커뮤니티, Microsoft Learn 답변 등 (검색 결과) | https://learn.microsoft.com/en-us/answers/a/1273829 | C | temperature 와 top_p 중 하나만 바꾸라는 권고가 있다는 2차 설명. 본문 미열람 |

## 미확인·충돌

- 소프트맥스 분포를 평탄하게 또는 날카롭게 만든다는 수식 수준 설명은 공식 문서로 확인하지 못했다. 기억 기반이다.
- 온도 0에서도 비결정적인 원인은 공식 문서에서 확인하지 못했다. 비결정성 자체는 Anthropic 문서로 확인했다.
- OpenAI 의 temperature 범위, 기본값, "하나만 바꾸라"는 권고 원문은 확인하지 못했다.
- A/B 등급 출처가 Anthropic 한 곳뿐이어서 status 는 draft 로 둔다.
- 충돌하는 출처는 발견하지 못했다.
