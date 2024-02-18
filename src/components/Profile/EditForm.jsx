import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    Avatar
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const EditForm = ({ open, onClose }) => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        address: '',
        phone: '',
        email: '',
        file: null
    });
    const [errors, setErrors] = useState({});

    const handleClose = () => {
        onClose();
    };

    const handleCreate = () => {
        // Add logic for creating the form data
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        if (!formData.firstname.trim()) {
            newErrors.firstname = 'First name is required';
            isValid = false;
        }
        if (!formData.lastname.trim()) {
            newErrors.lastname = 'Last name is required';
            isValid = false;
        }
        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
            isValid = false;
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone is required';
            isValid = false;
        } else if (!/^\d+$/.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number';
            isValid = false;
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' }); // Clear error message when the field changes
    };

    const handleSubmit = () => {
        const isValid = validateForm();
        if (isValid) {
            handleCreate();
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Form</DialogTitle>
            <DialogContent>
                <div className="flex-shrink-0 mt-n2 mx-lg-0 mx-auto">
                    <Avatar
                        src="https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/avatars/1.png"
                        sx={{ width: 145 }}
                        alt="user image"
                        className="d-block h-auto ms-0 ms-sm-4 rounded user-profile-img"
                    />
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        sx={{ marginLeft: '20px', marginTop: '14px' }}
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload file
                        <VisuallyHiddenInput type="file" />
                    </Button>
                </div>
                <TextField
                    autoFocus
                    margin="dense"
                    label="First Name"
                    type="text"
                    fullWidth
                    size="small"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    error={!!errors.firstname}
                    helperText={errors.firstname}
                    inputProps={{maxLength: 20}}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    label="Last Name"
                    type="text"
                    fullWidth
                    size="small"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    error={!!errors.lastname}
                    helperText={errors.lastname}
                    inputProps={{maxLength: 20}}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    label="Address"
                    type="text"
                    fullWidth
                    size="small"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    error={!!errors.address}
                    helperText={errors.address}
                    inputProps={{maxLength: 300}}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    label="Phone"
                    type="text"
                    fullWidth
                    size="small"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    inputProps={{maxLength: 12}}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    label="Email"
                    type="email"
                    fullWidth
                    size="small"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    inputProps={{maxLength: 50}}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit} color="primary">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditForm;
