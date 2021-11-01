import React, {useState}from 'react';
import axios from 'axios';
import './Profilepic.css';

async function postImages({image,customerId}){
    const formData = new FormData();
    console.log(formData);
    console.log(image);
    console.log(customerId);
    formData.append("image", image)
    formData.append("customerId", customerId)
    
    console.log(formData);
    const result = await axios.post('/uploadroutes/api/images', formData, 
    { 
        headers: {'Content-Type': 'multipart/form-data'}
    })
    console.log("result", result)
    localStorage.setItem('cuspkey', result.data.key);
    return result.data;
}

const Profilepic = () => {
    
  const [file, setFile] = useState();
 const [images, setImages] = useState([])
  const submit = async (event) => {
      event.preventDefault()
      const result = postImages({image:file, customerId: JSON.parse(localStorage.getItem("customer")).customerId})
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