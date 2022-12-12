import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import { SetUser } from '../redux/usersSlice';
import {message} from 'antd'
import Logout from '../Pages/Logout';
import UserProfile from './UserProfile';
import Navbar from './Navbar';

function ProtectedRoute({children}) {
    const dispatch=useDispatch()
    const {user}=useSelector(state=>state.users)
    const navigate=useNavigate();
    const url="https://imagebackend-production.up.railway.app";
    const validateToken = async () => {
        try {
          dispatch(ShowLoading());
          const response = await axios.post(
            `${url}/api/users/get-user-by-id`,
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          dispatch(HideLoading());
          if (response.data.success) {
            dispatch(SetUser(response.data.data));
          } else {
            localStorage.removeItem("token");
            message.error(response.data.message);
            navigate("/login");
          }
        } catch (error) {
          dispatch(HideLoading());
          localStorage.removeItem("token");
        //   message.error(error.message);
          navigate("/login");
        }
      };
      useEffect(() => {
        if(localStorage.getItem('token')){
            validateToken();
        }else{
            navigate('/login');
        }
      },[])
      
  return (
    <div>
        {user && 
        <>
        <Navbar/>
        {children}
        </>
        }
    </div>
  )
}

export default ProtectedRoute