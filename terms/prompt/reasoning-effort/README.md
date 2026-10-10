---
title: 추론 강도 (Reasoning Effort)
aliases: [추론 강도, 추론 노력, effort 레벨, thinking budget, 추론 예산]
category: prompt
status: reviewed
updated: 2026-10-10
---

# 추론 강도 (Reasoning Effort)

> 추론 모델이 답하기 전에 쓰는 사고 토큰의 양을 조절하는 설정. 강도를 높이면 일반적으로 품질이 오르고 비용과 지연도 함께 오른다.

## 요약

- Anthropic 은 `output_config.effort` 로, OpenAI 는 `reasoning.effort` 로 강도를 지정한다.
- 높은 강도는 더 완전한 사고와 더 높은 품질을, 낮은 강도는 속도와 적은 토큰 사용을 우선한다(양쪽 공식 문서의 공통 설명).
- 사고 토큰은 출력 토큰으로 과금되므로 강도가 높을수록 비용이 오른다.
- 레벨 이름과 지원 범위는 제품과 모델마다 다르다. 같은 이름이라도 같은 사고량을 뜻한다고 볼 수 없다.
- 과거 Anthropic 의 고정 사고 예산(`budget_tokens`)은 최신 모델에서 지원이 끝났고, effort 가 권장 방식이다.

## 왜 필요한가

어려운 문제에는 오래 생각하는 편이 낫지만, 간단한 질문에도 같은 사고량을 쓰면 비용과 대기 시간만 늘어난다. 추론 강도를 두면 작업 난이도에 맞춰 품질, 비용, 지연의 균형을 요청마다 고를 수 있다.

## 어떻게 동작하나

### Anthropic

- 레벨은 `low`, `medium`, `high`, `xhigh`, `max` 다섯 가지이며, 모델마다 지원하는 레벨이 다르다. 예를 들어 `xhigh` 는 모든 모델이 지원하지 않는다.
- 기본값은 대부분 `high` 이고, Claude Opus 5.5 와 Claude Haiku 5.5 는 `medium` 이다.
- effort 는 사고뿐 아니라 텍스트 응답과 도구 호출 인자를 포함한 모든 출력 토큰에 영향을 준다.
- effort 는 엄격한 토큰 예산이 아니라 행동 신호다. 낮은 강도에서도 어려운 문제에는 여전히 생각한다.
- 이전 방식인 `thinking: {type: "enabled", budget_tokens: N}` 은 최소 1,024 토큰이며, 예산은 목표치이지 상한이 아니다. 이 방식은 Claude 4.6 에서 지원 중단 상태이고 4.7 이후 모델은 400 오류로 거부한다.

### OpenAI

- 문서에는 `none`, `minimal`, `low`, `medium`, `high`, `xhigh`, `max` 일곱 레벨이 나오며 지원 범위는 모델마다 다르다. 일부 모델은 `none` 을 400 오류로 거부한다.
- 낮은 강도는 속도와 적은 토큰 사용에, 높은 강도는 더 완전한 사고와 높은 품질에 맞는다.
- 추론 토큰은 출력 토큰으로 과금되고 `max_output_tokens` 에 포함된다.

| 제품 | 확인한 레벨 이름 |
| --- | --- |
| Anthropic | low, medium, high, xhigh, max |
| OpenAI | none, minimal, low, medium, high, xhigh, max |
| 그 밖의 제품 | 미확인 |

## 예시

```python
response = client.messages.create(
    model="<모델 이름>",
    max_tokens=4096,
    messages=[{"role": "user", "content": "마이크로서비스와 모놀리식 구조의 장단점을 분석하라"}],
    output_config={"effort": "medium"},
)
```

이 코드는 Anthropic 공식 문서 예시를 옮긴 것이다. 같은 요청에서 `effort` 를 `low` 로 바꾸면 사고량과 토큰 사용이 줄어드는 대신 일부 능력이 줄 수 있다고 문서는 설명한다.

## 에이전트 맥락

Anthropic 문서는 하위 에이전트(subagent)처럼 단순하고 속도와 비용이 중요한 작업에는 `low`, 복잡한 추론과 어려운 코딩 문제에는 `high` 이상을 권한다. 낮은 강도에서는 도구 호출 수가 줄고 설명이 짧아지는 경향이 있다고도 한다. `xhigh` 이상을 쓸 때는 사고와 응답이 함께 `max_tokens` 를 소모하므로 큰 값을 설정하라는 안내가 있다. 어느 레벨이 낫다는 판단은 각자의 평가(eval)로 확인하라는 것이 두 제공사 문서의 공통 권고다.

## 흔한 오해

- **강도를 높이면 항상 더 좋은 답이 나온다.** 아니다. OpenAI 문서는 `xhigh` 가 평가에서 뚜렷한 이득이 있을 때만 가치가 있다고 하고, Anthropic 문서는 일부 모델에서 `max` 가 비용만 늘리거나 과도한 사고(overthinking)로 이어질 수 있다고 한다.
- **레벨 이름이 같으면 같은 사고량이다.** 아니다. Anthropic 문서는 모델마다 레벨이 재보정되므로 이전 모델의 설정을 그대로 가져오지 말고 다시 평가하라고 안내한다.
- **effort 는 토큰 상한이다.** 아니다. Anthropic 문서는 행동 신호이며 `max_tokens` 가 총 출력의 하드 상한이라고 구분한다.
- **프롬프트 문장으로 사고를 유도하는 것과 같다.** [사고 연쇄](../chain-of-thought/README.md)는 프롬프트로 풀이를 쓰게 하는 기법이고, 추론 강도는 모델이 쓰는 사고 토큰의 양을 설정으로 조절한다.

## 관련 용어

- 비교·인접 용어 (순서 없음)
  - [사고 연쇄](../chain-of-thought/README.md): 프롬프트로 중간 추론을 쓰게 하는 기법이며, 추론 강도는 제품의 사고 토큰 설정이다.

## 참고 자료

<!-- references:start -->
- [출처 목록](reference/sources.md) — 추론 강도 항목의 조사 출처와 미확인 항목
<!-- references:end -->
