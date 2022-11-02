import Link from "next/link";

// NOTE:  Link를 안쓰고 href를 쓰면, 클릭할 때 마다 새로고침. (SSR)
// The Next.js router allows you to do client-side route transitions
// between pages, similar to a single-page application.

export default function Header(){
	return (
		<>
			<header className="text-gray-600 body-font">
				<div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
					<Link href="/">
						<a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
							{/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24"> */}
							{/* <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path> */}
							{/* </svg> */}
							<span className="ml-3 text-xl">Minky Graphics</span>
						</a>
					</Link>
					<nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
						<Link href="/">
							<a className="mr-5 hover:text-gray-900">Home</a>
						</Link>
						<Link href="/article">
							<a className="mr-5 hover:text-gray-900">Article</a>
						</Link>
						<Link href="/projects">
							<a className="mr-5 hover:text-gray-900">Projects</a>
						</Link>
						<Link href="/about-me">
							<a className="mr-5 hover:text-gray-900">About Me</a>
						</Link>
					</nav>
				</div>
			</header>
		</>
	);
}
