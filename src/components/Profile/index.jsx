import React from 'react';
import { useTheme, useMediaQuery } from '@mui/material';

import Profileheader from './Profileheader';
import Info from './Info';
import VideoUpload from './VideoUpload';

const Profile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      <Profileheader />
      <div
        style={isMobile ? {} : { display: 'flex', gap: '20px' }}
      >
        <Info />
        <VideoUpload />
      </div>
    </>
  )
}
export default Profile;