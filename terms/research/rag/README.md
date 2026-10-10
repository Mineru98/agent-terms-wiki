---
title: 검색 증강 생성 (Retrieval-Augmented Generation, RAG)
aliases: [RAG, 검색 증강 생성, 검색 증강, retrieval-augmented generation]
category: research
status: draft
updated: 2026-10-10
---

# 검색 증강 생성 (Retrieval-Augmented Generation, RAG)

> 언어 모델이 답을 생성하기 전에 외부 저장소에서 관련 문서를 검색하고, 검색된 내용을 근거로 삼아 생성하게 하는 방식.

## 요약

- RAG 는 모델 가중치에 담긴 지식(parametric memory)과 외부 문서 저장소(non-parametric memory)를 함께 쓰는 구조다.
- 원 논문은 Lewis 등(2020)이며, 사전 학습된 seq2seq 모델과 Wikipedia 의 밀집 벡터 색인 검색기를 결합했다.
- 논문은 RAG-Sequence(출력 전체가 같은 검색 문서 집합에 조건화)와 RAG-Token(토큰마다 다른 문서를 활용) 두 변형을 제시했다.
- 오늘날 흔히 쓰는 "검색 결과를 프롬프트에 붙여 모델에 넣는" 방식은 이 논문의 구현과 세부가 다를 수 있다. 이 차이는 이 문서에서 별도로 검증하지 않았다(미확인).

## 왜 필요한가

언어 모델의 가중치에 담긴 지식은 학습 시점에 고정되고, 어떤 근거에서 나온 답인지 제시하기 어렵다. 지식을 갱신하려면 모델을 다시 학습해야 한다. 원 논문의 초록도 사전 학습 모델이 사실 지식을 저장하지만 이를 정확히 접근하고 다루는 능력은 제한적이며, 출처 제시와 지식 갱신이 열린 문제라고 지적한다. RAG 는 외부 저장소를 바꾸는 것으로 지식을 갱신하고 검색된 문서를 근거로 제시할 수 있게 한다.

## 어떻게 동작하나

1. 질의를 받으면 검색기가 문서 저장소에서 관련 문서(또는 문단)를 찾는다.
2. 검색된 문서를 질의와 함께 생성 모델에 입력한다.
3. 생성 모델이 입력된 문서를 근거로 답을 만든다.

원 논문에서는 검색기가 Wikipedia 의 밀집 벡터 색인을 조회하고, 이 검색 과정이 미분 가능해 검색기와 생성기를 함께 미세 조정(fine-tuning)한다. 실무에서는 검색 단계에 [하이브리드 검색](../hybrid-search/README.md)과 [재순위화](../reranker/README.md)를 덧붙여 근거 문서의 품질을 높이는 경우가 많다.

## 예시

가장 단순한 형태의 의사 코드이다.

```python
docs = retriever.search(question, top_k=5)
prompt = "다음 문서만 근거로 답하라.\n" + "\n".join(docs) + "\n질문: " + question
answer = llm.generate(prompt)
```

## 에이전트 맥락

코딩 에이전트는 저장소 코드, 문서, 이슈를 검색해 컨텍스트에 넣는 단계에서 RAG 와 같은 구조를 쓴다. 다만 구체적인 제품별 구현은 이 문서에서 조사하지 않았다(미확인).

## 흔한 오해

- **RAG 는 모델을 학습시키는 기법이 아니다.** 원 논문은 미세 조정을 포함하지만, 일반적으로 RAG 는 추론 시점에 검색 결과를 붙이는 구조를 가리키는 경우가 많다.
- **검색만 하면 정확하다는 뜻이 아니다.** 검색이 엉뚱한 문서를 가져오면 생성도 그 문서에 영향을 받는다.

## 관련 용어

- 비교·인접 용어 (순서 없음)
  - [hybrid-search](../hybrid-search/README.md): RAG 의 검색 단계에서 키워드 검색과 벡터 검색을 결합하는 방식.
  - [reranker](../reranker/README.md): RAG 에서 검색된 후보를 다시 채점해 근거 문서의 순서를 정리하는 단계.

## 참고 자료

<!-- references:start -->
- [RAG 출처 모음](reference/sources.md) — RAG 원 논문 확인 결과와 미확인 항목
<!-- references:end -->
