---
title: 쓰로틀링 (Throttling)
aliases: [쓰로틀링, 쓰로틀, 스로틀링, throttling, throttle]
category: development
status: reviewed
updated: 2026-10-10
---

# 쓰로틀링 (Throttling)

> 같은 동작이 아무리 자주 요청되어도 일정 시간 간격마다 최대 한 번만 실행하도록 제한하는 방식.

## 요약

- 쓰로틀링(throttling)은 작업이 수행되는 최대 빈도를 정하는 기법이다.
- 호출이 계속 이어져도 정해진 간격마다 한 번은 실행되므로, 화면이 갱신되는 흐름이 끊기지 않는다.
- 간격의 앞(leading)에서 실행할지, 뒤(trailing)에서 실행할지, 양쪽에서 실행할지를 고를 수 있다.
- 스크롤, 마우스 이동처럼 연속으로 발생하는 이벤트에 쓴다.

## 왜 필요한가

스크롤 이벤트는 스크롤하는 동안 매우 자주 발생한다. 이벤트마다 무거운 계산이나 DOM 갱신을 하면 화면이 끊기는 현상이 생긴다. 쓰로틀링은 처리 빈도에 상한을 두어 작업량을 줄이면서도 스크롤 중에 결과가 계속 갱신되게 한다.

## 어떻게 동작하나

MDN 용어집은 쓰로틀링을 "작업을 정해진 비율로만 수행하도록 늦추는 것"으로 설명한다. 연속 호출 중에도 최대 빈도로 실행한다는 점이 디바운스(debounce)와 다르다. 첫 호출이 선행 지점(leading edge), 대기 시간이 끝나는 시점이 후행 지점(trailing edge)이며, 보통은 선행 지점에서만 실행하지만 후행 또는 양쪽에서 실행하는 구현도 있다.

Lodash 의 `_.throttle` 은 "`wait` 밀리초당 최대 한 번만 `func` 를 호출하는 함수"를 만든다. `leading` 과 `trailing` 옵션의 기본값은 모두 `true` 이다.

## 예시

스크롤 중 100ms 에 최대 한 번만 위치를 기록하는 최소 코드다.

```js
function throttle(fn, wait) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= wait) {  // 마지막 실행 후 wait 이상 지났을 때만 실행한다
      last = now;
      fn(...args);
    }
  };
}

window.addEventListener(
  "scroll",
  throttle(() => console.log("scrollY:", window.scrollY), 100)
);
```

이 코드는 선행 실행만 구현한 것이다. 후행 실행까지 필요하면 Lodash 의 `_.throttle` 을 쓴다.

## 흔한 오해

- **서버의 요청 제한(rate limiting)과 같은 것이 아니다.** 쓰로틀링은 주로 클라이언트 코드가 자기 함수를 실행하는 빈도를 스스로 줄이는 기법이다. 서버의 요청 제한은 서버가 한 클라이언트의 요청 수를 제한하고, 초과하면 `429 Too Many Requests` 로 거절하는 정책이다. 다만 MDN 은 rate limiting 이 보통 throttling 과 같은 뜻으로 쓰인다고도 적고 있어, 두 말이 문헌에 따라 겹쳐 쓰이는 것은 사실이다. 이 문서에서는 "함수 실행 빈도 제한"(쓰로틀링)과 "서버의 요청 수 제한"(rate limiting)을 구분해 쓴다.
- **쓰로틀링과 디바운스를 혼동하지 않는다.** 쓰로틀링은 호출이 계속되는 동안에도 실행하고, 디바운스는 호출이 멈춘 뒤에 실행한다.
- **쓰로틀링은 네트워크 속도 제한과도 다르다.** MDN 은 "네트워크 쓰로틀링"을 느린 연결을 흉내 내려 전송량을 제한하는 것으로 별도로 설명한다.

## 관련 용어

- 비교·인접 용어 (순서 없음)
  - [debounce](../debounce/README.md): 호출이 멈춘 뒤에 한 번 실행한다는 점이 다르다.

## 참고 자료

<!-- references:start -->
- [쓰로틀링 출처 목록](reference/sources.md) — MDN 용어집과 Lodash 문서에서 확인한 내용과 미확인·충돌 항목
<!-- references:end -->
