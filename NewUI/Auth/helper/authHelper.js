import { axios } from 'axios';
import api from './../../api/webapi';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

export const checkAuthentication = () => {
  // if (typeof window == "undefined") {
  //   return false;
  // }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};



export const ProtectedRoute = ({
    userRole,
    allowedRole,
    redirectPath = '/',
    children,
  }) => {
    console.log(checkAuthentication().role,allowedRole);
    if (checkAuthentication().role !== allowedRole ) {
      toast.error("ACCESS DENIED" , {
        position: "bottom-center",
        autoClose: 1500
      })
      return <Navigate to={redirectPath} replace />
    }
  
    return children ? children : <Outlet />;
  };
