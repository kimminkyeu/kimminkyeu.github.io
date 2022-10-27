import Header from './header';
import Footer from './footer';

// 모든 레이아웃을 여기서 정리
export default function Layout({ children }) {
	return (
		<>
			{/* 외부에서 Arg로 들어온 애들을 jsx 컴포넌트에 넣으려면 {}로 감싼다. */}
			{/* <h1>레이아웃1</h1> */}
			{/* <h2>레이아웃2</h2> */}
			{/* <h3>레이아웃3</h3> */}

			<Header/>

			<div>{children}</div>

			<Footer/>
		</>
	);
}
