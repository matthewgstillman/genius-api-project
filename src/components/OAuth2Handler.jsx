import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from 'react-oauth2-code-pkce';
import { setAuthToken, api } from './ApiComponent';
import { generatePkcePair } from '../utils/pkce'; 

const OAuth2Handler = () => {
  const { authService } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initiateAuth = async () => {
      if (authService) {
        console.log("AuthService initialized", authService);

        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        console.log("Code from URL:", code);

        if (code) {
          const verifier = sessionStorage.getItem('pkce_verifier');
          if (!verifier) {
            console.error('PKCE code verifier not found in session storage');
            return;
          }

          authService.handleAuthorizationCode(code, { code_verifier: verifier })
            .then(() => {
              console.log("Authorization code handled successfully");
              setIsLoading(false);
            })
            .catch((err) => {
              console.error("Error handling authorization code", err);
            });
        } else if (!authService.isAuthenticated()) {
          const { verifier, challenge } = await generatePkcePair();
          sessionStorage.setItem('pkce_verifier', verifier);
          console.log("User not authenticated, redirecting to authorization...");
          authService.authorize({
            code_challenge: challenge,
            code_challenge_method: 'S256'
          });
        } else {
          console.log("User already authenticated");
          setIsLoading(false);
        }
      }
    };

    initiateAuth();
  }, [authService]);

  useEffect(() => {
    const fetchAccessToken = async () => {
      if (authService && authService.isAuthenticated()) {
        const token = authService.getAuthTokens();
        console.log(`Token: ${token}`);
        if (token && token.accessToken) {
          console.log("Access token received", token.accessToken);
          setAuthToken(token.accessToken);
          fetchUserData();
        } else {
          console.log("No access token found");
        }
      }
    };

    const fetchUserData = async () => {
      try {
        const response = await api.get('/account');
        console.log("User data fetched", response.data);
      } catch (err) {
        console.error("Error fetching user data", err);
      }
    };

    fetchAccessToken();
  }, [authService]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {authService && authService.isAuthenticated() ? (
        <div>Authenticated</div>
      ) : (
        <div>Redirecting to login...</div>
      )}
    </div>
  );
};

export default OAuth2Handler;
