---
title: BM25 출처 모음
description: BM25 식과 k1, b 의미 확인 결과
---

# BM25 출처 모음

조회일: 2026-10-10

| 제목 | URL | 등급 | 확인한 내용 |
| --- | --- | --- | --- |
| Okapi BM25: a non-binary model (Introduction to Information Retrieval) | https://nlp.stanford.edu/IR-book/html/htmledition/okapi-bm25-a-non-binary-model-1.html | A | 식(86), k1 과 b 의 의미, b = 0.75 와 k1 1.2 에서 2 의 일반적 값, 확률적 모델로 개발되었다는 설명 |
| Practical BM25 Part 2: The BM25 Algorithm and its Variables (Elastic) | https://www.elastic.co/blog/practical-bm25-part-2-the-bm25-algorithm-and-its-variables | B | IDF, TF, 길이 정규화 구성 요소. b 기본 0.75, k1 기본 1.2 |
| The Probabilistic Relevance Framework: BM25 and Beyond (Robertson, Zaragoza, 2009) | https://nowpublishers.com/article/Details/INR-019 | A | 서지 정보와 초록 요약을 검색 결과로만 확인(본문 접근은 403). BM25 가 확률적 관련성 프레임워크에서 나왔다는 점 |

## 미확인·충돌

- Elastic 글의 수식은 이미지여서 읽지 못했고, 식은 Stanford 교재 기준이다. 구현체별 IDF 형태 차이는 세부 확인하지 않았다.
- Robertson 과 Zaragoza 논문 본문은 열람하지 못했다.
