// ------------------------------------------------------------------------------------
// (1) article list는  노션에서 직접 다운받아서 사용하기.
// (2) 개별 article은 next-notion-x 렌더러 사용하기.
// (3) 아니다. 문제점: next-notion-x는 fetch 방식이 추상화되어 있기 때문에 페이지 전반에 대한 Control이 불가능하다. (no-caching 옵션을 못씀)
//    따라서 block Data를 직접 얻고, 이를 md로 변환하는 api를 사용한 뒤, 해당 md를 렌더링 하는 방식으로 선택하였음.
// (4) 노션에는 API콜로 MD를 획득하는 공식 레퍼런스가 없다. (즉 구현이 바뀔 수 있는 불안정한 기능)
//    만약 API콜로 얻은 Block 데이터를 MD로 변환만 가능하다면, 그 이후 확장성은 보장된다. 왜냐면 MD -> React Component 변환 Library는 많음.

//    -  https://github.com/NotionX/react-notion-x#private-pages ( ❌ )
//    -  https://blog.hwahae.co.kr/all/tech/10960 ( ⭕ )
//    -  https://github.com/souvikinator/notion-to-md (Block to MD)
//    -  https://github.com/remarkjs/remark (MD to HTML)
//
// TODO: next-notion-x package 삭제하기.
// TODO: Notion-API 비공식 버전도 package 삭제하기.
// ------------------------------------------------------------------------------------

//* -------------------------------------------------------
//* 방법 1 (Notion Client 사용 시, fetch option을 줄 수 없어서 새로고침 시마다 계속 데이터 불러옴.)
// 단일 article을 client-side로 바꾸고, 새로고침(useEffect)시에
// Server Action을 호출해서 데이터를 re-fetch 하도록 시도.
// [ invoke server-action ]
//   - https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions
//
//* 방법 2 (Notion Client 미사용 시, Fetch의 Caching과 revalidation을 활용 가능)
//   - https://velog.io/@dldngus5/nextjs-revalidate
//   - https://vercel.com/docs/concepts/incremental-static-regeneration/overview
//   - https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
//
//* 추가 최적화 (Next13 Parallel Data Fetching. 여러 fetch를 날려야 할 경우.)
//   - https://nextjs.org/docs/app/building-your-application/data-fetching/fetching
//* -------------------------------------------------------

// TODO: 매번 refresh 할 때마다 말고, 주기를 주고(ex 5분) 그때 서버측에서 re-fresh하도록 해볼까?

// 'use client';
// import { useEffect, useState } from 'react';

import { queryDatabaseByStatus } from '@/app/(api)/notion'
// import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';

/*
* 상단 방법 1 예시
export default function SingleArticle() {
  const [query, setQuery] = useState<QueryDatabaseResponse>();
  const [isLoading, setIsLoading] = useState<boolean>();
  useEffect(() => { // on first render (or page refresh)
    setIsLoading(true);
    queryDatabase_withStatusDone()
      .then((query) => {
        setQuery(query);
        setIsLoading(false);
      });
  }, []);
  return (
    <h1>{isLoading ? 'Loading...' : JSON.stringify(query)}</h1>
  );
}
*/

export default async function SingleArticle() {
  const query = await queryDatabaseByStatus('Done')
  return (
    <div>
      <h1>TEST</h1>
      <h3>{JSON.stringify(query)}</h3>
    </div>
  )
}
