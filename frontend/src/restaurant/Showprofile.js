import React, {useState, useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import axios from 'axios';
import './Showprofile.css'

const Showprofile = () => {
    const user = useSelector((state) => state.user);
    const [key, setKey] = useState();
    const [images, setImages] = useState();
    useEffect(() => {
        const getkey = async () => {
            try{
                const resId = {
                    restaurantId : JSON.parse(localStorage.getItem("restaurant")).restaurantId
                }
                console.log(resId);
                const res = await axios.post("/restaurant/api/key", {
                    restaurantId : JSON.parse(localStorage.getItem("restaurant")).restaurantId
                })
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
                {key && <img src={`/imageRestaurant/api/images/${key}`} className="showProfile_img"/>}
            </div>
        </div>
    )
}

export default Showprofile;