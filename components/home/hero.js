import Image from "next/image";

export default function Hero(){
	return (
		<>
			{/* <section className="flex min-h-screen flex-col text-gray-600 body-font"> */}
			<section className="flex min-w-screen flex-col text-gray-600 body-font">
				<div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">

					<div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
						{/* <img className="object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600"/> */}
						{/* Next.js에서 사용하는 img 컴폰넌트를 사용할 예정이기 때문. */}
						<Image
							src="/about_me_1.jpeg"
							alt="Picture of the author"
							width="350px"
							height="350px"
							// layout="fill"
							sizes="(max-width: 768px) 100vw,
        					       (max-width: 1200px) 50vw,
            					   33vw"
						/>
					</div>

					<div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
						<h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
							자기소개
							{/* <br className="hidden lg:inline-block"/>readymade gluten */}
						</h1>
						<p className="mb-8 leading-relaxed">
							둘 북간도에 하나에 사랑과 추억과 있습니다. 밤이 하나에 멀리 말 슬퍼하는 부끄러운 까닭입니다. 아스라히 이름자를 부끄러운 당신은 아무 있습니다. 이제 없이 이름을 듯합니다.
						</p>
						<div className="flex justify-center">
							{/* <button className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg">Button</button> */}
							<a href="https://github.com/kimminkyeu" target="_blank" rel="noreferrer">
								<button className="inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 text-lg">
									https://github.com/kimminkyeu
								</button>
							</a>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
