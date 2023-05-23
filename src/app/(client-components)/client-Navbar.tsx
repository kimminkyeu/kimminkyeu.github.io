'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface NavbarProps {
  className?: string;
}

export default function Navbar(props: NavbarProps) {
  const [context, setContext] = React.useState('Post'); // home is Post.
  const underline = ` border-b border-neutral-600`;
  const pathName = usePathname();
  if (pathName !== '/' && pathName !== '/about') {
    return <></>;
  } else {
    return (
      <nav className="">
        <div
          // className={`${props.className} mb-5 flex border-b border-neutral-200`}
          className={`${props.className} mb-5 flex shadow-custom_innerUnderline`}
        >
          <div className={`mr-5 py-3 ${context === 'Post' ? underline : ''}`}>
            <Link href="/" onClick={() => setContext('Post')}>
              Post
            </Link>
          </div>
          <div className={`mr-5 py-3 ${context === 'About' ? underline : ''}`}>
            <Link href="/about" onClick={() => setContext('About')}>
              About
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}
