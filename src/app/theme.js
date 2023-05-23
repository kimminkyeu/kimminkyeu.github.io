import { createTheme } from '@mui/material/styles';

// Create a theme instance.
// 정의되어있지 않은 custom variables을 추가하여 사용할 경우, 타입스크립트(.ts)는 인터페이스를 다시 정의 해 주어야 해서 복잡합니다.
// 테마 만큼은 자바스크립트(.js)를 추천 합니다.
export const BlogTheme = createTheme({
  typography: {
    fontFamily: ['Noto Sans KR', 'sans-serif'].join(','),
    // fontFamily: ['Nanum Myeongjo', 'serif'].join(','),
    // fontFamily: ['Nanum Pen Script', 'cursive'].join(','),
  },
  palette: {
    mode: 'light',
  },
});

export default BlogTheme;
