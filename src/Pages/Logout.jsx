import React from 'react'
import { useNavigate } from 'react-router-dom'

function Logout() {
    const navigate=useNavigate();
    const handleChange=()=>{
        localStorage.removeItem('token')
        navigate('/login');
    }
  return (
    <div>
        <button onClick={handleChange}>Logout</button>
    </div>
  )
}

export default Logout