import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      const query = new URLSearchParams(window.location.search);
      const code = query.get("code");

      try {
        const response = await axios.get("http://localhost:3001/callback", {
          params: { code },
        });
        const { access_token } = response.data;
        localStorage.setItem("access_token", access_token);
        navigate("/");
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    fetchToken();
  }, [navigate]);

  return <div>Loading...</div>;
};

export default Callback;
