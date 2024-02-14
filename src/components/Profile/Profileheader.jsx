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

const Profileheader = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
                  <Typography variant="h4">John Doe</Typography>
                  <ul className="list-inline mb-0 d-flex align-items-center flex-wrap justify-content-sm-start justify-content-center gap-2">
                    <li className="list-inline-item">
                      <i className="mdi mdi-invert-colors me-1 mdi-20px"></i><span className="fw-medium">UX Designer</span>
                    </li>
                    <li className="list-inline-item">
                      <i className="mdi mdi-map-marker-outline me-1 mdi-20px"></i> <span className="fw-medium">Vatican City</span>
                    </li>
                    <li className="list-inline-item">
                      <i className="mdi mdi-calendar-blank-outline me-1 mdi-20px"></i> <span className="fw-medium">Joined April 2021</span>
                    </li>
                  </ul>
                </div>
                <Button variant="contained" color="primary" startIcon={<i className="mdi mdi-account-check-outline me-1"></i>}>Connected</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
    
  );
};

export default Profileheader;
