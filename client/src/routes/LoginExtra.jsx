import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import AnomalyFinder from '../apis/AnomalyFinder';

const Profile = () => {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getProfileData = async () => {
      console.log("pre-getting token silently");
      const accessToken = await getAccessTokenSilently();
      console.log("got the token silently");
      const response = await axios.get('http://localhost:3001/api/v1/anomalies/api/protcted', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("we got a response");
      console.log(response.data);
    };

    getProfileData();
  }, [getAccessTokenSilently]);

  return <div>Your profile</div>;
};

export default Profile;