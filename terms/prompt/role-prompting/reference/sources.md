---
title: 출처 모음
description: 역할 프롬프팅 효과에 대한 공식 안내와 실험 연구의 출처
---

조회일: 2026-10-10

| 제목 | URL | 등급 | 확인한 내용 |
| --- | --- | --- | --- |
| Prompting best practices (Anthropic) | https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices | A | 시스템 프롬프트의 역할 지정이 행동과 어조를 집중시키며 한 문장도 차이를 만든다는 안내 |
| When "A Helpful Assistant" Is Not Really Helpful (Zheng et al., Findings of EMNLP 2024) | https://arxiv.org/abs/2311.10054 | A | 162개 역할, 4개 모델 계열, 사실 문제 2,410개. 페르소나가 대조군 대비 성능을 높이지 않음. 질문별 최선 페르소나 자동 선택은 무작위와 비슷 |

## 미확인·충돌

- 충돌 가능성: Anthropic 은 역할 지정이 도움이 된다고 안내하고, Zheng et al. 은 사실형 정확도에서 이득이 없다고 보고한다. 측정 대상이 다르다고 보이나 확정하지 못했다.
- "정확도 향상 근거가 약하다"는 핵심 주장은 동료 심사 논문 한 편에 의존한다. 최근 모델에 대한 재현 연구는 미확인. 그래서 status 는 draft.
- 코딩 에이전트에서 역할 이름의 용도 설명은 기억 기반·미확인.
