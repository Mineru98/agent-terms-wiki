---
title: 재순위화 출처 모음
description: 2단계 검색 구조와 cross-encoder 확인 결과
---

# 재순위화 출처 모음

조회일: 2026-10-10

| 제목 | URL | 등급 | 확인한 내용 |
| --- | --- | --- | --- |
| Retrieve & Re-Rank (Sentence Transformers docs) | https://www.sbert.net/examples/applications/retrieve_rerank/README.html | A | 검색으로 후보 약 100건, cross-encoder 로 재순위화. bi-encoder 는 따로 임베딩, cross-encoder 는 쌍을 함께 입력해 0 에서 1 사이 점수. 모든 쌍을 채점하면 느림 |
| Passage Re-ranking with BERT (Nogueira, Cho) | https://arxiv.org/abs/1901.04085 | A | BERT 를 passage 재순위화에 적용. TREC-CAR 최고 성능, MS MARCO 에서 MRR@10 이전 최고 대비 27% 상대 향상 주장 |
| Rerank overview (Cohere docs) | https://docs.cohere.com/docs/rerank-overview | A | 질의에 대한 의미적 관련도로 문서를 정렬하는 API. 입력 model, query, documents, top_n. 출력 index 와 relevance_score |

## 미확인·충돌

- Cohere 문서에는 1차 검색 이후 단계라는 위치 설명이 없었다. 2단계 구조 설명은 Sentence Transformers 문서에 근거한다.
- 상용 리랭커 API 내부가 cross-encoder 인지는 확인하지 못했다.
