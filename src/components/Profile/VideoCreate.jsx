import React, { useState } from 'react';
import { 
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    DialogActions, 
    TextField,
 } from '@mui/material';
import MediaUpload from './MediaUpload';

const VideoCreate = ({ open, onClose }) => {

    const [videoForm, setVideoForm] = useState({
        title: '',
        description: '',
        videoFile: null,
    });
    const [error, setError] = useState('');
    
    const { title, description, videoFile } = videoForm;

    const handleCreate = () => {
        // Validate the input fields
        if (title.trim() === '' || description.trim() === '' || !videoFile) {
            setError('Please fill out all fields and upload a video file.');
            return;
        }

        // Create a FormData object to handle file upload
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('videoFile', videoFile);

        // Clear the input fields
        setVideoForm({
            title: '',
            description: '',
            videoFile: null,
        });

        // Close the dialog
        onClose();
    };

    const handleFileChange = (e) => {
        // Update the videoFile state with the selected file
        setVideoForm({
            ...videoForm,
            videoFile: e.target.files[0],
        });
    };

    const handleClose = () => {
        // Clear the input fields
        setVideoForm({
            title: '',
            description: '',
            videoFile: null,
        });
        // Close the dialog
        onClose();
    }
return(
    <>
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Create Video</DialogTitle>
        <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Title"
                    fullWidth
                    value={title}
                    onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                />
                <TextField
                    margin="dense"
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                />
                {/* <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    style={{ marginTop: '16px' }}
                /> */}
                <MediaUpload 
                onFileChange={handleFileChange}
                />
                {error && <Typography color="error">{error}</Typography>}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleCreate} color="primary">Create</Button>
            </DialogActions>
    </Dialog>
    </>
)
}
export default VideoCreate;