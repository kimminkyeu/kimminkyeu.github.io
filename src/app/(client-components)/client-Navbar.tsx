'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import React, {useEffect} from 'react';
import TagListSmall from './client-tagListAccordian';


export default function Navbar({tagMap}: { tagMap: Map<string, number> }) {

  const pathName = usePathname();
  const [currentPath, setCurrentPath] = React.useState(pathName); // home is Post.
  const ref_nav = React.useRef(null);
  const ref_div = React.useRef(null);
  const underline = ` border-b-2 border-neutral-600`;
  const padding = 'py-3';
  // Scroll Shadow
  React.useEffect(() => {

    const observer = new IntersectionObserver(
      ([entry]) => {
        const nav: HTMLBodyElement = ref_nav.current;
        const div: HTMLBodyElement = ref_div.current;
        if (entry.intersectionRatio < 1) {
          nav.classList.add('navbar-shadow');
          nav.classList.remove('shadow-custom_innerUnderline');
        } else {
          nav.classList.remove('navbar-shadow');
          nav.classList.add('shadow-custom_innerUnderline');
        }
      },
      {
        threshold: 1, // root의 0% 만큼 header가 보이거나 사라지면 실행.
      }
    );
    observer.observe(ref_nav.current);
    return () => observer.disconnect();  // on unmount, terminate observer.
  }, []);

  React.useEffect(() => {
    setCurrentPath(pathName);
  }, [pathName]);

  return (
    <nav ref={ref_nav} className='bg-white shadow-custom_innerUnderline '>
      {/* mx-6 flex flex-col max-w-2xl md:mx-auto */}
      <div ref={ref_div} className=' mx-6 sm:mx-10 pt-2 max-w-3xl flex md:text-xl'>
        <div className={`${padding} mr-5${currentPath === '/' ? underline : ''}`}>
          <Link href="/" onClick={() => setCurrentPath('/')}>
            Post
          </Link>
        </div>
        <div className={`${padding} mr-5${currentPath === '/about' ? underline : ''}`}>
          <Link href="/about" onClick={() => setCurrentPath('/about')}>
            About
          </Link>
        </div>
        <div className='top-2 block lg:hidden flex-1 absolute md:top-3 right-6 sm:right-10'>
          <TagListSmall tagMap={tagMap}/>
        </div>
      </div>
    </nav>
  );
}