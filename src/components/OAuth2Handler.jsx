import React, { useEffect, useContext } from 'react';
import { AuthContext } from 'react-oauth2-code-pkce';
import { setAuthToken, api } from './ApiComponent';

const OAuth2Handler = () => {
  const { authService } = useContext(AuthContext);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      authService.authorize();
    }
  }, [authService]);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const token = authService.getAuthTokens();
      if (token && token.accessToken) {
        setAuthToken(token.accessToken);
        fetchUserData();
      }
    };

    const fetchUserData = async () => {
      try {
        const response = await api.get('/account');
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAccessToken();
  }, [authService]);

  return (
    <div>
      {authService.isAuthenticated() ? (
        <div>Authenticated</div>
      ) : (
        <div>Redirecting to login...</div>
      )}
    </div>
  );
};

export default OAuth2Handler;