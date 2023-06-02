'use client'
import * as React from 'react';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PropertyTag } from '../api/type';
import Link from 'next/link';
import { slugifyTag } from '@/utils/helper';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { styled } from '@mui/material/styles';

interface TagListProps {
    tagSet?: Set<PropertyTag>;
}

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function TagListSmall({tagSet}: TagListProps) {

  const renderTags = () => {
    if (!tagSet) return;
    const tagList = Array.from(tagSet);
    return tagList.map((tag, i) => (
        <li key={i} className='m-2 text-neutral-500 text-base lg:text-sm'>
            <Link href={`/category/${slugifyTag(tag.name)}`} >
                {tag.name}
            </Link>
        </li>
        ))
    }

  return (
    <div>
      {/* <Accordion sx={{ boxShadow:0, border:0.5, borderColor: grey[400], color: grey[600]}}> */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography >Category</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {tagSet && <ul>{renderTags()}</ul>}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}