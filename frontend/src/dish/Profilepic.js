import React, {useState}from 'react';
import axios from 'axios';
import './Profilepic.css';

async function postImages({image,dishId}){
    const formData = new FormData();
    formData.append("image", image)
    formData.append("dishId", dishId)
    const result = await axios.post('/imageDish/api/images', formData, 
    )
    console.log("result", result)
    localStorage.setItem('dishkey', result.data.key);
    return result.data;
}

const Profilepic = () => {
    
  const [file, setFile] = useState();
  const [images, setImages] = useState([])
  const submit = async (event) => {
      event.preventDefault()
      const result = postImages({image:file, dishId: JSON.parse(localStorage.getItem("dishId"))})
      setImages([result.image, ...images])
  }

  const fileSelected = (event) => {
    const fil = event.target.files[0]
    setFile(fil)
  }
    return (
        <div >
            <form onSubmit={submit} className="profile_chose">
                <input onChange={fileSelected} type="file" accept="image/*" className="profile_browse"></input>
                <button type="submit" className="profile_button">Submit</button>
            </form>
        </div>
    )
}


export default Profilepic;