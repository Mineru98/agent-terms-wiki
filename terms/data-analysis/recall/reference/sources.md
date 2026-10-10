---
title: 재현율 출처
description: recall 항목의 출처 표와 미확인 사항
---

조회일: 2026-10-10

| 제목 | URL | 등급 | 확인한 내용 |
| --- | --- | --- | --- |
| scikit-learn Metrics and scoring | https://scikit-learn.org/stable/modules/model_evaluation.html | A | recall = tp / (tp + fn), recall 의 별칭 sensitivity, balanced accuracy 정의 |
| scikit-learn precision_recall_fscore_support | https://scikit-learn.org/stable/modules/generated/sklearn.metrics.precision_recall_fscore_support.html | A | 재현율의 직관적 설명 |
| Wikipedia: Precision and recall | https://en.wikipedia.org/wiki/Precision_and_recall | C | 정밀도와 재현율의 반대 방향 경향, 연기 감지기와 형사 재판 예 |

## 미확인·충돌

- 임곗값 변화에 따른 트레이드오프는 위키백과 요약으로만 확인했고 A 출처에서 직접 확인하지 못했다. 본문에서 경향으로 표현했다.
- TPR 별칭은 일반 지식에 기반하며 열어 본 페이지에서 직접 확인하지 못했다. 미확인.
- 임곗값 예시(양성 예측 400개, TP 160)는 작성자가 만든 가정이다.
- 충돌하는 정의는 발견하지 못했다.
