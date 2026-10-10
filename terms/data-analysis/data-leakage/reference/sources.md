---
title: 데이터 누수 출처
description: data-leakage 항목의 출처 표와 미확인 사항
---

조회일: 2026-10-10

| 제목 | URL | 등급 | 확인한 내용 |
| --- | --- | --- | --- |
| scikit-learn Common pitfalls (Data leakage) | https://scikit-learn.org/stable/common_pitfalls.html | A | 누수 정의, 분할 우선 원칙, fit 은 훈련에만, Pipeline, 특징 선택 실험(0.76 대 0.5) |
| Leakage in data mining: Formulation, detection, and avoidance (Kaufman et al., KDD 2011) | https://doi.org/10.1145/2020408.2020496 | A | 검색 결과의 초록으로만 확인. 누수 정의와 학습-예측 분리. 원문은 열지 않음 |
| Wikipedia: Leakage (machine learning) | https://en.wikipedia.org/wiki/Leakage_(machine_learning) | C | 특징 누수와 표본 누수 분류, 예시, 2023년 리뷰에서 17개 분야 294편 논문에서 누수 발견 |

## 미확인·충돌

- Kaufman 논문 원문은 열어 보지 못했다. A 출처 확인이 사실상 scikit-learn 1곳이므로 status 는 draft 이다.
- 누수와 과적합의 차이는 별도 출처로 확인하지 못했다.
- 위키백과의 "294편" 수치는 이 문서 본문에 쓰지 않았다(2차 인용).
- 에이전트 코드에서의 누수 발생 빈도는 미확인.
