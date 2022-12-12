import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {message} from 'antd'
import { HideLoading, ShowLoading } from '../redux/alertsSlice'
import { useDispatch } from 'react-redux'

function Home() {
    const [title, settitle] = useState('')
    const [btnChange, setbtnChange] = useState(false)
    const [description, setdescription] = useState('')
    const [image, setimage] = useState('')
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const setFiletoBase=(file)=>{
        const reader=new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend=()=>{
            setimage(reader.result)
        }
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setbtnChange(true);
        if(!title || !image || !description){
            message.error('All fields are mandatory')
            setbtnChange(false);
            return;
        } 

        dispatch(ShowLoading());
        try {
            const response = await axios.post('/api/upload/upload-image',{
                title,
                description,
                image
            },
            {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              })
            if(response.data.success){
                console.log(response.data.message);
                setimage('')
                message.success(response.data.message)
                navigate('/all-images')
            }else{
                message.error(response.data.message)
                console.log(response.data.message)
            }
        } catch (error) {
            message.error(error.message)
            console.log(error.message);
        }
        dispatch(HideLoading());
        setbtnChange(false);
    }
  return (
    <div>
        <div className='image-upload'>
            <form action="" onSubmit={handleSubmit}>
            <h1>Image Uploader</h1>
            <input type="file" accept='image/*' required name='image' onChange={(e)=>{
                setFiletoBase(e.target.files[0])
            }} />
            <br />
            <input type="text" placeholder="Enter title" name='title' value={title} onChange={(e)=>{
                settitle(e.target.value)
            }}/>
            <br />
            <input type="text" placeholder="Enter description" name="description" value={description} onChange={(e)=>{
                setdescription(e.target.value);
            }}/>
            <br />
            <button type="submit" disabled={btnChange}>Upload</button>
            </form>
        </div>
    </div>
  )
}

export default Home