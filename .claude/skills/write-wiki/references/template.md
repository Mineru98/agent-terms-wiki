# 용어 README 템플릿

`terms/<category>/<keyword>/README.md` 의 표준 형식. 섹션 제목은 스크립트(`sync-references.mjs --check`)가 검사하므로 그대로 쓴다.

````markdown
---
title: Model Context Protocol
aliases: [MCP]
category: development
status: draft
updated: 2026-10-10
prev: [development/json-rpc]
next: [development/skill, development/tool-use]
---

# Model Context Protocol

> 한두 문장으로 끝나는 정의. 이 문장만 읽어도 용어가 무엇인지 알 수 있어야 한다.

## 요약

- 핵심 3~5줄. 처음 보는 사람이 여기서 멈춰도 오해하지 않을 정도.

## 왜 필요한가

이 용어가 풀려는 문제. 없을 때 무엇이 불편한지. 2~4문장.

## 어떻게 동작하나

핵심 개념과 흐름. 필요하면 표나 짧은 다이어그램. 세부 스펙은 reference 로 넘긴다.

## 예시

가장 작은 실제 예시(코드, 명령, 프롬프트, 문장). 설명보다 예시가 먼저 이해를 만든다.

## 에이전트 맥락

(선택) 코딩 에이전트가 이 용어를 실제로 어떻게 쓰고 만나는지.

## 흔한 오해

(선택) 비슷한 용어와 혼동되는 지점.

## 관련 용어

- 먼저 알면 좋은 용어 (prev)
  - [json-rpc](../json-rpc/README.md) — 왜 먼저 알아야 하는지 한 줄
- 이어서 볼 용어 (next)
  - [skill](../skill/README.md) — 한 줄 관계 설명
  - [tool-use](../tool-use/README.md) — 한 줄 관계 설명
- 비교·인접 용어 (순서 없음)
  - [plugin](../plugin/README.md) — 혼동하기 쉬운 지점

## 참고 자료

<!-- references:start -->
<!-- references:end -->
````

## 필드 규칙

| 필드 | 규칙 |
| --- | --- |
| `title` | 공식 표기. 폴더명(kebab-case)과 달라도 된다 |
| `aliases` | 약어·다른 표기. 검색(`ask-wiki`)에 쓰인다 |
| `category` | 상위 폴더명과 반드시 일치 |
| `status` | `draft`(조사 결과 미검수) 또는 `reviewed`(출처 대조 완료) |
| `updated` | `YYYY-MM-DD` |
| `prev` | (선택) 이 용어 전에 알면 좋은 용어. `category/slug` 목록. 여러 개 가능 |
| `next` | (선택) 이 용어 다음에 보면 좋은 용어. `category/slug` 목록. 여러 개 가능 |

### prev / next 규칙

- 링크드 리스트를 여러 갈래로 확장한 구조다. 한 용어가 앞·뒤를 여럿 가질 수 있어 학습 순서가 DAG 를 이룬다.
- 양방향으로 맞춘다. A.next 에 B 가 있으면 B.prev 에 A 가 있어야 한다. `--check` 가 검사한다.
- 존재하는 용어만 쓴다. 자기 자신, 순환(next 를 따라가 돌아옴)은 금지.
- `prev`/`next` 는 "배우는 순서"가 분명할 때만 쓴다. 순서 없는 비교·인접 용어는 본문 `관련 용어` 의 별도 항목에만 둔다.
- front matter 의 prev/next 와 본문 `관련 용어` 링크는 같은 내용을 가리켜야 한다.

## reference/*.md 규칙

- 원문 보존·상세 스펙·출처 모음을 둔다. README 에 넣기엔 긴 내용의 자리다.
- 파일명은 kebab-case. front matter 는 선택이며 `title`, `description`(한 줄) 을 쓰면 README 목록에 반영된다.
- 파일 상단에 출처 URL 과 조회일을 적는다.
- 추가·삭제 후 `sync-references.mjs` 를 실행하면 README 의 `references` 마커 사이가 갱신된다.
