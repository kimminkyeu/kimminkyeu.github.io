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

- [ 방법 1: use-client, use-server를 이용하기 ]

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

# 왜 ISR이 안되는지 그 이유를 찾음: edge runtime 문제였음...

## @title [ Incremental Static Regeneration (ISR) ]

- @description [ Next13 Route Segment Configuration ]
- @link https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
- @link2 https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes
- @link3 https://nextjs.org/docs/pages/building-your-application/rendering/incremental-static-regeneration

---

Note: The edge runtime is currently not compatible with ISR, although you can
leverage stale-while-revalidate by setting the cache-control header manually.
