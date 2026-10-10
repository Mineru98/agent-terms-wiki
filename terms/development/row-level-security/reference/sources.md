---
title: 행 수준 보안 출처 모음
description: RLS 항목 조사 출처와 미확인 사항
---

조회일: 2026-10-10

## 출처

| 제목 | URL | 등급 | 확인한 내용 |
| --- | --- | --- | --- |
| PostgreSQL 18 Documentation, Row Security Policies | https://www.postgresql.org/docs/current/ddl-rowsecurity.html | A | 활성화 방법, 기본 거부, USING 과 WITH CHECK, permissive/restrictive 결합, 슈퍼유저/BYPASSRLS/소유자 우회, FORCE, 예제 정책 |
| Supabase Docs, Row Level Security | https://supabase.com/docs/guides/auth/row-level-security | A | 심층 방어(defense in depth) 설명, service_role 의 bypassrls, 사용자 프로필 정책 예제 |
| PostgreSQL CREATE POLICY 참조 (opensuse 미러, 검색 결과) | https://manpages.opensuse.org/Tumbleweed/postgresql18/CREATE_POLICY.7pg18.en.html | B | USING/WITH CHECK 구분과 기본 거부 (공식 문서의 미러, 직접 열람 안 함) |

## 미확인·충돌

- 애플리케이션 검사와 이중으로 두는 이유 중 기능 단위 권한과 사용자 경험에 관한 설명은 출처가 직접 말하지 않은 일반 설계 해석이다.
- `USING (true)` 경고는 C 등급 강의 자료의 검색 요약에 근거한다.
- RLS 의 성능 영향은 조사하지 않았다.
- 충돌하는 출처는 없었다.
