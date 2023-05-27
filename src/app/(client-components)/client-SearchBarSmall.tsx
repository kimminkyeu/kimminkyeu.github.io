'use client';

import * as React from 'react';
import {styled, alpha} from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import {Box, Button, IconButton} from '@mui/material';
import Link from "next/link";

const Search = styled('div')(({theme}) => ({
  position: 'relative',
  borderRadius: 100,
  backgroundColor: alpha(theme.palette.common.black, 0.03),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.07),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

interface SearchBarProps {
  className?: string;
}

import * as MuiColors from '@mui/material/colors';
import {Tooltip} from "@mui/material";

export default function SearchBarSmall(props: SearchBarProps) {
  // const [openDialog, setOpen] = React.useState<boolean>(false);
  return (
    <div className={props.className}>
      <Link href={'/search'}>
        <Tooltip title="Search" placement="bottom-start">
          <IconButton aria-label="search">
            <SearchIcon style={{
              color: MuiColors.grey[700]
            }}/>
          </IconButton>
        </Tooltip>
      </Link>
    </div>
  );
}
