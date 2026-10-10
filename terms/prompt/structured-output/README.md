---
title: 구조화 출력 (Structured Output)
aliases: [구조화 출력, 구조화된 출력, JSON 모드, JSON 스키마 출력, structured outputs]
category: prompt
status: reviewed
updated: 2026-10-10
---

# 구조화 출력 (Structured Output)

> 모델의 응답이 사용자가 제공한 JSON 스키마(JSON Schema)를 따르도록 API 수준에서 제약하는 기능.

## 요약

- 모델이 자유로운 문장 대신 스키마에 맞는 JSON 을 반환하게 하는 기능이다.
- OpenAI 는 Structured Outputs 를 JSON 모드(JSON mode)의 발전형으로 설명한다. JSON 모드는 유효한 JSON 만 보장하고 스키마 일치는 검증하지 않는다.
- Anthropic 은 JSON 출력(`output_config.format`)과 엄격한 도구 사용(`strict: true`) 두 부분으로 제공하며, 유효한 JSON 과 스키마 준수를 보장한다고 설명한다.
- 거절(refusal)이나 `max_tokens` 도달 같은 경우에는 출력이 스키마와 맞지 않을 수 있어 응답 상태를 확인해야 한다.

## 왜 필요한가

프롬프트로 "JSON 으로만 답하라"고 요청하고 응답 문자열을 파싱하는 방식은, 설명 문장이 섞이거나 키가 빠지거나 형식이 깨지는 경우를 코드가 따로 처리해야 한다. 구조화 출력은 형식 오류의 상당 부분을 응답 생성 단계에서 막아, 검증과 재시도 코드를 줄인다. OpenAI 문서는 이 기능을 쓰면 형식을 강제하려고 강한 어조의 프롬프트를 쓸 필요가 줄어든다고 설명한다.

## 어떻게 동작하나

| 구분 | 자유 텍스트 파싱 | JSON 모드 | 스키마 기반 구조화 출력 |
| --- | --- | --- | --- |
| 형식 보장 | 없음(프롬프트에 의존) | 유효한 JSON | 스키마 일치(필수 키, enum 값 등) |
| 스키마 검증 | 호출자가 직접 | 호출자가 직접 | API 가 제약 |
| 실패 처리 | 파싱 실패 재시도 | 키 누락 검증 필요 | 거절, 잘림 같은 예외만 확인 |

Anthropic 의 흐름은 다음과 같다.

1. JSON 스키마를 정의한다.
2. 요청의 `output_config.format` 에 `type: "json_schema"` 로 넣는다.
3. 응답 텍스트 블록의 JSON 을 읽는다.

지원하지 않는 스키마 기능도 있다. Anthropic 문서는 재귀 스키마, 숫자 범위 제약(`minimum`, `maximum`), 문자열 길이 제약 등을 지원하지 않는다고 밝히며 지원하지 않는 기능을 쓰면 400 오류가 난다고 설명한다. 새 스키마의 첫 요청에는 문법 컴파일 때문에 지연이 추가된다.

## 예시

```python
response = client.messages.create(
    model="<모델 이름>",
    max_tokens=1024,
    messages=[{"role": "user", "content": "John Smith (john@example.com) 은 Enterprise 플랜 데모를 원한다."}],
    output_config={"format": {"type": "json_schema", "schema": {
        "type": "object",
        "properties": {
            "name": {"type": "string"},
            "email": {"type": "string"},
            "demo_requested": {"type": "boolean"},
        },
        "required": ["name", "email", "demo_requested"],
        "additionalProperties": False,
    }}},
)
```

반환 텍스트는 `{"name": "John Smith", "email": "john@example.com", "demo_requested": true}` 형태의 JSON 이어야 한다. 위 코드는 Anthropic 공식 문서 예시를 줄여 옮긴 것이다.

## 에이전트 맥락

에이전트가 도구를 호출할 때 인자가 스키마에 맞아야 하므로 엄격한 도구 사용(`strict: true`)이 같은 원리를 쓴다. 에이전트 출력을 다른 프로그램이 읽는 파이프라인에서도 구조화 출력이 쓰인다. 이런 용도에서 모델 출력은 형식만 보장될 뿐 내용의 정확성이나 안전성은 별개이므로, 값 검증은 코드가 맡아야 한다.

## 흔한 오해

- **JSON 모드와 같은 기능이 아니다.** OpenAI 문서는 JSON 모드가 유효한 JSON 만 보장하고 스키마 일치는 보장하지 않는다고 구분한다.
- **항상 스키마를 만족하는 것은 아니다.** 거절, `max_tokens` 도달로 인한 잘림에서는 출력이 스키마와 맞지 않을 수 있다.
- **값이 맞다는 뜻이 아니다.** 구조화 출력은 형식을 제약할 뿐 필드 값의 사실 여부를 보증하지 않는다. 이 해석은 위 문서가 형식 보장만 서술한다는 점에 근거한 정리이며, 별도 문구로 확인한 것은 아니다.

## 관련 용어

- 비교·인접 용어 (순서 없음)
  - [프롬프트 인젝션](../prompt-injection/README.md): 구조화 출력은 결과를 결정적 코드로 검증하는 방어의 일부로 쓰일 수 있으나, 인젝션 자체를 막지는 못한다.
  - [온도](../temperature/README.md): 구조화 출력은 형식을 제약하고, 온도는 샘플링의 무작위성을 조절한다. 서로 다른 축의 설정이다.

## 참고 자료

<!-- references:start -->
- [출처 목록](reference/sources.md) — 구조화 출력 항목의 조사 출처와 미확인 항목
<!-- references:end -->
