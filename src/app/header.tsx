import Link from 'next/link';
import {Config} from '@/config/config';
import SearchBarSmall from './(client-components)/client-SearchBarSmall';
import SearchBarLarge from './(client-components)/client-SearchBarLarge';

export default function Header({className}: { className: string }) {
  return (
    <div className={className}>
      <div className={`container flex flex-wrap items-center`}>
        <Link
          href="/"
          className="text-lg sm:text-xl flex items-center md:text-2xl font-medium text-gray-900 md:text-2xl"

        >
          {Config.BLOG_TITLE}
        </Link>
        {/* -------------------------------------------------------------- */}
        {/*<SearchBarLarge className=" invisible hidden sm:visible sm:block"/>*/}
        {/*<SearchBarSmall className=" visible ml-auto block sm:invisible sm:hidden "/>*/}
        <SearchBarSmall className=" ml-auto"/>
        {/* -------------------------------------------------------------- */}
      </div>
    </div>
  );
}
