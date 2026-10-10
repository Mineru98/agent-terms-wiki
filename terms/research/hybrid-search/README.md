---
title: 하이브리드 검색 (Hybrid Search)
aliases: [하이브리드 검색, 혼합 검색, hybrid retrieval]
category: research
status: reviewed
updated: 2026-10-10
---

# 하이브리드 검색 (Hybrid Search)

> 키워드 검색과 벡터 검색을 함께 실행하고, 두 결과를 하나의 순위 목록으로 합치는 검색 방식.

## 요약

- 키워드 검색(예: [BM25](../bm25/README.md))은 정확한 단어 일치에 강하고, 벡터 검색은 의미가 비슷한 문서를 찾는 데 강하다.
- 하이브리드 검색은 두 검색을 병렬로 실행해 결과를 융합(fusion)한다.
- 융합 방식은 순위만 쓰는 방식(예: [순위 역수 융합](../reciprocal-rank-fusion/README.md))과 점수를 정규화해 쓰는 방식으로 나뉜다.
- 제품에 따라 가중치 매개변수(예: Weaviate 의 alpha)로 두 검색의 비중을 조절한다.

## 왜 필요한가

벡터 검색은 키워드가 하나도 겹치지 않아도 개념이 비슷한 문서를 찾을 수 있다. 반면 제품 코드, 전문 용어, 날짜, 사람 이름처럼 정확한 일치가 중요한 질의는 키워드 검색이 더 잘 처리한다(Azure AI Search 문서). 한쪽만 쓰면 다른 쪽이 잘하는 질의에서 놓치는 문서가 생기므로 둘을 합친다.

## 어떻게 동작하나

1. 같은 질의를 키워드 검색과 벡터 검색에 동시에 보낸다. 두 검색은 점수 체계가 다르다(BM25 점수와 벡터 유사도).
2. 두 결과 집합을 융합한다.
   - 순위 기반: 점수 대신 순위만 사용한다. Azure AI Search 는 순위 역수 융합(RRF)으로 병합한다. Weaviate 의 Ranked Fusion 도 순위를 쓴다.
   - 점수 기반: Weaviate 의 Relative Score Fusion(v1.24 부터 기본값)은 각 검색의 상대 점수를 쓴다.
3. 하나의 순위 목록을 반환한다.

Weaviate 는 alpha 값이 1 이면 순수 벡터 검색, 0 이면 순수 키워드 검색이 되고, 사이 값은 두 검색의 비중을 정한다고 설명한다. alpha 를 지정하지 않을 때의 기본값은 클라이언트에 따라 다르다.

## 예시

Azure AI Search 의 요청은 하나의 요청에 `search`(전문 검색)와 `vectorQueries`(벡터 검색)를 함께 담는다.

```json
{
  "search": "historic hotel walk to restaurants and shopping",
  "vectorQueries": [{ "kind": "vector", "vector": [ ... ], "k": 50, "fields": "DescriptionVector" }],
  "top": 10
}
```

## 에이전트 맥락

[RAG](../rag/README.md) 파이프라인의 검색 단계에서 흔히 쓰인다. 코드 식별자처럼 정확한 문자열 일치가 필요한 질의와 자연어 질의가 섞이는 환경에서 한쪽 검색만 쓰는 것보다 선택 폭이 넓다. 코딩 에이전트 제품별 채택 현황은 조사하지 않았다(미확인).

## 흔한 오해

- **하이브리드 검색은 재순위화가 아니다.** 하이브리드는 서로 다른 두 검색의 후보를 합치는 단계이고, [재순위화](../reranker/README.md)는 합쳐진 후보를 질의와 함께 다시 채점하는 별도 단계다. 두 단계는 함께 쓸 수 있다.
- **벡터 검색이 키워드 검색을 대체하는 것이 아니다.** 정확한 일치가 중요한 질의에서는 키워드 검색이 여전히 유리하다.

## 관련 용어

- 먼저 알면 좋은 용어
  - [bm25](../bm25/README.md): 하이브리드 검색에서 키워드 쪽 점수로 흔히 쓰이는 방식.
- 비교·인접 용어 (순서 없음)
  - [reciprocal-rank-fusion](../reciprocal-rank-fusion/README.md): 두 결과의 순위를 합치는 대표적 융합 방식.
  - [reranker](../reranker/README.md): 융합 뒤 후보를 다시 채점하는 후속 단계.
  - [rag](../rag/README.md): 하이브리드 검색이 검색 단계로 쓰이는 생성 구조.

## 참고 자료

<!-- references:start -->
- [하이브리드 검색 출처 모음](reference/sources.md) — 하이브리드 검색 정의와 융합 방식 확인 결과
<!-- references:end -->
