import { Config } from 'src/config/config'
import Link from 'next/link'

export default function Navbar() {
  return (
    <>
      <div className="container mx-auto flex flex-col flex-wrap items-center p-5 md:flex-row">
        <Link
          href="/"
          className="title-font mb-4 flex items-center font-medium text-gray-900 md:mb-0"
        >
          <span className="ml-3 text-xl">{Config.BLOG_TITLE}</span>
        </Link>
        <nav className="flex flex-wrap items-center justify-center text-base md:ml-auto">
          <Link href="/article" className="mr-5 hover:text-gray-900">
            Article
          </Link>
          <Link href="/project" className="mr-5 hover:text-gray-900">
            Project
          </Link>
          <Link href="/about-me" className="mr-5 hover:text-gray-900">
            About Me
          </Link>
        </nav>
      </div>
    </>
  )
}
