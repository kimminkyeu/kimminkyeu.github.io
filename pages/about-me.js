import Layout from "../components/layout"
import Hero from "../components/home/hero"
// NOTE:  이 단일 js파일은 하나의 페이지가 되고, localhost:3000/about-me 로 들어가면 아래 페이지로 이동된다.

// AboutMe라는 함수가 외부에서 쓰일 수 있도록 함.
export default function AboutMe(){
	return (
		<Layout>
			{/* <div className="flex justify-center"> */}
				{/* <h1>자기소개 페이지입니다.</h1> */}
			{/* </div> */}



        	<Hero/> {/** About Me with Image */}


		</Layout>
	)
}
