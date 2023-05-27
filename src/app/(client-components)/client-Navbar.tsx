'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import React from 'react';

interface NavbarProps {
  className?: string;
}

export default function Navbar(props: NavbarProps) {
  const pathName = usePathname();
  const [context, setContext] = React.useState(pathName); // home is Post.
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
          div.classList.remove('shadow-custom_innerUnderline');
        } else {
          nav.classList.remove('navbar-shadow');
          div.classList.add('shadow-custom_innerUnderline');
        }
      },
      {
        threshold: 1, // root의 0% 만큼 header가 보이거나 사라지면 실행.
      }
    );
    observer.observe(ref_nav.current);
    return () => observer.disconnect();  // on unmount, terminate observer.
  }, []);


  return (
    <nav ref={ref_nav} className={`${props.className}`}>
      <div ref={ref_div} className=' container mx-auto px-6 flex shadow-custom_innerUnderline '>
        <div className={`${padding} mr-5${context === '/' ? underline : ''}`}>
          <Link href="/" onClick={() => setContext('/')}>
            Post
          </Link>
        </div>
        <div className={`${padding} mr-5${context === '/about' ? underline : ''}`}>
          <Link href="/about" onClick={() => setContext('/about')}>
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}
