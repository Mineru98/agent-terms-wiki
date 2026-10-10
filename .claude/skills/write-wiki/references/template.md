# 용어 README 템플릿

`terms/<category>/<keyword>/README.md` 의 표준 형식. 섹션 제목은 스크립트(`sync-references.mjs --check`)가 검사하므로 그대로 쓴다.

````markdown
---
title: Model Context Protocol
aliases: [MCP]
category: development
status: draft
updated: 2026-10-10
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

- [skill](../skill/README.md) — 한 줄 관계 설명

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

## reference/*.md 규칙

- 원문 보존·상세 스펙·출처 모음을 둔다. README 에 넣기엔 긴 내용의 자리다.
- 파일명은 kebab-case. front matter 는 선택이며 `title`, `description`(한 줄) 을 쓰면 README 목록에 반영된다.
- 파일 상단에 출처 URL 과 조회일을 적는다.
- 추가·삭제 후 `sync-references.mjs` 를 실행하면 README 의 `references` 마커 사이가 갱신된다.
