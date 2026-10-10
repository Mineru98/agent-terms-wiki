---
title: F1 점수 출처
description: f1-score 항목의 출처 표와 미확인 사항
---

조회일: 2026-10-10

| 제목 | URL | 등급 | 확인한 내용 |
| --- | --- | --- | --- |
| scikit-learn Metrics and scoring | https://scikit-learn.org/stable/modules/model_evaluation.html | A | F-beta 식, F1 = 2tp / (2tp + fp + fn), micro/macro/weighted 정의, macro F 는 조화 평균이 아닌 산술 평균, zero_division |
| scikit-learn precision_recall_fscore_support | https://scikit-learn.org/stable/modules/generated/sklearn.metrics.precision_recall_fscore_support.html | A | F-beta 는 가중 조화 평균, average 옵션 설명 |
| Wikipedia: F-score | https://en.wikipedia.org/wiki/F-score | C | F1, F-beta 식, beta 의 의미, macro/micro 설명, micro F1 과 정확도 차이 |

## 미확인·충돌

- 표 값 중 "beta^2 배 중요"라는 표현은 위키백과에만 있고 scikit-learn 페이지는 "beta 배"로 서술한다(precision_recall_fscore_support 페이지는 weights recall more than precision by a factor of beta). 식 자체는 일치하며 표현이 충돌한다. 본문은 식과 위키백과 표현을 따랐다.
- micro F1 과 정확도의 관계: scikit-learn 은 다중 클래스에서 모든 레이블을 포함하면 같다고 하고, 위키백과는 일반적으로 같지 않다고 한다. 조건(단일 레이블, 다중 클래스)이 다른 서술로 보이나 완전한 정합은 미확인.
- F1 값 계산 예시는 작성자가 만든 계산 예이다.
