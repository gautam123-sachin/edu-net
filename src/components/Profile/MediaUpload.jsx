import React from 'react';
import { Typography } from '@mui/material';
import { CloudUpload } from '@mui/icons-material'; // Import CloudUpload icon

const MediaUpload = ({onFileChange}) => {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        onFileChange(file); 
      }

    return (
        <div style={{ marginTop: '20px', background: 'aquamarine', height: '100px', borderRadius: '10px', paddingTop: '20px', display: 'flex', justifyContent: 'center' }}>
            <label htmlFor="file-uploader-input" style={{ cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'center', color: '#007bff' }}>
                    <CloudUpload /> 
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', color: '#007bff' }}>
                    <Typography variant="body2">
                        Browse video
                    </Typography>
                </div>
                <input
                    type="file"
                    accept="video"
                    id="file-uploader-input"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
            </label>
        </div>
    )
}
export default MediaUpload;
