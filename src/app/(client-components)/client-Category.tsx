'use client'

import TagIcon from '@mui/icons-material/Tag';
import {Typography} from "@mui/material";
import {Box} from "@mui/system";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import {useRouter} from "next/navigation";

interface CategoryViewProps {
  selectedTag?: { name: string, count: number };
}

export default function CategoryView({selectedTag}: CategoryViewProps) {
  const router = useRouter();
  const handleClose = () => {
    router.push('/');
  }

  if (!selectedTag) return <></>;
  return (
    <div className=" flex ">
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <Typography variant="subtitle1" sx={{marginRight: 1}}>
          {'Filtered by'}
        </Typography>
        <Typography borderBottom={0.7} fontStyle={'italic'} variant="subtitle1">
          {/*<TagIcon fontSize="small"/>*/}
          {`${selectedTag.name} (${selectedTag.count})`}
        </Typography>
        <IconButton size={'small'} aria-label="delete" onClick={handleClose}>
          <CloseIcon fontSize={'small'}/>
        </IconButton>
      </Box>
    </div>
  )
}