---
title: 재현성 (Reproducibility)
aliases: [재현성, 재현 가능성, reproducibility]
category: data-analysis
status: draft
updated: 2026-10-10
---

# 재현성 (Reproducibility)

> 같은 데이터, 같은 코드, 같은 분석 조건을 다시 적용했을 때 원래와 일치하는 결과를 얻을 수 있는 성질.

## 요약

- 미국 국립과학·공학·의학한림원(National Academies)은 재현성을 원 연구와 같은 데이터와 코드로 일관된 결과를 얻는 것으로 정의한다.
- 새로운 데이터를 수집해 같은 질문에 대한 결과가 다시 나오는지 보는 것은 재현 가능성(replicability)이라 하며, 재현성과 구분한다.
- 분석 실무에서는 난수 시드 고정, 소프트웨어 버전과 환경 기록, 데이터 버전 관리로 재현성을 확보한다.
- 두 용어의 정의는 분야마다 달라서 서로 뒤바뀌어 쓰이는 경우도 있다.

## 왜 필요한가

분석 결과를 다시 만들 수 없으면 그 결과가 맞는지 검토할 방법이 없고, 모델을 개선했을 때 좋아진 것인지 우연인지도 가릴 수 없다. 코드는 그대로인데 실행할 때마다 지표가 달라지면 변경의 효과를 비교하기 어렵다. 재현성은 이런 비교와 검증이 가능하도록 하는 최소 조건이다.

## 어떻게 동작하나

결과를 결정하는 입력을 모두 고정하고 기록하는 방식으로 확보한다.

| 요소 | 고정·기록할 내용 |
| --- | --- |
| 난수 | 난수 시드, 데이터 분할 방식 |
| 데이터 | 데이터 버전 또는 해시, 전처리 단계 |
| 코드 | 커밋 해시, 실행 인자 |
| 환경 | 언어·라이브러리 버전, 운영체제, 하드웨어 |

scikit-learn 문서에 따르면 추정기와 교차 검증 분할기는 `random_state` 로 제어한다. 정수를 주면 `fit` 이나 `split` 을 호출할 때마다 같은 결과가 나오고, `None` 이나 `RandomState` 인스턴스를 주면 호출마다 결과가 달라질 수 있다. 실행 간 재현성을 원하면 `random_state=None` 을 모두 없애야 한다.

## 예시

```python
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=0)
model = RandomForestClassifier(random_state=0).fit(X_train, y_train)
print(model.score(X_test, y_test))  # 같은 환경에서는 매번 같은 값
```

환경은 별도 파일에 남긴다.

```
python --version
pip freeze > requirements.lock
git rev-parse HEAD
```

## 에이전트 맥락

코딩 에이전트가 만든 분석이나 실험 코드는 실행 환경과 시드가 명시되지 않으면 사람이 다시 돌려 확인하기 어렵다. 에이전트에 결과를 요청할 때 시드, 라이브러리 버전, 실행 명령을 함께 남기게 하면 검증이 쉬워진다. 다만 에이전트 출력 자체의 재현성(같은 프롬프트에서 같은 응답)은 이 문서에서 다루지 않았고 미확인이다.

## 흔한 오해

- **재현성과 재현 가능성(replicability)은 같은 말이 아니다.** National Academies 정의에서 재현성은 같은 데이터와 코드로 같은 결과를 얻는 것이고, 재현 가능성은 새로 얻은 독립적인 데이터로 같은 질문에 일관된 결과를 얻는 것이다. 한국어 번역어는 매체마다 혼용되므로 문맥으로 확인해야 한다.
- **분야마다 정의가 다르다.** 위키백과는 두 용어가 문헌에서 반대 의미로 쓰이기도 한다고 설명한다. 화학에서는 같은 실험실 안의 반복을 repeatability, 실험실 간 일치를 reproducibility 로 부른다.
- **시드만 고정하면 충분하지 않다.** 라이브러리 버전, 데이터 버전, 병렬 처리 순서 등이 달라도 결과가 달라질 수 있다. 이 중 병렬 처리와 하드웨어 영향은 이번 조사에서 직접 확인하지 못해 미확인이다.
- **재현되는 결과가 옳은 결과는 아니다.** 같은 오류가 매번 똑같이 재현될 수도 있다. 예를 들어 [데이터 누수](../data-leakage/README.md)가 있으면 부풀려진 수치가 항상 같게 나온다.

## 관련 용어

- 비교·인접 용어 (순서 없음)
  - [data-leakage](../data-leakage/README.md): 누수는 재현되더라도 틀린 평가를 만들 수 있고, 위키백과는 누수가 재현성 위기에 기여할 수 있다고 적는다.
  - [accuracy](../accuracy/README.md): 재현성 확보 후 비교하는 대표 평가 지표.
  - [f1-score](../f1-score/README.md): 시드와 분할을 고정해야 비교 가능한 지표.

## 참고 자료

<!-- references:start -->
- [재현성 출처](reference/sources.md) — reproducibility 항목의 출처 표와 미확인 사항
<!-- references:end -->
