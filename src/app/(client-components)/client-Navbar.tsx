'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import React from 'react';

interface NavbarProps {
  className?: string;
}

export default function Navbar(props: NavbarProps) {
  const [context, setContext] = React.useState('Post'); // home is Post.
  const [enableShadow, setEnableShadow] = React.useState(false);
  const ref = React.useRef(null);
  // const pathName = usePathname();
  // if (pathName !== '/' && pathName !== '/about') { return <></> }
  const underline = ` border-b border-neutral-600`;
  const padding = 'py-4';

  // Scroll Shadow
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const nav: HTMLBodyElement = ref.current;
        if (entry.intersectionRatio < 1) {
          console.log('[DEV] interception observer : INTERCEPTED');
          nav.classList.add('navbar-shadow');
        } else {
          console.log('[DEV] interception observer : INTERCEPTED--2');
          nav.classList.remove('navbar-shadow');
        }
        // setEnableShadow((prevState) => !prevState);
      },
      {
        threshold: 1, // root의 0% 만큼 header가 보이거나 사라지면 실행.
      }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();  // on unmount, terminate observer.
  }, []);


  return (
    <nav ref={ref} className={`${props.className}`}>
      {/*<div className=' bg-white'>*/}
      <div className=' container mx-auto px-6 flex shadow-custom_innerUnderline '>
        <div className={`${padding} mr-5${context === 'Post' ? underline : ''}`}>
          <Link href="/" onClick={() => setContext('Post')}>
            Post
          </Link>
        </div>
        <div className={`${padding} mr-5${context === 'About' ? underline : ''}`}>
          <Link href="/about" onClick={() => setContext('About')}>
            About
          </Link>
        </div>
      </div>
      {/*</div>*/}
    </nav>
  );
  // }
}
