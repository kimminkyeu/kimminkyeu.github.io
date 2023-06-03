'use client'
import * as React from 'react';
// import MuiAccordionSummary, {
//   AccordionSummaryProps,
// } from "@mui/material/AccordionSummary";

import {AccordionSummary} from "@mui/material";
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {grey} from "@mui/material/colors";
import Link from 'next/link';
import {slugifyTag} from '@/utils/helper';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordion, {AccordionProps} from '@mui/material/Accordion';
import {styled} from '@mui/material/styles';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface TagListProps {
  tagMap?: Map<string, number>;
}

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: grey[800],
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  },
});

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({theme}) => ({
  // border: `1px solid ${theme.palette.divider}`,
  backgroundColor: 'transparent',
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));



const AccordionDetails = styled(MuiAccordionDetails)(({theme}) => ({
  backgroundColor: 'white',
  padding: theme.spacing(2),
  border: '1px solid rgba(0, 0, 0, .125)',
}));

// const AccordionSummary = styled((props: AccordionSummaryProps) => (
//   <MuiAccordionSummary
//     // expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
//     {...props}
//   />
// ))(({ theme }) => ({
//   // backgroundColor:
//     // theme.palette.mode === "dark"
//       // ? "rgba(255, 255, 255, .05)"
//       // : "rgba(0, 0, 0, .03)",
//   // flexDirection: "row-reverse",
//   paddingRight: 0,
//   "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
//     // transform: "rotate(90deg)",
//   },
//   "& .MuiAccordionSummary-content": {
//     justifyContent: 'flex-end',
//     marginRight: theme.spacing(1),
//   },
// }));

export default function TagListSmall({tagMap}: TagListProps) {
  const [expanded, setExpanded] = React.useState(false);

  const handleClick = () => {
    setExpanded((prev) => !prev);
  }

  const renderTags = () => {
    if (!tagMap) return;
    const tagList = Array.from(tagMap);
    return tagList.map(([tag, count], i) => (
      <Button onClick={handleClick} sx={{justifyContent: 'flex-start'}} size='small' key={i}>
        {
          (tag === 'All') ? (
            <Link href={`/`}> {`${tag} (${count})`} </Link>
          ) : (
            <Link href={`/category/${slugifyTag(tag)}`}>{`${tag} (${count})`}</Link>
          )
        }
      </Button>
    ))
  }

  return (
    <div>
      <Accordion expanded={expanded} onClick={handleClick} sx={{fontSize: 20}}>
        <AccordionSummary
          sx={{
            paddingRight: 0,
            "& .MuiAccordionSummary-content": {
              justifyContent: 'flex-end',
              marginRight: theme.spacing(1),
            },
          }}
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Category</Typography>
        </AccordionSummary>
        <ThemeProvider theme={theme}>
        <AccordionDetails onClick={handleClick}>
          <ButtonGroup
            disableRipple
            orientation="vertical"
            aria-label="vertical contained button group"
            variant="text"
          >
            {renderTags()}
          </ButtonGroup>
        </AccordionDetails>
        </ThemeProvider>
      </Accordion>
    </div>
  );
}