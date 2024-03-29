
import * as MuiColors from '@mui/material/colors';

export function slugifyTag(tag: string) {
  let slug: string;
  if (tag.localeCompare('C/C++') === 0) {
    slug = 'C-Cpp'
  } else {
    slug = String(tag).replaceAll(' ', '-');
  }
  return slug;
}

export function unslugifyTag(sluggedTag) {
  if (sluggedTag === 'C-Cpp') return 'C/C++';
  else return sluggedTag.replaceAll('-', ' ');
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
