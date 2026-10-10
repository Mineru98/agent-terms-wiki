---
title: RRF 출처 모음
description: RRF 식과 상수 k 확인 결과
---

# RRF 출처 모음

조회일: 2026-10-10

| 제목 | URL | 등급 | 확인한 내용 |
| --- | --- | --- | --- |
| Reciprocal rank fusion outperforms condorcet and individual rank learning methods (Google Research 서지 페이지) | https://research.google/pubs/pub36196/ | A | 저자(Cormack, Clarke, Buettcher), SIGIR '09 (32nd), pp. 758-759, 2009. 초록 본문은 페이지에 없었음 |
| Cormack et al., SIGIR 2009 PDF | https://plg.uwaterloo.ca/~gvcormac/cormacksigir09-rrf.pdf | A | PDF 가 압축되어 본문을 읽지 못함. 2쪽 분량이라는 메타데이터만 확인 |
| Reciprocal rank fusion (Elastic docs) | https://www.elastic.co/docs/reference/elasticsearch/rest-apis/reciprocal-rank-fusion | A | 점수는 1/(k + rank) 의 합, rank 는 1 부터, rank_constant 기본값 60 이고 최소 1, 값이 클수록 낮은 순위 문서의 영향 증가, 가중치 없이 동등하게 합산 |
| Hybrid search overview (Azure AI Search) | https://learn.microsoft.com/en-us/azure/search/hybrid-search-overview | A | 하이브리드 쿼리 결과를 RRF 로 병합 |
| 웹 검색 결과 요약 (논문 설명) | https://ir.webis.de/anthology/2009.sigirconf_conference-2009.146/ | C | 식 1/(k + r(d)) 와 "예비 실험에서 k = 60 으로 고정" 이라는 요약. 요약문이며 논문 본문 대조는 못 함 |

## 미확인·충돌

- 원 논문 본문을 직접 읽지 못해, 논문이 k = 60 을 택한 근거 문장과 식의 정확한 표기는 미확인이다. 식은 Elastic 문서(A)로 확인했고 k = 60 은 Elastic 기본값(A)과 검색 요약(C)이 일치한다.
- 위 사유로 핵심 주장의 논문 직접 확인이 없어 status 는 draft 이다.
