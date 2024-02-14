// import React, { useState } from 'react';
// import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

// const GoLive = ({ open, onClose }) => {
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [titleError, setTitleError] = useState(false);
//     const [descriptionError, setDescriptionError] = useState(false);

//     const handleGoLive = () => {
//         // Validate inputs
//         if (!title.trim()) {
//             setTitleError(true);
//             return;
//         }
//         if (!description.trim()) {
//             setDescriptionError(true);
//             return;
//         }

//         // Perform actions to go live with the provided title and description
//         console.log('Going live with title:', title, 'and description:', description);

//         // Reset errors
//         setTitleError(false);
//         setDescriptionError(false);

//         // Close the dialog
//         onClose();
//     };

//     const handleClose = () => {
//         // Close the dialog without taking any action
//         onClose();
//     };

//     return (
//         <Dialog open={open} onClose={handleClose}>
//             <DialogTitle>Go Live</DialogTitle>
//             <DialogContent>
//                 <TextField
//                     autoFocus
//                     margin="dense"
//                     label="Title"
//                     fullWidth
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     error={titleError}
//                     helperText={titleError ? 'Title is required' : ''}
//                 />
//                 <TextField
//                     margin="dense"
//                     label="Description"
//                     fullWidth
//                     multiline
//                     rows={4}
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     error={descriptionError}
//                     helperText={descriptionError ? 'Description is required' : ''}
//                 />
//             </DialogContent>
//             <DialogActions>
//                 <Button onClick={handleClose} color="primary">
//                     Cancel
//                 </Button>
//                 <Button onClick={handleGoLive} color="primary">
//                     Go Live
//                 </Button>
//             </DialogActions>
//         </Dialog>
//     );
// };

// export default GoLive;


import React from 'react';
import { Button, Typography } from '@mui/material';
import { LiveTv } from '@mui/icons-material';

const GoLive = () => {
    return (
        <>
            <Typography variant="h5" gutterBottom>
                Go Live
            </Typography>
            <Button variant="contained" startIcon={<LiveTv />} color="primary">
                Go Live
            </Button>
        </>
    );
}

export default GoLive;
