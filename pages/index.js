import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/layout' // 내가 만든 레이아웃 컴포넌트
import Hero from '../components/home/hero';

export default function Home() {
  return (
    <Layout> {/* 내가 components 디렉토리에 만들어둔 layout.js 컴포넌트임. */}





      <Head>
        {/* Head는 seo를 위한 Meta-data이자 페이지 상단 이름. Next.js에서 제공하는 컴포넌트임. */}
        <title>Minky Graphics</title>
        <meta name="description" content="오늘도 화이팅" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>

        {/* <Hero/> */}

      </main>






    </Layout>
  );
}
