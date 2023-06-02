import Link from 'next/link';
import {Config} from '@/config/config';
import SearchBarSmall from './(client-components)/client-SearchBarSmall';
import SearchBarLarge from './(client-components)/client-SearchBarLarge';
import Image from 'next/image';

export default function Header() {
  return (
    <div className="mx-6 sm:mx-10 pt-4">
      <div className={`container flex flex-wrap items-center`}>
        <Link
          href="/"
          className="text-lg sm:text-xl flex items-center md:text-2xl font-medium text-gray-900"
        >
          {/* <Image style={{ maxWidth:30, width: '100%', height: 'auto' }} src='/noun-gamepad.svg' alt='logo' width={0} height={0} sizes="100vw"/> */}
          {/* <Image style={{ maxWidth:30, width: '100%', height: 'auto' }} src='/buttons.png' alt='logo' width={0} height={0} sizes="100vw"/> */}
          {Config.BLOG_TITLE}
        </Link>
        {/* -------------------------------------------------------------- */}
        {/*<SearchBarLarge className=" invisible hidden sm:visible sm:block"/>*/}
        {/*<SearchBarSmall className=" visible ml-auto block sm:invisible sm:hidden "/>*/}
        {/*<SearchBarSmall className=" ml-auto"/>*/}
        {/* -------------------------------------------------------------- */}
      </div>
    </div>
  );
}
