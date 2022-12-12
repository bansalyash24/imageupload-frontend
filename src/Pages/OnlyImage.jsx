import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function OnlyImage() {
    const {id}=useParams();
    const [data,setData]=useState({});
    const getData=async()=>{
        try{
            const response=await axios.post('/api/upload/only-image/',{
                id:id},{
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  });
            setData(response.data.data)
            console.log(response.data.data);
        }catch(error){
            console.log(error.message)
        }
        
    }
    useEffect(() => {
        getData()
    }, [])
  return (
    <div>
        <div className='only-img-b' style={{overflow:"hidden"}}>
            <div>
            {data &&
                <>
                <img className="only-img" src={data?.image?.url} alt="" />
                <br />
                <div>

                <h2 style={{color:"red",padding:"auto",marginBottom:"0px"}}>Title:{data?.title}</h2>
                <h2 style={{color:"red",padding:"auto",marginBottom:"0px"}}>Views:{data?.views?.length}</h2>
                
                <p><h2 style={{color:"red",padding:"auto",marginBottom:"0px"}}>Description:</h2>{data?.description}</p>
                </div>
                </> 
            }
            </div>
        </div>
    </div>
  )
}

export default OnlyImage