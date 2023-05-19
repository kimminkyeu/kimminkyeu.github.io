import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from 'src/app/navbar';
import { Config } from 'src/config/config';
import Footer from './footer';

const inter = Inter({ subsets: ['latin'] });

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata
// Next13 메타 데이터 설정 방식.
export const metadata = {
  title: Config.BLOG_TITLE,
  description: Config.BLOG_DESCRIPTION,
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar className=" border-b" />
        <main>{children}</main>
        <Footer className=" border-t" />
      </body>
    </html>
  );
}
