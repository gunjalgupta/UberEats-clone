import React, {useState}from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

async function postImages({image,customerId}){
    const formData = new FormData();
    formData.append("image", image)
    formData.append("customerId", customerId)
    const result = await axios.post('http://localhost:8080/images', formData, 
    { 
        headers: {'Content-Type': 'multipart/form-data'}
    })
    console.log("result", result)
    return result.data;
}

const Profilepic = () => {
    
  const [file, setFile] = useState();
 const [images, setImages] = useState([])
  const user = useSelector((state) => state.user);
  const submit = async (event) => {
      event.preventDefault()
      const result = postImages({image:file, customerId: user.user.customerId })
      setImages([result.image, ...images])
  }

  const fileSelected = (event) => {
    const fil = event.target.files[0]
    setFile(fil)
  }
    return (
        <div>
            <form onSubmit={submit}>
                <input onChange={fileSelected} type="file" accept="image/*"></input>
                <button type="submit">Submit</button>
            </form>

            { images.map( image => (
                <div key={image}>
                <img src={image}></img>
            </div>
      ))}
        </div>
    )
}


export default Profilepic;