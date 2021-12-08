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
                    customerId : user.user.customerId
                }
                const res = await axios.post("/customer/api/key", cusId, )
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
                {key && <img src={`uploadroutes/api/images/${key}`} className="showProfile_img"/>}
            </div>
        </div>
    )
}

export default Showprofile;