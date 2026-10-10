---
title: 출처 모음
description: 시스템 프롬프트, 역할 구분, CLAUDE.md 와 AGENTS.md 전달 방식의 출처
---

조회일: 2026-10-10

| 제목 | URL | 등급 | 확인한 내용 |
| --- | --- | --- | --- |
| Prompting best practices (Anthropic) | https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices | A | 시스템 프롬프트에 역할을 두면 행동과 어조가 집중된다는 안내 |
| Prompt engineering (OpenAI) | https://developers.openai.com/api/docs/guides/prompt-engineering | A | developer, user, assistant 역할. developer 는 user 보다 우선. system 역할은 다루지 않음 |
| How Claude remembers your project (Claude Code) | https://code.claude.com/docs/en/memory | A | CLAUDE.md 는 시스템 프롬프트 뒤의 사용자 메시지로 전달. 맥락이며 강제 설정이 아님. --append-system-prompt, PreToolUse 훅 안내. AGENTS.md 읽기 지원 |
| AGENTS.md | https://agents.md | B | 코딩 에이전트용 프로젝트 지침 파일. 가까운 파일 우선, 채팅의 명시적 지시가 우선 (WebFetch 요약 기준) |

## 미확인·충돌

- Anthropic 의 `system` 매개변수 설명은 best practices 문서의 역할 부여 절에서 간접 확인했고, Messages API 레퍼런스는 직접 열지 않았다.
- Claude Code 외 다른 도구(Codex 등)가 AGENTS.md 를 시스템 프롬프트로 넣는지 사용자 메시지로 넣는지는 미확인.
- 특정 제품의 내부 시스템 프롬프트는 조사하지 않았다.
