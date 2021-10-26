import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './Showprofile.css'

const Showprofile = () => {
    const user = useSelector((state) => state.user);
    const [key, setKey] = useState();
    const [images, setImages] = useState();
    useEffect(() => {
        const getkey = async () => {
            try{
                const cusId = {
                    customerId : JSON.parse(localStorage.getItem("customer")).customerId
                }
                const res = await axios.post("/api/key", cusId)
                console.log("------",res)
                setKey(res.data.key)
                }catch(err){
                    console.log(err)
                }
            } 
            getkey()
        }, [])
    return (
        <div>
            <div className="showProfile">
                {key && <img src={`/api/images/${key}`} className="showProfile_img"/>}
            </div>
        </div>
    )
}

export default Showprofile;