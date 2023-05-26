import './styles/globals.css';
import {Inter} from 'next/font/google';
// import {Noto_Sans_KR} from "next/font/google";
// import {Roboto} from "next/font/google";
import Navbar from 'src/app/(client-components)/client-Navbar';
import {Config} from 'src/config/config';
import Footer from './footer';
import Header from './header';

const inter = Inter({subsets: ['latin']});
// const noto_sans_kr = Noto_Sans_KR(...);

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
    <div className="relative h-fit">
      <Header className="border-b px-5 py-3"/>
      <Navbar className="sticky -top-1 z-50 bg-white"/>
      <div className="container mx-auto flex max-w-2xl flex-col px-6 md:px-0">
        <main className=" ">{children}</main>
      </div>
      <Footer className=" border-t"/>
    </div>
    </body>
    </html>
  );
}
