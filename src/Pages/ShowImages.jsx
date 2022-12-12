import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ShowImages() {
    const navigate=useNavigate()
  const [data, setData] = useState([]);
  const url="https://imagebackend-production.up.railway.app";
  const getData = async () => {
    try {
      const response = await axios.post(`${url}/api/upload/all-image`,{},{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getData();
  },[]);

  return (
    <div>
      <div class="main">
        <h1>All images</h1>

        <ul class="cards">
          {data &&
            data.map((dt, key) => {
              return (
                  <li class="cards_item" id={key}>
                    <div class="card">
                      <div class="card_image">
                        <img src={dt.image.url} />
                      </div>
                      <div class="card_content">
                        <h2 class="card_title">
                          <b>{dt.title}</b>
                        </h2>
                        <p class="card_text">{dt.description}</p>
                        <button class="btn card_btn" onClick={()=>{
                            navigate(`/only-image/${dt._id}`)
                        }}>View Image</button>
                      </div>
                    </div>
                  </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default ShowImages;
