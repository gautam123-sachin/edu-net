import React, { useEffect, useState } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';

import axios from 'axios';

import Profileheader from './Profileheader';
import Info from './Info';
import VideoUpload from './VideoUpload';

const Profile = ({ user }) => {
  console.log('user', user.user._id);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [fetchedUser, setFetchedUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/v1/user/${user.user?._id}`);
        setFetchedUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    if (user) {
      fetchUserDetails();
    }
  }, [user]); 

  console.log('fetchedUser', fetchedUser);

  return (
    <>
      {fetchedUser && <Profileheader user={fetchedUser} />} 
      <div
        style={isMobile ? {} : { display: 'flex', gap: '20px' }}
      >
        {fetchedUser && <Info user={fetchedUser} />}
        <VideoUpload />
      </div>
    </>
  )
}
export default Profile;
