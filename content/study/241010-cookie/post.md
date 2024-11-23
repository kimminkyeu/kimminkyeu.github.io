---
draft : false
date: '2024-10-10'
title: "Cookie"
author: "김민규"
tags: ["커널 360", "Cookie", "프로젝트"]
---

![cookie](https://cwatch.comodo.com/blog/wp-content/uploads/2020/05/what-are-cookies.png)

Http Cookie란 서버에서 클라이언트에 보내는 작은 데이터 조각이다. 

브라우저는 서버에 요청을 보낼 때, 해당 서버의 쿠키를 요청에 담아 같이 보낸다.

쿠키는 인증 토큰이나 세션 값, 사용자 정보를 저장하는 데 사용할 수 있다

<!--more-->

## HTTP Only

자바스크립트로 쿠키를 조작하는것을 막고 http요청에만 쿠키를 담아 보내도록 설정하는 옵션

자바스크립트에서 HttpOnly 옵션이 걸린 쿠키에는 접근할 수 없어 XSS 예바에 도움이 됨

> XSS(Cross-Site-Scripting) 이란?
악의적인 사용자가 공격하려는 사이트에 스크립트를 넣는 공격 기법.
해당 사이트를 방문한 사용자는 삽입된 스크립트를 실행하게 되어 민감정보(쿠키나 토큰 등)를 탈취당할 수 있dma
> 

## Secure

https 통신시에만 쿠키를 보내는 옵션 → 웹 서버와 클라이언트 둘다 https를 사용해야 쿠키를 주고받을 수 있음

## SameSite

쿠키를 사용할 도메인 범위를 설정하는 옵션 strict, lax, none 세가지 옵션이 존재함

> 같은 도메인의 기준?
`registrable domain` 이 같으면 같은 도메인으로 판단
> 

> Registrable Domain 이란?
`registrable domain` 은 [Public Suffix List](https://publicsuffix.org/list/public_suffix_list.dat)에 있는 도메인 + suffix 바로앞 도메인 까지를 의미한다.
ex) developer.mozilla.org에서 suffix는 org이므로 `registrable domain`은 `mozilla.org`가 된다.

https://developer.mozilla.org/en-US/docs/Glossary/Site
> 

### Strict

- 같은 도메인(하위 도메인 포함)에서만 쿠키를 전송함

### Lax

- 기본값 : samesite 값이 별도로 설정되어 있지 않으면 Lax로 적용
- 같은 도메인 뿐만 아니라 다른 도메인이더라도 top-level navigation GET 요청에서 쿠키 사용 가능

> top-level navigation이란?
- 주소창에 직접 url 입력하여 사이트 접근
- iframe, img 등 태그를 통한 접근
> 

### None

- 다른 도메인에서도 쿠키 사용 가능
- 반드시 secure 옵션과 같이 사용해야함(secure = true 필수)

## ResponseCookie를 이용해 samesite 옵션 설정하기

스프링에서는 쿠키 옵션을 좀더 편하게 설정하기 위한 ResponseCookie 클래스를 제공하고 있음

ResponseCookie 사용시 samesite 옵션을 좀더 편하게 설정할 수있다.

```java
ResponseCookie cookie = ResponseCookie.from("cookieName", "cookieValue")
    .maxAge(maxAge)
    .secure(true)
    .samesite("None")
    // 필요한 옵션 추가
    .build();

response.addHeader("Set-Cookie", cookie.toString());
// HttpServletResponse response
// setHeader를 사용하는 경우 이전에 설정한 헤더가 덮어씌어지므로 주의
```