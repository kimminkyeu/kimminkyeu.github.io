
// defualt keyword : 단일 객체를 export함을 명시적으로 선언.
export default function PageNotFound(){
	return (
		// JSX 규칙 : 반드시 단위가 최상단 태그로 감싸져야 한다. div로 감싸든가 빈걸로 감싸든가 알아서 해라.
		<>
			<h1>
				404: 페이지를 찾을 수 없습니다.
			</h1>
		</>
	)
}
