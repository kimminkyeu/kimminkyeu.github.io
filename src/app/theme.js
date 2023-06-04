import {createTheme} from '@mui/material/styles';

export const BlogTheme = createTheme({
    typography: {
        fontFamily: ['Noto Sans KR', 'sans-serif'].join(','),
    },
    palette: {
        mode: 'light',
    },
});

export default BlogTheme;
