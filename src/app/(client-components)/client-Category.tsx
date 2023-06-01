'use client'


import { PropertyTag } from "../api/type"
import TagIcon from '@mui/icons-material/Tag';
import { grey } from "@mui/material/colors";
import { getMuiColorByTagColor } from "@/utils/helper";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

interface CategoryViewProps {
    selectedTag: PropertyTag;
}

export default function CategoryView({selectedTag}: CategoryViewProps) {

    const color = getMuiColorByTagColor(selectedTag.color);
    return (
        <div className=" flex ">
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <TagIcon fontSize="small" sx={{color: color}}/>
                <Typography borderBottom={0.7} fontStyle={'italic'} variant="subtitle1" color={color} >
                    {selectedTag.name}
                </Typography>
            </Box>
        </div>
    )
}