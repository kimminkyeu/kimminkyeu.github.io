import Head from 'next/head';
import Header from './header';
import Footer from './footer';

// 모든 레이아웃을 여기서 정리
export default function Layout({ children }) {
	return (
		<>
			<Head>
				{/* Head는 seo를 위한 Meta-data이자 페이지 상단 이름. Next.js에서 제공하는 컴포넌트임. */}
				<title>Minky Graphics</title>
				<meta name="Minky Graphics" content="컴퓨터 그래픽스 블로그" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header/>

			<div>{ children }</div>

			<Footer/>
		</>
	);
}
