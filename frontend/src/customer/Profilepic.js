import React, {useState}from 'react';
import axios from 'axios';
import './Profilepic.css';
import { useSelector } from "react-redux";

async function postImages({image,customerId}){
    const formData = new FormData();
    console.log(formData);
    console.log(image);
    console.log(customerId);
    formData.append("image", image)
    formData.append("customerId", customerId)
    
    console.log(formData);
    const result = await axios.post('/uploadroutes/api/images', formData, 
    )
    console.log("result", result)
    localStorage.setItem('cuspkey', result.data.key);
    return result.data;
}

const Profilepic = () => {
    
  const [file, setFile] = useState();
 const [images, setImages] = useState([])
 const user= useSelector((state)=>state.user)
  const submit = async (event) => {
      event.preventDefault()
      const result = postImages({image:file, customerId: user.user.customerId})
      //console.log("res",result)
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