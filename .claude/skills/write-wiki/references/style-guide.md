# 위키 글쓰기 가이드

조사에서 추린 원칙. 용어 README 를 쓰거나 고칠 때 적용한다.

1. **정의가 먼저, 짧게.** 첫 문장에서 대상을 식별하고 요약한다. MDN 용어집은 정의 한 문단 + 보충 최대 2문단을 권하고, Wikipedia lead 는 본문 비중에 맞춰 요약하되 상한을 4문단으로 둔다. 본문에 없는 내용을 lead 에만 두지 않는다.
2. **한 페이지 한 역할.** Diátaxis 는 문서를 tutorial / how-to / reference / explanation 으로 나누고, 한 페이지에 섞는 것을 가장 흔한 실패로 본다. 이 레포에서는 README = explanation(이해), `reference/` = reference(사실·스펙·원문)로 나눈다. 절차가 길어지면 별도 reference 로 뺀다.
3. **문제 → 해결 순서.** OpenSSF·TODO Group 용어 스타일처럼 "무엇이 문제인가 → 이 용어가 어떻게 푸는가"로 쓰면 정의만 나열할 때보다 기억에 남는다.
4. **세부는 링크로.** 용어 페이지에 모든 걸 담지 않는다. 더 깊은 내용은 reference 와 공식 문서 링크로 보낸다.
5. **예시를 넣는다.** 가장 작은 예시 하나가 설명 문단 여러 개보다 낫다.
6. **중립적이고 검증 가능하게.** 홍보 어조 금지. 수치·버전·날짜가 있는 주장은 출처를 reference 에 남긴다. 확인 못 한 내용은 `status: draft` 로 두고 본문에 "미확인" 이라고 쓴다.
7. **관련 용어로 연결한다.** 위키의 가치는 링크 그래프에서 나온다. 존재하는 용어는 상대 경로로 링크하고, 없는 용어는 링크하지 않는다.
8. **독자는 처음 보는 사람.** 약어는 처음 나올 때 풀어 쓴다. 한국어 설명 + 원어 병기(`컨텍스트 윈도우(context window)`).

## 출처

- [MDN Glossary page template](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Page_structures/Page_types/Glossary_page_template)
- [OpenSSF Glossary Style Guide](https://glossary.openssf.org/style-guide/)
- [TODO Group Glossary Style Guide](https://glossary.todogroup.org/style-guide/)
- [Diátaxis](https://diataxis.fr) · [Canonical 소개글](https://ubuntu.com/blog/diataxis-a-new-foundation-for-canonical-documentation)
- [Wikipedia: Manual of Style/Lead section](https://www.wikipedia.com/wiki/MOS:LS)
