'use client'


import { PropertyTag } from "../api/type"
import TagIcon from '@mui/icons-material/Tag';
import { grey } from "@mui/material/colors";
import { getMuiColorByTagColor } from "@/utils/helper";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

interface CategoryViewProps {
    selectedTag?: {name: string, count: number};
}

export default function CategoryView({selectedTag}: CategoryViewProps) {
    if (!selectedTag) return <></>;
    return (
        <div className=" flex ">
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                {/* <TagIcon fontSize="small" sx={{color: color}}/> */}
                <TagIcon fontSize="small" />
                {/* <Typography borderBottom={0.7} fontStyle={'italic'} variant="subtitle1" color={color} > */}
                <Typography borderBottom={0.7} fontStyle={'italic'} variant="subtitle1" >
                    {`${selectedTag.name} (${selectedTag.count})`}
                </Typography>
            </Box>
        </div>
    )
}