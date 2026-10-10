---
title: 시스템 프롬프트 (System Prompt)
aliases: [시스템 프롬프트, 시스템 메시지, system prompt, system message]
category: prompt
status: reviewed
updated: 2026-10-10
---

# 시스템 프롬프트 (System Prompt)

> 사용자 턴(user turn)과 구분되어 대화 전체에 적용되는, 개발자가 모델에 주는 상위 지침.

## 요약

- API 에서 사용자 메시지와 별도의 위치(system 매개변수 또는 system/developer 역할 메시지)에 두는 지침이다.
- 역할, 말투, 규칙, 출력 형식처럼 대화 내내 유지할 내용을 담는다.
- OpenAI 문서는 developer 메시지가 user 메시지보다 우선하며, 함수 정의가 규칙을 정하고 사용자 입력이 인자로 들어가는 관계와 비슷하다고 설명한다.
- 코딩 에이전트에서 CLAUDE.md 는 Claude Code 문서상 시스템 프롬프트가 아니라 시스템 프롬프트 뒤의 사용자 메시지로 전달된다.

## 왜 필요한가

모든 요청마다 같은 규칙을 사용자 메시지에 반복하면 번거롭고 누락되기 쉽다. 또 최종 사용자가 입력하는 내용과 개발자가 정한 규칙이 한곳에 섞이면 우선순위가 불분명해진다. 시스템 프롬프트는 규칙을 별도 자리에 두어 이 문제를 줄인다.

## 어떻게 동작하나

| 역할 | 작성자 | 성격 |
| --- | --- | --- |
| system 또는 developer | 애플리케이션 개발자 | 규칙과 배경. 사용자 메시지보다 우선 |
| user | 최종 사용자 | 이번 요청의 입력 |
| assistant | 모델 | 생성된 응답 |

제공사마다 이름과 위치가 다르다. Anthropic Messages API 는 `system` 매개변수를 따로 두고, OpenAI 문서는 `developer` 역할을 사용한다. 우선순위의 세부 규칙은 제공사별 문서를 확인해야 한다.

## 예시

```python
client.messages.create(
    model="...",
    max_tokens=512,
    system="당신은 코드 리뷰어다. 지적 사항은 번호 목록으로만 답한다.",
    messages=[{"role": "user", "content": "이 diff 를 검토해 줘."}],
)
```

## 에이전트 맥락

Claude Code 문서는 CLAUDE.md 가 매 세션 시작 시 불러와지는 지속 지침이라고 설명한다. 같은 문서에 따르면 CLAUDE.md 내용은 시스템 프롬프트의 일부가 아니라 시스템 프롬프트 뒤에 사용자 메시지로 전달되며, 모델은 이를 강제 설정이 아닌 맥락으로 다루므로 엄격한 준수가 보장되지 않는다. 시스템 프롬프트 수준에 지침을 두려면 `--append-system-prompt` 플래그를 쓰라고 안내한다. 동작을 반드시 막아야 하면 PreToolUse 훅(hook)을 쓰라고도 한다.

AGENTS.md 는 코딩 에이전트에 프로젝트별 지침을 주는 공개 형식의 마크다운 파일이다. agents.md 사이트에 따르면 가까운 디렉터리의 파일이 우선하고 사용자가 채팅에서 준 명시적 지시가 파일보다 우선한다. Claude Code 는 저장소에 AGENTS.md 가 있으면 이를 프로젝트 지침으로 읽을 수 있다.

특정 제품의 내부 시스템 프롬프트 전문은 이 문서에서 다루지 않는다. 공식 문서로 확인된 것은 위 내용뿐이다.

## 흔한 오해

- **지침 파일이 곧 시스템 프롬프트라는 오해.** Claude Code 에서 CLAUDE.md 는 사용자 메시지로 전달된다는 것이 공식 문서의 설명이다. 다른 도구는 방식이 다를 수 있으며 미확인이다.
- **시스템 프롬프트에 쓰면 반드시 지킨다는 오해.** 모델은 지침을 따르려 하지만 위반 가능성은 남는다. 강제가 필요하면 훅이나 권한 설정 같은 별도 장치가 필요하다.

## 관련 용어

- 비교·인접 용어 (순서 없음)
  - [prompt-engineering](../prompt-engineering/README.md): 시스템 프롬프트를 쓰는 일은 프롬프트 설계의 일부다.
  - [role-prompting](../role-prompting/README.md): 역할 지정을 시스템 프롬프트에 두는 경우가 많다.
  - [zero-shot-prompting](../zero-shot-prompting/README.md): 시스템 프롬프트에 지시만 쓰고 예시를 넣지 않는 방식.
  - [few-shot-prompting](../few-shot-prompting/README.md): 시스템 프롬프트에 예시를 함께 넣는 방식.

## 참고 자료

<!-- references:start -->
- [출처 모음](reference/sources.md) — 시스템 프롬프트, 역할 구분, CLAUDE.md 와 AGENTS.md 전달 방식의 출처
<!-- references:end -->
