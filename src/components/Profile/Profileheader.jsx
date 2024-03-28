import React from 'react';
import {
  useTheme,
  useMediaQuery,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Avatar,
  Button
} from '@mui/material';
import EditForm from "./EditForm.jsx";

const Profileheader = ({ user }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = React.useState(false);
  const handleEdit = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  };
  const { firstname, lastname } = user;

  const getFullName = () => {
    if (firstname && lastname) {  
      return `${firstname} ${lastname}`;
    }
    return 'N/A';
  }

  return (
    <Grid container spacing={2} >
      <Grid item xs={12} lg={12}>
        <Card className="mb-4" sx={isMobile ? {} : { width: 1065, height: 378 }}>
          <CardMedia
            component="img"
            alt="Banner image"
            height="200"
            image="https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/pages/profile-banner.png"
            className="rounded-top"
          />
          <CardContent className="user-profile-header d-flex flex-column flex-lg-row text-sm-start text-center mb-4">
            <div className="flex-shrink-0 mt-n2 mx-lg-0 mx-auto" style={{ marginTop: '-94px' }}>
              <Avatar
                src="https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/avatars/1.png"
                sx={{ width: 145 }} alt="user image" className="d-block h-auto ms-0 ms-sm-4 rounded user-profile-img"
              />
            </div>
            <div className="flex-grow-1 mt-3 mt-lg-5">
              <div className="d-flex align-items-md-end align-items-sm-start align-items-center justify-content-md-between justify-content-start mx-4 flex-md-row flex-column gap-4">
                <div className="user-profile-info">
                <Typography variant="h4">{getFullName()}</Typography>
                </div>
                <Button variant="contained" color="primary" startIcon={<i className="mdi mdi-account-check-outline me-1"></i>} onClick={handleEdit}>Edit</Button>
                <EditForm
                  open={open}
                  onClose={handleClose}
                  user={user}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>

  );
};

export default Profileheader;
