import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { useNavigate } from "react-router-dom";
import {message} from 'antd'
function Login() {
  const [obj, setobj] = useState({
    email: "",
    password: "",
  });
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/users/login", obj);
      dispatch(HideLoading())
      if(response.data.success){
        message.success(response.data.message)
        localStorage.setItem('token',response.data.data)
        navigate('/');
      }else{
        message.error(response.data.message)
      }
    } catch (error) {
      console.log(error.message);
      message.error(error.message)
    }
  };
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    obj[name] = value;
    setobj({ ...obj });
  };
  useEffect(() => {
    if(localStorage.getItem('token')) navigate('/');
  }, [])
  
  return (
    <>
      <h1>Login</h1>
      <div className='only-img-b'>
        {/* {errorMessage} */}
        <div className="">
          <form onSubmit={handleSubmit} method="post">
            <input
              type="email"
              placeholder="Email"
              value={obj?.email}
              name="email"
              onChange={handleChange}
              required
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={obj?.password}
              name="password"
              onChange={handleChange}
              required
            />
            <br />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
