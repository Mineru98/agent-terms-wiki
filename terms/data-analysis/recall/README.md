---
title: 재현율 (Recall)
aliases: [재현율, 리콜, 민감도, sensitivity, recall, TPR]
category: data-analysis
status: reviewed
updated: 2026-10-10
---

# 재현율 (Recall)

> 실제 양성 중에서 모델이 양성으로 찾아낸 비율.

## 요약

- 재현율은 TP / (TP + FN) 이다. FN 은 놓친 양성(거짓 음성)이다.
- 민감도(sensitivity), 참 양성률(true positive rate, TPR)과 같은 값이다.
- 놓침을 줄이는 쪽의 지표이며, [정밀도](../precision/README.md)와 보통 한쪽을 올리면 다른 쪽이 내려가는 트레이드오프가 있다.
- 두 값을 하나로 묶은 지표가 [F1 점수](../f1-score/README.md)이다.

## 왜 필요한가

질병 검진이나 보안 탐지처럼 양성을 놓치는 비용이 큰 문제에서는 [정확도](../accuracy/README.md)로 놓친 양성을 파악하기 어렵다. 재현율은 실제 양성 중 몇 개를 잡았는지를 직접 보여 준다.

## 어떻게 동작하나

```
recall = TP / (TP + FN)
```

scikit-learn 문서는 재현율을 분류기가 모든 양성 표본을 찾는 능력으로 설명하고, 이진 분류에서 재현율을 sensitivity 라고도 적는다.

정밀도와의 트레이드오프는 분류 임곗값(threshold)으로 설명된다. 임곗값을 낮추면 더 많은 표본을 양성으로 예측해 재현율은 오르지만 거짓 양성이 늘어 정밀도가 내려가는 경향이 있다. 위키백과에 따르면 모든 표본을 양성으로 예측하면 재현율 1 은 쉽게 얻고, 확실한 소수만 고르면 정밀도 1 에 가까워진다. 연기 감지기는 재현율을, 형사 재판은 정밀도를 중시하는 예로 소개된다. 이 경향은 항상 성립하는 법칙은 아니며 모델과 데이터에 따라 달라진다.

## 예시

실제 양성 200개 중 80개를 찾고 120개를 놓치면 TP = 80, FN = 120 이다.

```
recall = 80 / (80 + 120) = 0.4
```

양성으로 예측한 것이 100개(TP 80, FP 20)이면 정밀도는 0.8 이다. 임곗값을 낮춰 양성 예측을 400개로 늘렸더니 TP 가 160 이 되었다면 재현율은 0.8 로 오르고, 정밀도는 160 / 400 = 0.4 로 내려간다. 이 수치는 설명을 위한 가정이다.

```python
from sklearn.metrics import recall_score
recall_score(y_true, y_pred)
```

## 흔한 오해

- **재현율의 "재현"은 재현성과 무관하다.** [재현성](../reproducibility/README.md)은 결과를 다시 만들 수 있는 성질이고, 재현율은 분류 지표이다. 영어 recall 의 번역어일 뿐이다.
- **재현율이 높다고 좋은 모델이 아니다.** 전부 양성으로 예측하면 재현율은 1 이지만 정밀도는 양성 비율로 낮아진다.
- **재현율은 음성 표본을 보지 않는다.** 음성을 얼마나 잘 가려내는지는 특이도(specificity)가 다룬다. 균형 정확도는 재현율과 특이도의 평균이다.

## 관련 용어

- 비교·인접 용어 (순서 없음)
  - [precision](../precision/README.md): 트레이드오프 관계의 짝 지표.
  - [f1-score](../f1-score/README.md): 재현율과 정밀도의 조화 평균. F-beta 로 재현율에 가중을 둘 수 있다.
  - [accuracy](../accuracy/README.md): 불균형 데이터에서 재현율 저하를 가린다.
  - [data-leakage](../data-leakage/README.md): 재현율 같은 평가 수치를 부풀리는 원인.

## 참고 자료

<!-- references:start -->
- [재현율 출처](reference/sources.md) — recall 항목의 출처 표와 미확인 사항
<!-- references:end -->
