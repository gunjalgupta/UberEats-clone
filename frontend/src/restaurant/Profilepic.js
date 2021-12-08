import React, {useState}from 'react';
import axios from 'axios';
import './Profilepic.css';
import {  useSelector } from "react-redux";

async function postImages({image,restaurantId}){
    const formData = new FormData();
    formData.append("image", image)
    formData.append("restaurantId", restaurantId)
    const result = await axios.post('/imageRestaurant/api/images/', formData, 
    )
    console.log("result", result)
    localStorage.setItem('respkey', result.data.key);
    return result.data;
}

const Profilepic = () => {
   const restaurant= useSelector((state)=>state.restaurant) 
  const [file, setFile] = useState();
 const [images, setImages] = useState([])
  const submit = async (event) => {
      event.preventDefault()
      const result = postImages({image:file, restaurantId: restaurant.restaurant.restaurantId})
      setImages([result.image, ...images])
  }

  const fileSelected = (event) => {
    const fil = event.target.files[0]
    setFile(fil)
  }

  return (
    <div style={{
        display: "flex",
        justifyContent: "center",
    }}>
        <form onSubmit={submit} className="profile_chose">
            <input onChange={fileSelected} type="file" accept="image/*" className="profile_browse"></input>
            <button type="submit" className="profile_button">Submit</button>
        </form>
    </div>
)
  
}


export default Profilepic;