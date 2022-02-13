import React, {FC} from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

import {IRatingProps} from "../../../intefaces";

const StarRating:FC<IRatingProps> = ({rating}) => {
    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Rating
                    name='movie-rating'
                    value={rating}
                    readOnly
                    precision={0.5}
                    max={10}
                    size='small'
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />}
                />
            </Box>
        </div>
    );
};

export {StarRating};