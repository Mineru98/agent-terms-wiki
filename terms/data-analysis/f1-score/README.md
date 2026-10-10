---
title: F1 점수 (F1 Score)
aliases: [F1, F1 점수, F1 score, 조화 평균]
category: data-analysis
status: reviewed
updated: 2026-10-10
---

# F1 점수 (F1 Score)

> 정밀도와 재현율의 조화 평균(harmonic mean)으로, 두 지표를 하나의 값으로 요약한 분류 평가 지표.

## 요약

- F1 = 2 * 정밀도 * 재현율 / (정밀도 + 재현율) 이며 0 에서 1 사이 값이다.
- 조화 평균이므로 둘 중 하나가 낮으면 점수도 크게 낮아진다.
- 다중 클래스에서는 매크로(macro)와 마이크로(micro) 평균 방식에 따라 값이 달라진다.
- 재현율에 가중을 두려면 F-beta 를 쓰며, F1 은 beta = 1 인 특수한 경우이다.

## 왜 필요한가

[정밀도](../precision/README.md)와 [재현율](../recall/README.md)은 한쪽을 올리면 다른 쪽이 내려가는 경향이 있어 두 값을 따로 보면 모델 비교가 어렵다. 단순 산술 평균은 한 값이 0 에 가까워도 0.5 가까이 나온다. 조화 평균을 쓰면 극단적인 모델을 걸러 낼 수 있다. [정확도](../accuracy/README.md)가 가리는 불균형 데이터에서도 많이 쓴다.

## 어떻게 동작하나

```
F1   = 2 * P * R / (P + R)
     = 2TP / (2TP + FP + FN)

F_beta = (1 + beta^2) * P * R / (beta^2 * P + R)
       = (1 + beta^2) * TP / ((1 + beta^2) * TP + FP + beta^2 * FN)
```

P 는 정밀도, R 은 재현율이다. scikit-learn 은 두 식 중 뒤의 형태로 계산해 P 와 R 이 모두 0 일 때의 0 나눗셈을 피한다. 표본에 TP, FP, FN 이 모두 없으면 값이 정의되지 않고 기본값은 0 이며 `zero_division` 으로 바꿀 수 있다.

**F-beta 와의 관계.** beta 가 클수록 재현율을, 작을수록 정밀도를 더 중시한다. 위키백과는 재현율을 정밀도의 beta^2 배 중요하게 본다고 설명한다. 흔히 쓰는 값은 재현율을 중시하는 beta = 2 와 정밀도를 중시하는 beta = 0.5 이다. beta = 1 이 F1 이다.

**매크로와 마이크로 평균.** 다중 클래스·다중 레이블에서는 클래스별 값을 합쳐야 한다.

| 방식 | 계산 | 특징 |
| --- | --- | --- |
| macro | 클래스별 F1 의 산술 평균 | 클래스 크기와 무관하게 동일 가중. 소수 클래스 성능이 반영됨 |
| micro | 전체 TP, FP, FN 을 합산해 계산 | 다수 클래스가 지배함. 단일 레이블 다중 클래스에서는 정확도와 같음 |
| weighted | 클래스별 지지도(support)로 가중 평균 | 불균형을 반영하나 정밀도와 재현율 사이를 벗어날 수 있음 |

scikit-learn 문서에 따르면 macro F 는 클래스별 F 의 산술 평균이며, macro 정밀도와 macro 재현율의 조화 평균과 같지 않다.

## 예시

TP = 40, FP = 10, FN = 60 이면 정밀도는 0.8, 재현율은 0.4 이다.

```
F1    = 2 * 0.8 * 0.4 / (0.8 + 0.4) = 0.533
        (또는 80 / (80 + 10 + 60) = 0.533)
F2    = 5 * 40 / (5 * 40 + 10 + 4 * 60) = 200 / 450 = 0.444
F0.5  = 1.25 * 40 / (1.25 * 40 + 10 + 0.25 * 60) = 50 / 75 = 0.667
```

재현율이 낮아서 F2 는 F1 보다 낮고, 정밀도가 높아서 F0.5 는 F1 보다 높다.

두 클래스의 평균 예시는 다음과 같다. 클래스 A 는 TP 40, FP 10, FN 60 (F1 0.533), 클래스 B 는 TP 900, FP 60, FN 10 (F1 0.963) 이다.

```
macro F1 = (0.533 + 0.963) / 2 = 0.748
micro F1 = 2 * 940 / (2 * 940 + 70 + 70) = 0.931
```

다수 클래스 B 의 비중이 커서 micro 값이 높다. 소수 클래스 A 의 부진은 macro 에서 더 잘 드러난다.

```python
from sklearn.metrics import f1_score, fbeta_score
f1_score(y_true, y_pred, average="macro")
fbeta_score(y_true, y_pred, beta=2)
```

## 흔한 오해

- **F1 은 정확도의 대체재가 아니다.** F1 은 참 음성(TN)을 쓰지 않는다. 위키백과에 따르면 micro F1 도 일반적으로 정확도와 같지 않다. 단일 레이블 다중 클래스의 micro 평균에서는 scikit-learn 문서가 정확도와 같다고 적는다.
- **F1 이 높으면 정밀도와 재현율이 모두 높다고 볼 수 없다.** 같은 F1 이어도 둘의 균형은 다를 수 있으므로 함께 확인한다.
- **F1 도 누수에서 자유롭지 않다.** [데이터 누수](../data-leakage/README.md)로 평가가 오염되면 F1 도 정확도처럼 부풀려진다.

## 관련 용어

- 비교·인접 용어 (순서 없음)
  - [precision](../precision/README.md): F1 의 구성 요소.
  - [recall](../recall/README.md): F1 의 구성 요소. F-beta 에서 가중이 걸리는 쪽.
  - [accuracy](../accuracy/README.md): 불균형 데이터에서 F1 이 보완하는 지표.
  - [data-leakage](../data-leakage/README.md): F1 을 포함한 평가 수치를 부풀리는 원인.

## 참고 자료

<!-- references:start -->
- [F1 점수 출처](reference/sources.md) — f1-score 항목의 출처 표와 미확인 사항
<!-- references:end -->
