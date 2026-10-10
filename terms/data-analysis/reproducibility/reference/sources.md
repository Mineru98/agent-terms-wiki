---
title: 재현성 출처
description: reproducibility 항목의 출처 표와 미확인 사항
---

조회일: 2026-10-10

| 제목 | URL | 등급 | 확인한 내용 |
| --- | --- | --- | --- |
| Reproducibility and Replicability in Science (National Academies, 2019) | https://nap.nationalacademies.org/25303 | A | 검색 결과 요약으로만 확인. 재현성은 같은 데이터와 코드로 일관된 결과, 재현 가능성은 새 데이터로 같은 질문에 일관된 결과. 원문 페이지는 직접 열지 않음 |
| scikit-learn Common pitfalls (Controlling randomness) | https://scikit-learn.org/stable/common_pitfalls.html | A | random_state 정수는 호출마다 같은 결과, None 과 RandomState 인스턴스는 호출마다 다른 결과. 재현하려면 None 제거 |
| Wikipedia: Reproducibility | https://en.wikipedia.org/wiki/Reproducibility | C | reproducibility, replicability, repeatability 구분. 분야에 따라 반대 의미로 쓰이기도 함 |

## 미확인·충돌

- National Academies 원문 페이지를 직접 열어 확인하지 못했다. 이 때문에 status 는 draft 이다.
- 용어 정의가 분야별로 충돌한다(위키백과). 본문은 National Academies 정의를 따랐다.
- 병렬 처리, GPU 연산의 비결정성이 재현성에 미치는 영향은 조사하지 않았다. 미확인.
- 재현성, 재현 가능성의 한국어 번역 관행은 확인하지 못했다.
