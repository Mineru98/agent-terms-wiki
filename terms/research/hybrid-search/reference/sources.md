---
title: 하이브리드 검색 출처 모음
description: 하이브리드 검색 정의와 융합 방식 확인 결과
---

# 하이브리드 검색 출처 모음

조회일: 2026-10-10

| 제목 | URL | 등급 | 확인한 내용 |
| --- | --- | --- | --- |
| Hybrid search (Weaviate docs) | https://docs.weaviate.io/weaviate/search/hybrid | A | 벡터 검색과 키워드(BM25F) 검색 결과를 융합. alpha 1 은 순수 벡터, 0 은 순수 키워드. Relative Score Fusion 이 v1.24 부터 기본, Ranked Fusion 은 순위 기반 |
| Hybrid search overview (Azure AI Search, Microsoft Learn) | https://learn.microsoft.com/en-us/azure/search/hybrid-search-overview | A | 하나의 요청에서 전문 검색과 벡터 검색을 병렬 실행하고 RRF 로 병합. 정확 일치가 중요한 질의(제품 코드, 전문 용어, 날짜, 이름)는 키워드 검색이 유리 |

## 미확인·충돌

- 출처 간 충돌은 없었다.
- 코딩 에이전트 제품에서의 하이브리드 검색 채택은 조사하지 않았다.
- Weaviate 의 alpha 기본값은 클라이언트별로 다르다고만 확인했고, 구체 값은 미확인.
