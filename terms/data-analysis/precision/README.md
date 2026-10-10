---
title: 정밀도 (Precision)
aliases: [정밀도, precision, 양성 예측도, PPV]
category: data-analysis
status: reviewed
updated: 2026-10-10
---

# 정밀도 (Precision)

> 모델이 양성이라고 예측한 것 중 실제로 양성인 비율.

## 요약

- 정밀도는 TP / (TP + FP) 이다. TP 는 참 양성, FP 는 거짓 양성이다.
- 거짓 경보를 얼마나 적게 내는지를 보여 준다. 양성 예측도(positive predictive value, PPV)라고도 한다.
- 실제 양성을 얼마나 찾았는지는 알려 주지 않으므로 [재현율](../recall/README.md)과 함께 본다.
- 두 값을 하나로 묶은 지표가 [F1 점수](../f1-score/README.md)이다.

## 왜 필요한가

[정확도](../accuracy/README.md)는 거짓 양성과 거짓 음성을 구분하지 않는다. 스팸 필터에서 정상 메일을 스팸으로 분류하는 비용이 크다면, 양성이라고 한 판단이 얼마나 믿을 만한지를 따로 측정해야 한다. 정밀도가 그 질문에 답한다.

## 어떻게 동작하나

```
precision = TP / (TP + FP)
```

scikit-learn 문서는 정밀도를 분류기가 음성 표본을 양성으로 표시하지 않는 능력으로 설명한다. 분모가 0 이면(양성 예측이 하나도 없으면) 값이 정의되지 않으며, scikit-learn 에서는 `zero_division` 으로 처리 방식을 정한다.

다중 클래스에서는 클래스별로 계산한 뒤 `micro`, `macro`, `weighted` 방식으로 평균한다. 자세한 차이는 [f1-score](../f1-score/README.md) 에 정리했다.

## 예시

100개를 양성으로 예측했고 그중 80개가 실제 양성이면 TP = 80, FP = 20 이다.

```
precision = 80 / (80 + 20) = 0.8
```

실제 양성이 200개라면 이 모델의 재현율은 80 / 200 = 0.4 이다. 정밀도가 높아도 많은 양성을 놓칠 수 있다.

```python
from sklearn.metrics import precision_score
precision_score(y_true, y_pred)
```

## 흔한 오해

- **정밀도(precision)는 측정 분야의 정밀도와 다르다.** 측정에서 말하는 정밀도는 반복 측정값의 흩어짐 정도이며, 분류의 정밀도와 다른 개념이다. 이 구분은 위키백과 등에서 널리 언급되나 이번 조사에서 별도 A 출처로 확인하지는 않았다.
- **정밀도가 높다고 좋은 모델이 아니다.** 가장 확신하는 표본 하나만 양성으로 예측하면 정밀도는 1 에 가까워지지만 재현율은 거의 0 이다.
- **정밀도는 음성 표본을 다루지 않는다.** TN 이 식에 없으므로 음성 예측이 얼마나 맞는지는 알 수 없다.

## 관련 용어

- 비교·인접 용어 (순서 없음)
  - [recall](../recall/README.md): 정밀도와 트레이드오프 관계에 있는 짝 지표.
  - [f1-score](../f1-score/README.md): 정밀도와 재현율의 조화 평균.
  - [accuracy](../accuracy/README.md): 전체 중 맞힌 비율. 거짓 양성의 영향을 따로 보이지 않는다.
  - [data-leakage](../data-leakage/README.md): 누수는 정밀도를 포함한 모든 평가 수치를 부풀린다.

## 참고 자료

<!-- references:start -->
- [정밀도 출처](reference/sources.md) — precision 항목의 출처 표와 미확인 사항
<!-- references:end -->
