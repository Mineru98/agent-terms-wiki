---
title: 출처 목록
description: 추론 강도 항목의 조사 출처와 미확인 항목
---

조회일: 2026-10-10

## 출처

| 제목 | URL | 등급 | 확인한 내용 |
| --- | --- | --- | --- |
| Anthropic, Effort | https://platform.claude.com/docs/en/build-with-claude/effort | A | `output_config.effort`, 레벨 low/medium/high/xhigh/max, 모델별 기본값과 지원 차이, 모든 출력 토큰에 영향, 행동 신호이며 엄격한 예산 아님, 모델별 재보정, `max` 의 과도한 사고 가능성, 하위 에이전트에는 low 권장 |
| Anthropic, Extended thinking | https://platform.claude.com/docs/en/build-with-claude/extended-thinking | A | `budget_tokens` 최소 1,024, 목표치이며 상한 아님, 큰 예산은 품질을 높이나 지연이 늘고 수익이 체감, Claude 4.6 지원 중단, 4.7 이후 400 오류, adaptive 로 이전 |
| Anthropic, Thinking | https://platform.claude.com/docs/en/build-with-claude/thinking | A | 사고 토큰은 출력 토큰으로 과금, `max_tokens` 에 포함 (일부 내용만 열람) |
| OpenAI, Reasoning guide | https://developers.openai.com/api/docs/guides/reasoning | A | 레벨 none~max, 모델별 지원 차이, 추론 토큰은 출력 토큰으로 과금되고 `max_output_tokens` 에 포함, 낮은 강도는 속도, 높은 강도는 품질, xhigh 는 평가로 이득이 확인될 때만, 원본 추론 토큰은 비노출 |

## 미확인·충돌

- 두 제공사의 레벨 이름은 서로 다르다(Anthropic 5개, OpenAI 7개). 레벨 간 사고 토큰 수의 대응은 문서에 수치로 없어 미확인이다.
- OpenAI 문서 요약은 페이지 일부를 소형 모델이 요약한 결과이며, 모델 이름이 나열된 부분은 본문에 옮기지 않았다.
- Google 등 다른 제품의 레벨 이름은 조사하지 않았다(미확인).
- 충돌하는 출처는 발견하지 못했다.
