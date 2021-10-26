import React, { useEffect , useState} from "react";
import { Menu, LocationOn } from "@mui/icons-material";
import axios from 'axios';
import Restaurant from '../components/Restaurants'
import { useDispatch } from "react-redux";
import { logout } from "../actions/userActions";
import { useHistory } from "react-router-dom";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Favourite= function (){

    const dispatch= useDispatch();
    const history= useHistory();
    const [headbg,setheadbg]=useState('transparent');
    const [shadow,setshadow]=useState('none');
    const [restaurants, setRestaurants] = useState([])
  
    
    window.addEventListener('scroll',()=>{
      if(window.scrollY>=50){
        setheadbg('#FFFFFF');
        setshadow('rgb(226 226 226) 0px -2px 0px inset');
      }
      else{
        setheadbg('transparent');
        setshadow('none');
     
      }
    })
   

  function signout(){
    dispatch(logout());
    localStorage.setItem("customer",null);
    history.push("/")
  }

    useEffect(()=>{
        const customerId =  JSON.parse(localStorage.getItem("customer")).customerId;

        axios.post(`/customer/api/showfav/${customerId}`,{})
        .then(response => {
            console.log("res",response);
            if (response.data.error) {
                console.log("res",response);
                toast.error('🦄 Wow so easy!', {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  });
            }
            else {
                    console.log(response.data)
                    setRestaurants(response.data)
                   
                
            }
        })
       
    }, [restaurants]);

    
    return(
        <div>
        <div className="header__upper">
                <div className="header__upperheader"  style={{backgroundColor:headbg,boxShadow:shadow}}   >
                  <div className="header__upperheaderleft">
                     <Menu />
                     <a  href = "/chome">
                     <img
                         src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/ee037401cb5d31b23cf780808ee4ec1f.svg "
                          alt="uber eats" />
                          </a>
                 
                 </div>

                
                 <div className="header__upperheadercenter"   >
                    <LocationOn />
                    <input type="text" placeholder="What are you craving? " 
                       />
                  
                 </div>
                 
                 <div className="header__upperheaderright" onClick={signout}>
                   
                      <p> Sign out </p>
                 </div>
                </div>
             </div>
             <div className="res" style={{marginTop: 100,paddingLeft: 40 }}><h3>Favourites</h3></div>

            <Box style={{padding:40}}>
            <Grid container item xs={10} spacing={5}>
                {
                restaurants.map(restaurant =>(
                
                <Grid container item xs={4} key={restaurant.restaurantId}>
      
      <Restaurant id ={restaurant.restaurantId} Name ={restaurant.rname} Opens_at={restaurant.fromTime} imageKey={restaurant.profilepic}/>
                 
    </Grid>
                ))
                }
                </Grid>
            </Box>
            <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
    </div>
    )
}

export default Favourite;