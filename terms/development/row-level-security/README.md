---
title: 행 수준 보안 (Row Level Security)
aliases: [RLS, 행 수준 보안, 행 단위 보안, row-level security]
category: development
status: reviewed
updated: 2026-10-10
---

# 행 수준 보안 (Row Level Security)

> 데이터베이스가 테이블의 각 행마다 "이 사용자가 이 행을 보거나 바꿀 수 있는가"를 정책으로 판정해, 접근 가능한 행만 걸러 주는 기능.

## 요약

- RLS(Row Level Security)는 테이블 권한(GRANT)에 더해 행 단위로 접근을 제한한다.
- PostgreSQL 에서는 테이블마다 켜야 하며, 켜진 뒤 정책이 없으면 모든 행이 보이지 않는다(기본 거부).
- 정책의 `USING` 은 기존 행의 가시성을, `WITH CHECK` 는 새로 쓰는 행의 허용 여부를 정한다.
- 슈퍼유저, `BYPASSRLS` 속성을 가진 역할, 그리고 기본 설정의 테이블 소유자는 RLS 를 우회한다.
- 애플리케이션의 권한 검사를 대체하지 않고, 데이터베이스 쪽에서 한 겹 더 막는 안전망으로 쓴다.

## 왜 필요한가

애플리케이션 코드에서만 `WHERE user_id = ?` 로 접근을 제한하면, 쿼리 하나에서 조건을 빠뜨리거나 다른 도구가 데이터베이스에 직접 접근할 때 다른 사용자의 데이터가 노출된다. RLS 는 규칙을 데이터베이스에 두어 어떤 경로로 접근해도 같은 규칙이 적용되게 한다.

## 어떻게 동작하나

1. 테이블 소유자가 `ALTER TABLE ... ENABLE ROW LEVEL SECURITY` 로 기능을 켠다.
2. `CREATE POLICY` 로 정책을 만든다. 정책은 명령(`SELECT`, `INSERT`, `UPDATE`, `DELETE`, `ALL`)과 대상 역할을 지정할 수 있다.
3. 쿼리가 실행되면 정책 식이 각 행에 적용되어, 통과한 행만 조회·수정 대상이 된다.
4. 정책이 여러 개면 기본(permissive)은 OR 로, `AS RESTRICTIVE` 는 AND 로 결합된다.

`TRUNCATE` 와 `REFERENCES` 는 RLS 의 대상이 아니고, 참조 무결성 검사(유일성, 외래 키)는 RLS 를 우회한다. 테이블 소유자도 정책을 받게 하려면 `FORCE ROW LEVEL SECURITY` 를 쓴다.

## 예시

PostgreSQL 문서의 예제다. `managers` 역할의 사용자는 자신이 담당하는 계정 행만 다룬다.

```sql
CREATE TABLE accounts (manager text, company text, contact_email text);

ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY account_managers ON accounts TO managers
    USING (manager = current_user);
```

`USING` 만 적으면 같은 식이 `WITH CHECK` 로도 쓰이므로, 다른 매니저의 계정으로 행을 넣거나 바꾸는 것도 막힌다. 정책이 없는 사용자는 아무 행도 볼 수 없다.

Supabase 문서의 예는 로그인한 사용자가 자기 프로필만 읽게 한다.

```sql
create policy "Users can view their own profile."
on profiles for select
to authenticated
using ( (select auth.uid()) = user_id );
```

## 에이전트 맥락

코딩 에이전트가 Supabase 같은 서비스의 스키마와 마이그레이션을 작성할 때 RLS 활성화와 정책 작성이 빠지면 테이블이 노출되거나 반대로 아무도 접근하지 못한다. Supabase 문서는 RLS 가 노출된 스키마의 테이블에서 항상 켜져 있어야 한다고 안내하고, `service_role` 키는 RLS 를 우회하므로 브라우저에 두지 말라고 안내한다.

## 흔한 오해

- **RLS 가 있으면 애플리케이션 권한 검사가 필요 없는 것은 아니다.** 이중으로 두는 이유는 다음과 같다. 첫째, 한쪽의 버그나 설정 누락이 곧바로 유출로 이어지지 않는다(defense in depth, 심층 방어). 둘째, RLS 는 행 접근만 다루므로 기능 단위 권한, 입력 검증, 비즈니스 규칙은 애플리케이션이 맡아야 한다. 셋째, 슈퍼유저나 `BYPASSRLS` 역할, 서비스 키로 접속하는 경로는 RLS 가 적용되지 않는다. 넷째, 애플리케이션 단 검사는 오류 메시지와 사용자 경험을 제어하기 쉽다.
- **RLS 를 켜기만 하면 되는 것이 아니다.** `USING (true)` 같은 정책은 모든 행을 허용하므로 정책 내용이 올바른지 별도로 검토해야 한다. 이 점은 C 등급 자료에 근거해 미확인이다.
- **테이블 소유자도 항상 제한받는 것은 아니다.** 기본 설정에서는 소유자가 우회하며 `FORCE` 를 써야 제한된다.
- **RLS 는 성능 비용이 없는 기능이 아니다.** 정책 식이 모든 쿼리에 붙는다. 구체적 수치는 조사하지 않아 미확인이다.

## 관련 용어

- 비교·인접 용어 (순서 없음)
  - [golden-set](../golden-set/README.md) 정책이 의도대로 막고 허용하는지를 고정된 사례로 반복 검증할 때 쓸 수 있는 평가 방식이다.

## 참고 자료

<!-- references:start -->
- [행 수준 보안 출처 모음](reference/sources.md) — RLS 항목 조사 출처와 미확인 사항
<!-- references:end -->
