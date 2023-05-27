import { createTheme } from '@mui/material/styles';

// Create a theme instance.
// 정의되어있지 않은 custom variables을 추가하여 사용할 경우, 타입스크립트(.ts)는 인터페이스를 다시 정의 해 주어야 해서 복잡합니다.
// 테마 만큼은 자바스크립트(.js)를 추천 합니다.
import {
  grey,
  brown,
  orange,
  yellow,
  green,
  blue,
  purple,
  pink,
  red,
} from '@mui/material/colors';

export const BlogTheme = createTheme({
  typography: {
    fontFamily: ['Noto Sans KR', 'sans-serif'].join(','),
  },
  palette: {
    mode: 'light',
    // tag 색상을 위해 custom color 제공.
    // grey: {main: grey[300], contrastText: #fff}
    // brown: {brown[300],}
    // orange: {orange[300],}
    // yellow: yellow[300],
    // green: green[300],
    // blue: blue[300],
    // purple: purple[300],
    // pink: pink[300],
    // red: red[300],
  },
});

export default BlogTheme;
