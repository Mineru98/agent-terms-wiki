---
title: 출처 모음
description: 퓨샷 프롬프팅 원 논문과 예시 순서·선택 연구의 출처
---

조회일: 2026-10-10

| 제목 | URL | 등급 | 확인한 내용 |
| --- | --- | --- | --- |
| Language Models are Few-Shot Learners (Brown et al., 2020) | https://arxiv.org/abs/2005.14165 | A | 초록: 규모 확대가 few-shot 성능을 크게 높임, 작업과 시연이 텍스트로만 주어지고 가중치 갱신 없음. 본문: few-shot 은 컨텍스트에 들어가는 만큼(보통 10에서 100), in-context learning 용어 정의 |
| Prompting best practices (Anthropic) | https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices | A | 예시는 relevant, diverse, structured. `<example>` 태그. 3개에서 5개 권장 |
| Prompt engineering (OpenAI) | https://developers.openai.com/api/docs/guides/prompt-engineering | A | 입력과 출력 예시 몇 개로 미세조정 없이 유도. 다양한 입력 권장 |
| Fantastically Ordered Prompts and Where to Find Them (Lu et al., ACL 2022) | https://arxiv.org/abs/2104.08786 | A | 예시 순서에 따라 최고 수준에서 무작위 수준까지 변동. 모델 간 전이 안 됨 |
| Rethinking the Role of Demonstrations (Min et al., 2022) | https://arxiv.org/abs/2202.12837 | A | 레이블을 무작위로 바꿔도 성능이 거의 유지됨(12개 모델). 레이블 공간, 입력 분포, 형식이 중요 |

## 미확인·충돌

- 최적 예시 개수에 대한 일반 규칙은 없다. Anthropic 의 3개에서 5개는 권고이며 Brown et al. 의 10에서 100개와는 맥락(모델 세대와 작업)이 다르다.
- Min et al. 의 결과는 분류·객관식 작업 기준이며 코드 생성 등에 대한 일반화는 미확인.
- 코딩 에이전트에서의 활용 문단은 기억 기반·미확인.
