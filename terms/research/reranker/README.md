---
title: 재순위화 (Reranking, 리랭커)
aliases: [리랭커, 재순위화, 재정렬, reranker, cross-encoder]
category: research
status: reviewed
updated: 2026-10-10
---

# 재순위화 (Reranking, 리랭커)

> 1차 검색이 가져온 후보 문서를 질의와 함께 다시 채점해 순서를 바로잡는 2단계 검색 구조, 또는 그 채점 모델.

## 요약

- 1단계 검색기는 수백만 건에서 후보 약 100건 안팎을 빠르게 추리고, 2단계 재순위화 모델이 후보만 정밀하게 다시 채점한다.
- 재순위화 모델로는 질의와 문서를 한 번에 입력하는 cross-encoder 가 대표적이다.
- 1단계의 bi-encoder 는 질의와 문서를 따로 벡터로 만들어 비교하므로 빠르지만, cross-encoder 는 둘을 함께 읽어 더 정확하다.
- Cohere 같은 API 는 질의와 문서 목록을 받아 관련도 점수 순으로 돌려주는 형태로 제공한다.

## 왜 필요한가

모든 (질의, 문서) 쌍을 cross-encoder 로 채점하면 컬렉션이 클 때 너무 느리다. Sentence Transformers 문서도 수천에서 수백만 쌍의 채점은 느리다고 설명한다. 반대로 빠른 1단계 검색만 쓰면 느슨하게 관련된 문서가 상위에 섞인다. 그래서 빠른 검색으로 후보를 줄이고, 후보에 한해 정밀한 모델을 쓰는 2단계 구조를 쓴다.

## 어떻게 동작하나

1. 1차 검색: 키워드 검색([BM25](../bm25/README.md)), bi-encoder 벡터 검색, 또는 [하이브리드 검색](../hybrid-search/README.md)으로 후보 약 100건을 구한다.
2. 재순위화: cross-encoder 에 질의와 후보 문서를 쌍으로 넣는다. 모델이 두 텍스트에 걸쳐 어텐션을 계산하고 0 에서 1 사이의 관련도 점수 하나를 낸다.
3. 점수 순으로 재정렬해 상위 몇 건을 사용자나 생성 모델에 넘긴다.

| 구분 | bi-encoder | cross-encoder |
| --- | --- | --- |
| 입력 | 질의와 문서를 따로 인코딩 | 질의와 문서를 함께 인코딩 |
| 문서 벡터 사전 계산 | 가능 | 불가능 (쌍마다 계산) |
| 속도 | 빠름 | 느림 |
| 정확도 | 상대적으로 낮음 | 더 높음 |
| 용도 | 1단계 검색 | 2단계 재순위화 |

BERT 를 passage 재순위화에 적용한 Nogueira 와 Cho(2019)는 MS MARCO passage 검색 리더보드에서 MRR@10 기준 이전 최고 대비 27% 상대 향상을 보고했다.

## 예시

Cohere Rerank 요청은 질의, 문서 목록, 반환 개수를 받는다. 응답은 관련도 순서로 정렬된 결과이며 각 항목에 입력 문서의 위치(index)와 relevance_score 가 담긴다.

```json
{ "model": "rerank-v4.0-pro", "query": "RRF 의 상수 k 는?", "documents": ["...", "..."], "top_n": 3 }
```

## 에이전트 맥락

[RAG](../rag/README.md)에서 검색 후보가 많아도 컨텍스트에 넣을 수 있는 양은 제한되므로, 재순위화로 상위 몇 건만 골라 넣는 구성이 흔하다. 제품별 구성은 조사하지 않았다(미확인).

## 흔한 오해

- **리랭커는 검색기가 아니다.** 전체 컬렉션을 검색하지 않고 1차 검색이 준 후보만 다시 채점한다. 1차 검색이 놓친 문서는 되살리지 못한다.
- **cross-encoder 와 리랭커는 같은 말이 아니다.** 리랭커는 역할(재순위화 단계)이고 cross-encoder 는 그 역할에 쓰는 대표적 모델 구조다. Cohere Rerank 등 상용 API 의 내부 구조는 확인하지 못했다(미확인).
- **[순위 역수 융합](../reciprocal-rank-fusion/README.md)과 다르다.** RRF 는 기존 순위만 합치고, 리랭커는 질의와 문서 내용을 다시 읽어 점수를 낸다.

## 관련 용어

- 비교·인접 용어 (순서 없음)
  - [rag](../rag/README.md): 재순위화된 상위 문서가 생성 모델의 근거로 들어간다.
  - [hybrid-search](../hybrid-search/README.md): 재순위화 앞단의 1차 검색으로 쓰이는 결합 방식.
  - [reciprocal-rank-fusion](../reciprocal-rank-fusion/README.md): 점수 없이 순위만 합치는, 재순위화와 구분되는 융합 방식.
  - [bm25](../bm25/README.md): 1차 검색에 쓰이는 키워드 점수.

## 참고 자료

<!-- references:start -->
- [재순위화 출처 모음](reference/sources.md) — 2단계 검색 구조와 cross-encoder 확인 결과
<!-- references:end -->
