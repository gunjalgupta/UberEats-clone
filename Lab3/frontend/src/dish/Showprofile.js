import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Showprofile.css'

const Showprofile = () => {
    const [key, setKey] = useState();
    const [images, setImages] = useState();
    useEffect(() => {
        const getkey = async () => {
            try{
                const resId = {
                     dishId: JSON.parse(localStorage.getItem("dishId"))
                     
                }
                const res = await axios.post("/imageDish/api/key", resId)
                console.log("------",res)
                setKey(res.data)
                }catch(err){
                    console.log(err)
                }
            } 
            getkey()
        }, [])
    return (
        <div>
            <div className="showProfile">
                {key && <img src={`/imageRestaurant/api/images/${key}`} className="showProfile_img"/>
                }
            </div>
        </div>
    )
}

export default Showprofile;