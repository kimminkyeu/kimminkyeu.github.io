'use client'
import * as React from 'react';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {PropertyTag} from '../api/type';
import Link from 'next/link';
import {slugifyTag} from '@/utils/helper';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordion, {AccordionProps} from '@mui/material/Accordion';
import {styled} from '@mui/material/styles';

interface TagListProps {
  tagMap?: Map<string, number>;
}

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({theme}) => ({
  // border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    backgroundColor: 'transparent',
    borderBottom: 0,
  },
  '&:before': {
    backgroundColor: 'white',
    display: 'none',
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({theme}) => ({
  padding: theme.spacing(2),
  // borderTop: '1px solid rgba(0, 0, 0, .125)',
  border: '1px solid rgba(0, 0, 0, .125)',
}));

export default function TagListSmall({tagMap}: TagListProps) {

  const renderTags = () => {
    if (!tagMap) return;
    const tagList = Array.from(tagMap);
    return tagList.map(([tag, count], i) => (
      <li key={i} className='m-2 text-neutral-500 text-base lg:text-sm'>
        {
          (tag === 'All') ? (
            <Link href={`/`}> {`${tag} (${count})`} </Link>
          ) : (
            <Link href={`/category/${slugifyTag(tag)}`}>{`${tag} (${count})`}</Link>
          )
        }
      </li>
    ))
  }

  return (
    <div>
      <Accordion sx={{fontSize: 20}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Category</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {<ul>{renderTags()}</ul>}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}