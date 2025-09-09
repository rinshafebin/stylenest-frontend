import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axios';
import { useAuth } from '../../context/AuthContext'

export default function Logout() {
  const navigate = useNavigate();
  const { logout,token } = useAuth();

  useEffect(() => {
    const logoutUser = async () => {
      const refreshToken = localStorage.getItem("refresh_token");

      if (!refreshToken || !token ) {
        logout();
        navigate("/");
        return;
      }

      try {
        await axiosInstance.post("auth/logout/",
           { refresh_token : refreshToken },
           {
            headers :{
              'Authorization': `Bearer ${token}`, 
              'Content-Type': 'application/json',
            }
           }
          );
        logout();
        navigate("/");
      }catch (error) {
        console.error("Logout failed", error);
        logout()
        navigate("/");
      }
    };

    logoutUser();
  }, [navigate,logout]);

  return null;
}
