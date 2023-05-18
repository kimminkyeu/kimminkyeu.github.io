// 'use client';
// import '@/app/globals.css';
// import theme from '@/app/theme';
// import CssBaseline from '@mui/material/CssBaseline';
// import { ThemeProvider } from '@mui/material/styles';

// (1) 게시글 혹은 리스트 부분
// (2) 왼쪽에는 태그별로 정리한 부분 넣기.
export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" flex justify-between">
      {/* <div className=" bg-slate-200">----------Left Box----------</div> */}
      <div className=" flex-1">
        {children} {/* 본문 (글 리스트 혹은 글한개 본문) */}
      </div>
      {/* <div className=" w-100 bg-slate-200">Right Box</div> */}
    </div>
  );
}
