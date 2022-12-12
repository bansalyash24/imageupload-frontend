import React from 'react'
import { useSelector } from 'react-redux'

function UserProfile() {
    const {user}=useSelector(state=>state.users);
    console.log(user)
  return (
    <div>
        Welcome back <b>{user.name}</b> ! 
    </div>
  )
}

export default UserProfile