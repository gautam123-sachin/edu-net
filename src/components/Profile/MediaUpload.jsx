import React from 'react';
import { Typography } from '@mui/material';
import { CloudUpload } from '@mui/icons-material'; // Import CloudUpload icon

export const MediaUploadForVideo = ({ onFileChange }) => {
    const handleFileChange = (e) => {
        console.log("Event:", e); 
        const file = e.target.files[0];
        onFileChange(file);
    };


    return (
        <div style={{ marginTop: '20px', background: 'aquamarine', height: '100px', borderRadius: '10px', paddingTop: '20px', display: 'flex', justifyContent: 'center' }}>
            <label htmlFor="video-uploader-input" style={{ cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'center', color: '#007bff' }}>
                    <CloudUpload />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', color: '#007bff' }}>
                    <Typography variant="body2">
                        Browse Video
                    </Typography>
                </div>
                <input
                    type="file"
                    accept="video/*"
                    id="video-uploader-input"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
            </label>
        </div>
    );
};

export const MediaUploadForImage = ({ onFileChange }) => {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        onFileChange(file);
    };

    return (
        <div style={{ marginTop: '20px', background: 'aquamarine', height: '100px', borderRadius: '10px', paddingTop: '20px', display: 'flex', justifyContent: 'center' }}>
            <label htmlFor="image-uploader-input" style={{ cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'center', color: '#007bff' }}>
                    <CloudUpload />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', color: '#007bff' }}>
                    <Typography variant="body2">
                        Browse Image
                    </Typography>
                </div>
                <input
                    type="file"
                    accept="image/*"
                    id="image-uploader-input"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
            </label>
        </div>
    );
};
