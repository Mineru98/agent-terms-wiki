---
title: 출처 목록
description: 사고 연쇄 항목의 조사 출처와 미확인 항목
---

조회일: 2026-10-10

## 출처

| 제목 | URL | 등급 | 확인한 내용 |
| --- | --- | --- | --- |
| Chain-of-Thought Prompting Elicits Reasoning in Large Language Models (Wei et al.) | https://arxiv.org/abs/2201.11903 | A | 2022년 1월 제출. 중간 추론 단계를 포함한 예시를 프롬프트에 넣는 방식. 산술, 상식, 기호 추론에서 향상. 540B 모델과 예시 8개로 GSM8K 최고 수준 정확도 |
| Large Language Models are Zero-Shot Reasoners (Kojima et al.) | https://arxiv.org/pdf/2205.11916 | A | 검색 결과 요약으로 확인(원문 미열람). "Let's think step by step" 한 문장으로 zero-shot 추론 향상. text-davinci-002 에서 MultiArith 17.7%에서 78.7%, GSM8K 10.4%에서 40.7% |
| Anthropic, Thinking | https://platform.claude.com/docs/en/build-with-claude/thinking | A | 사고 토큰은 출력 토큰으로 과금, `max_tokens` 에 포함, thinking 블록으로 반환 |
| OpenAI, Reasoning guide | https://developers.openai.com/api/docs/guides/reasoning | A | 원본 추론 토큰은 API 로 비노출, 컨텍스트 차지, 출력 토큰으로 과금. 추론 모델에는 중간 단계를 지시하지 말고 목표, 제약, 출력 형식을 주라는 안내 |

## 미확인·충돌

- Kojima et al. 은 원문 본문이 아니라 검색 결과 요약으로 수치를 확인했다.
- 모델이 쓴 풀이가 실제 내부 계산을 반영하는지(충실성)는 조사하지 않았다.
- 코딩 에이전트 제품 문서에서 "계획을 먼저 쓰라"는 지시의 효과는 확인하지 못했다.
- 충돌하는 출처는 발견하지 못했다.
