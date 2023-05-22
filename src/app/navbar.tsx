import { Config } from 'src/config/config';
import Link from 'next/link';
import SearchBarLarge from './client-SearchBarLarge';
import SearchBarSmall from './client-SearchBarSmall';

interface NavbarProps {
  className?: string;
}

export default function Navbar(props: NavbarProps) {
  return (
    <div className={props.className}>
      {/* <div className="md-0 pd-0 container mx-auto flex flex-col flex-wrap items-center pt-5 md:flex-row md:p-5"> */}
      <div className=" container mx-auto flex flex-wrap items-center p-5 pt-5">
        <Link
          href="/"
          className=" title-font flex items-center text-xl font-medium text-gray-900 md:mb-0 md:text-2xl"
        >
          {Config.BLOG_TITLE}
        </Link>
        <nav className="ml-auto flex flex-wrap items-center justify-center text-base md:ml-auto">
          {/* -------------------------------------------------------------- */}
          <SearchBarLarge className=" invisible hidden md:visible md:block" />
          <SearchBarSmall className=" visible block md:invisible md:hidden " />
          {/* -------------------------------------------------------------- */}
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
