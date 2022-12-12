import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {message} from 'antd'
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [obj, setobj] = useState({
        name:'',
        email:'',
        password:'',
        cpassword:''
    });
    const navigate=useNavigate()
    const dispatch=useDispatch();
    const handleSubmit=async(e)=>{
        e.preventDefault()
        if(obj.password!==obj.cpassword){
            message.error('Passwords do not match')
            return;
        }
        try {
            dispatch(ShowLoading())
            const response=await axios.post('/api/users/register',obj);
            dispatch(HideLoading())
            console.log(response);
            message.success(response.data.message)
            navigate('/login')
        } catch (error) {
            message.error(error.message);
        }
    }
    const handleChange=(e)=>{
        let name=e.target.name
        let value=e.target.value
        obj[name]=value;
        setobj({...obj});
    }
    useEffect(() => {
      if(localStorage.getItem('token')) navigate('/');
    }, [])
    
  return (
    <>
    <h1>Register</h1>
    <div className="only-img-b">
        <div className=''>
            <form onSubmit={handleSubmit} method='post'>
                <input type="text" placeholder='Enter your name' name="name" value={obj?.name} onChange={handleChange} required/>
                <br />
                <input type="email" placeholder='Email' value={obj?.email} name="email" onChange={handleChange} required/>
                <br />
                <input type="password" placeholder='Password' value={obj?.password} name="password" onChange={handleChange} required/>
                <br />
                <input type="password" placeholder='Confirm Password' name="cpassword" value={obj?.cpassword} onChange={handleChange} required/>
                <br />
                <button type='submit'>Register</button>
            </form>
        </div>
    </div>
    </>
  )
}

export default Register