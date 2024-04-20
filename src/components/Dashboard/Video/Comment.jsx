import React from 'react';
import { Typography } from '@mui/material';

const Comment = ({ text, time }) => {
    return (
        <div>
            <Typography variant="body1" gutterBottom>
                {text}
            </Typography>
            <Typography variant="caption" color="textSecondary">
                {time}
            </Typography>
        </div>
    );
}

export default Comment;
