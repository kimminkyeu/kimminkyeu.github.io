# NOTION DB를 어떻게 연결할 것인가? (방법과 전략.)

(1) article list는 노션에서 직접 다운받아서 사용하기.

(2) 개별 article은 next-notion-x 렌더러 사용하기.

(3) 문제점: next-notion-x는 fetch 방식이 추상화되어 있기 때문에 페이지 전반에 대한 Control이 불가능하다. --> 230514: 아니다 된다. export const revalidate 변수로 컨트롤 가능하다.

(4) 노션에는 API콜로 MD를 획득하는 공식 레퍼런스가 없다. (즉 구현이 바뀔 수 있는 불안정한 기능)
만약 API콜로 얻은 Block 데이터를 MD로 변환만 가능하다면, 그 이후 확장성은 보장된다. 왜냐면 MD -> React Component 변환 Library는 많음.

- https://github.com/NotionX/react-notion-x#private-pages ( ❌ )
- https://blog.hwahae.co.kr/all/tech/10960 ( ⭕ )
- https://github.com/souvikinator/notion-to-md (Block to MD)
- https://github.com/remarkjs/remark (MD to HTML)

결정: next-notion-x를 쓰지 않고, 공식 api로 직접 데이터를 받아와 md로 변환하기로 결정.

# 노션에 글을 써도 배포된 페이지에 반영되지 않는다. 어떻게 해결할 것인가? (방법과 전략.)

- [ 방법 1: use-client, use-server를 이용하기(Experimental) ]

  ***

  (Notion Client 사용 시, fetch option을 줄 수 없어서 새로고침 시마다 계속 데이터 불러옴.)
  단일 article을 client-side로 바꾸고, 새로고침(useEffect)시에
  Server Action을 호출해서 데이터를 re-fetch 하도록 시도.
  @@invoke server-action

  - https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions

- [ 방법 2: Fetch의 Caching과 revalidation을 활용 가능 ]

  ***

  - https://velog.io/@dldngus5/nextjs-revalidate
  - https://vercel.com/docs/concepts/incremental-static-regeneration/overview
  - https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate

- 추가 최적화 (Next13 Parallel Data Fetching. 여러 fetch를 날려야 할 경우.)
  ***
  - https://nextjs.org/docs/app/building-your-application/data-fetching/fetching

## @title [ Incremental Static Regeneration (ISR) ]

- @description [ Next13 Route Segment Configuration ]
- @link https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
- @link2 https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes
- @link3 https://nextjs.org/docs/pages/building-your-application/rendering/incremental-static-regeneration

---

주의사항! ( 일단 기본 런타임이 nodejs라서 괜찮지만... )

Note: The edge runtime is currently not compatible with ISR, although you can
leverage stale-while-revalidate by setting the cache-control header manually.

---

# 0514 전략 설정, 진실 발견 (모든 인과관계 파악)

## 지금까지의 연구 결과

0. 배경
   ISR 설정을 했다. next start하니 이제 새로고침시 서버측의 컨텐츠 업데이트가 잘된다.
   (ISR 설정 안했을 땐 이마저도 안됬음!)
   그래서 이제 github page에 deploy하면 call이 page refresh마다 새로 될 것이라 생각했으나
   내 사이트는 여전히 컨텐츠를 업데이트하지 않았다. 왜일까?

1. 문제점
   ghpage는 next export를 쓰는데, 이 방식은 static app을 생성한다.
   따라서 api호출, dynamic routing 등은 static app으로 변경되는 과정에서 한번만 이뤄진다.
   그래서 next start는 되도 막상 gh-page에 deploy하면 또 api콜이 안됬던 거다. 이건 못고친다.

   - 참고1. https://stackoverflow.com/questions/61724368/what-is-the-difference-between-next-export-and-next-build-in-next-js
   - 참고2. https://medium.com/geekculture/github-pages-with-dynamic-routes-40f512900efa

2. 해결책
   a. static app을 그대로 사용 --> github action workflow에 하루에 한번 build 되도록 수정한다. ⭕  
   b. gitbub page를 쓰지 않고(for ISR), vercel을 사용, next-export를 쓰지 않는다. ❌

   #### 나의 선택은 a. 왜냐면 github.io 경로가 마음에 들기 때문이고, a에서 b로의 전환은 쉽기 때문이다.

3. 실행 결과
   a. gitbub action에 rebuild schedule workflow를 추가한다.
   - 참고1. https://danielsaidi.com/blog/2022/05/11/schedule-github-pages-rebuild-with-github-actions

---

## 앞으로의 전략.

0. db 전체 검색

1. article list

   - medium.com 스타일 리스트
   - pagination 사용. (한 페이지 max 10)개.
     - 참고: https://developers.notion.com/reference/intro#pagination
   - 글 검색 적용

2. single article

   - next-notion-x 시스템 적용(디자인 최소화)
     - 참고: https://github.com/NotionX/react-notion-x
   - 글 목차는 하지 말기 (전체 글 분류 navigator 때문)
   - 이유1: fetch에서 직접 설정하지 않아도 Build 버전 ISR 적용 방법을 찾았기 때문
   - 이유2: 마크다운 형식을 보여주는 것도 좋지만, 노션 에디터만의 장점이 많기 때문.(레이아웃 기능 포함)

3. Article Navigation Bar (태그 목록 활용)

   - article list, single article 두개를 하나의 page로 두고,
     글 분류 네비게이터를 옆에 page하나 더 두고 이 둘을 layyout으로 묶을 것.
     예시 1: https://choar816.tistory.com/205
     예시 2: https://velog.io/@seo__namu

4. 블로그 전체 검색창 제공

5. 노션 CMS 기능 확대
   - 내 소개페이지 (About Me), 프로젝트 페이지도 각각 DB를 만들어서 연결하는게 좋겠다.
     (컨텐츠 상세 내용은 모두 노션을 활용해보기)
     예시 1: https://github.com/transitive-bullshit/nextjs-notion-starter-kit

# 0518

1. react-notion-x, vercel로 변경
2. 노션 렌더러 애먹은 부분
   - notionPage는 client component이고, 그 외 부분은 전부 server component이다.
     따라서 client component 부분을 별로 파일로 빼야 한다.
3. next13 이미지는 외부 이미지 링크에 대한 프리뷰는 없는데, 이를 가능케 하려면
   https://blog.anishde.dev/amazing-preview-images-with-nextjs-and-lqip-modern
   lqip-modern을 쓰면 됨.

결론: preview image blur, 검색, (ok)tableofContent

4. done! lets do mui + search
   - https://velog.io/@projaguar/Next.js-13-app-Directory%EC%99%80-MUI

# 0521 최신화

1. c++만 안된 이유 : 노션 c++ 코드블록은 c++그대로 설정이 내보내짐.
   그런데 prismjs, markdown 등은 c++가 아닌 cpp라고 언어를 명시함...
   그래서 cpp가 안됬던 거임 시뷸...
2. react-notion-x 버리고 notion-md + remark/rehype으로 갈아탐.
   react-notion-x의 커스터마이징, 설정 변경 등이 너무 복잡하고,
   내부에서 공식 노션 api를 쓰지 않기 때문에 두개의 api 객체를 만들어야 함...

# 0522

1. 설명글이 없을 경우 -> 내용을 가져오기 + 길이 제한 이상이 되면 ...으로 교체
   <!-- 2. npx next export로 변경. 성능 문제 + 서버에서 굳이 뭘 처리할 내용이 없기 때문. -->
   <!-- 3. medium 처럼 home을 없애고, 메뉴 선택도 밑으로 빼자. -->
2. mui를 header로 사용하기
3. 설명글이 없으면 본문에서 뽑아오기.
