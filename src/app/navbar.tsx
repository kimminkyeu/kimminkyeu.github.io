import { Config } from 'src/config/config';
import Link from 'next/link';

export default function Navbar() {
  return (
    <>
      <div className="md-0 pd-0 container mx-auto flex flex-col flex-wrap items-center pt-5 md:flex-row md:p-5">
        <Link
          href="/"
          className="title-font flex items-center font-medium text-gray-900 md:mb-0"
        >
          <span className="text-xl">{Config.BLOG_TITLE}</span>
        </Link>
        <nav className="flex flex-wrap items-center justify-center text-base md:ml-auto">
          <Link
            href="/article"
            className="m-2 rounded-md p-1 hover:bg-slate-800 hover:text-gray-300"
          >
            Article
          </Link>
          <Link
            href="/about-me"
            className="m-2 rounded-md p-1 hover:bg-slate-800 hover:text-gray-300"
          >
            About Me
          </Link>
        </nav>
      </div>
    </>
  );
}
