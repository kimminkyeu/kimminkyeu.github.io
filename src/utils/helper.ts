import * as MuiColors from '@mui/material/colors';

export function slugifyTag(str: string) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
  str = str.toLowerCase(); // convert string to lowercase
  str = str.replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-'); // remove consecutive hyphens
  return str;
}

export const getMuiColorByTagColor = (tagColor: string) => {
  const COLOR_VALUE = 400;
  switch (tagColor) {
    case 'gray':
      return MuiColors.grey[COLOR_VALUE];
    case 'brown':
      return MuiColors.brown[COLOR_VALUE];
    case 'orange':
      return MuiColors.orange[COLOR_VALUE];
    case 'yellow':
      return MuiColors.yellow[COLOR_VALUE + 400];
    case 'green':
      return MuiColors.green[COLOR_VALUE];
    case 'blue':
      return MuiColors.blue[COLOR_VALUE];
    case 'purple':
      return MuiColors.purple[COLOR_VALUE - 100];
    case 'pink':
      return MuiColors.pink[COLOR_VALUE - 100];
    case 'red':
      return MuiColors.red[COLOR_VALUE - 100];
    default:
      return MuiColors.common[COLOR_VALUE];
  }
}