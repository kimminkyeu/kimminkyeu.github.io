import './styles/globals.css';
// import {Inter} from 'next/font/google';
import {Noto_Sans_KR} from "next/font/google";
// import {Roboto} from "next/font/google";
import Navbar from 'src/app/(client-components)/client-Navbar';
import {Config} from 'src/config/config';
import Footer from './footer';
import Header from './header';
import Notion from '@/app/api/notionAPI'; 

const notoSansKr = Noto_Sans_KR({
  weight: ['100', '300', '400', '500', '700', '900'],
  display: 'swap',
  subsets: ['latin'],
  fallback: [
    // 디자이너분과 상의한 폴백 폰트 넣으시면 됩니다
    '-apple-system',
    'Malgun Gothic',
    'Apple SD Gothic Neo',
    'Roboto',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'sans-serif',
  ],
});
// const inter = Inter({subsets: ['latin']});
// const noto_sans_kr = Noto_Sans_KR(...);

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata
// Next13 메타 데이터 설정 방식.
export const metadata = {
  title: Config.BLOG_TITLE,
  description: Config.BLOG_DESCRIPTION,
};

export default async function RootLayout({
                                     // Layouts must accept a children prop.
                                     // This will be populated with nested layouts or pages
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  const tagMap = await Notion.getTagSetFromDatabase(Config.STATUS_PUBLISHED_ARTICLE);

  return (
    <html lang="en">
    <body className={notoSansKr.className}>
    <div className="relative h-fit">
      <Header/>
      <div className="sticky -top-1 z-50">
        <Navbar tagMap={tagMap}/>
      </div>
      <main className=' flex justify-center mx-6 mt-6 sm:mx-10'>{children}</main>
      <Footer className=" border-t"/>
    </div>
    </body>
    </html>
  );
}
