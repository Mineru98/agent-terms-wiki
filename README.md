# agent-terms-wiki

코딩 에이전트에서 자주 쓰는 용어를 위키 형식으로 쌓고 학습하기 위한 레포.

## 구조

```
terms/
  <category>/          # development, video-generate, image-generate, legal, research, data-analysis, ...
    <keyword>/         # kebab-case slug
      README.md        # 정의·동작·예시 (고정 템플릿)
      reference/*.md   # 원문·스펙·출처 (README 에 자동 목록화)
```

## 스킬 (`.claude/skills`)

| 스킬 | 역할 |
| --- | --- |
| `research-term` | 키워드를 병렬로 조사해 출처 달린 보고서를 만든다 |
| `write-wiki` | 붙여넣은 글 또는 새 조사 결과를 위키 규격으로 등록한다 |
| `ask-wiki` | 등록된 용어를 찾아 설명한다 |

## reference 목록 동기화

`reference/` 에 파일을 직접 추가·삭제했다면 아래를 실행한다. README 의 `references` 마커 사이가 갱신된다.

```bash
node .claude/skills/write-wiki/scripts/sync-references.mjs            # 전체
node .claude/skills/write-wiki/scripts/sync-references.mjs --check    # 형식 검사
```
