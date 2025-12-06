import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios'; 

export default function Logout() {
  const navigate = useNavigate();
  const { logout, token } = useAuth();

  useEffect(() => {
    const logoutUser = async () => {
      const refreshToken = localStorage.getItem("refresh_token");

      if (!refreshToken || !token) {
        logout();
        navigate("/");
        return;
      }

      try {
        await axios.post("/auth/logout/", 
          { refresh_token: refreshToken },
          { headers: { 
              'Authorization': `Bearer ${token}`, 
              'Content-Type': 'application/json'
            } 
          }
        );
      } catch (error) {
        console.error("Logout failed", error);
      } finally {
        logout();
        navigate("/");
      }
    };

    logoutUser();
  }, [navigate, logout, token]);

  return null; 
}
