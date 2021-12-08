import React, {useState, useEffect} from 'react';
import {useSelector } from 'react-redux';
import axios from 'axios';
import './Showprofile.css'
const Showprofile = () => {
    const restaurant = useSelector((state) => state.restaurant);
    const [key, setKey] = useState();
    const [images, setImages] = useState();
    useEffect(() => {
        const getkey = async () => {
            try{
                const resId = {
                    restaurantId : restaurant.restaurant.restaurantId
                }
                console.log(resId);
                const res = await axios.post("/restaurant/api/key", {
                    restaurantId : restaurant.restaurant.restaurantId
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