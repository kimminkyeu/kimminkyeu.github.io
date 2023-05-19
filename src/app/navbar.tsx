import { Config } from 'src/config/config';
import Link from 'next/link';
import SearchBar from './client-SearchBar';

interface NavbarProps {
  className?: string;
}

export default function Navbar(props: NavbarProps) {
  return (
    <div className={props.className}>
      <div className="md-0 pd-0 container mx-auto flex flex-col flex-wrap items-center pt-5 md:flex-row md:p-5">
        <Link
          href="/"
          className="title-font flex items-center text-2xl font-medium text-gray-900 md:mb-0"
        >
          {Config.BLOG_TITLE}
        </Link>
        <SearchBar />
        <nav className="flex flex-wrap items-center justify-center text-base md:ml-auto">
          <Link
            href="/article"
            className="ml-2 p-1 hover:underline hover:underline-offset-8"
          >
            Article
          </Link>
          <Link
            href="/about-me"
            className="ml-2 p-1 hover:underline hover:underline-offset-8"
          >
            About Me
          </Link>
        </nav>
      </div>
    </div>
  );
}
