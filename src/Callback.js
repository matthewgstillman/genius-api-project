import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccessToken = async () => {
      const params = new URLSearchParams(location.search);
      const code = params.get("code");

      if (code) {
        try {
          const response = await axios.post("http://localhost:3001/callback", {
            code,
          });
          const { access_token } = response.data;

          if (access_token) {
            localStorage.setItem("access_token", access_token);
            navigate(`/?access_token=${access_token}`);
          } else {
            console.error("No access token received");
          }
        } catch (error) {
          console.error("Error fetching access token:", error);
        }
      }
    };

    fetchAccessToken();
  }, [location, navigate]);

  return <div>Callback Page</div>;
};

export default Callback;
