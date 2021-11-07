import React, { useEffect , useState} from "react";
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useDispatch } from "react-redux";
import { logoutRestaurant } from "../actions/resActions";
import { useParams,useHistory } from 'react-router-dom'
import RestaurantSidebar from '../components/RestaurantSidebar';
import { Menu, LocationOn} from "@mui/icons-material";

const Cusprofile=()=>{
    const history = useHistory()
    const dispatch = useDispatch()
    const [headbg,setheadbg]=useState('transparent');
    const [shadow,setshadow]=useState('none');
    const { customerId } = useParams();
    const [customer,setCustomerData]=useState({});
    
  
  
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
        dispatch(logoutRestaurant());
        localStorage.setItem("restaurant",null);
        history.push("/")
      }

      useEffect( () => {

        axios.get(`/customer/api/profile/${customerId}`,{})
        .then(response => {
            console.log("res",response);
            if (response.data.error) {
                //M.toast({ html: response.data.error, classes: "#c62828 red darken-3" })
            }
            else {

                    setCustomerData(response.data)
                    console.log(response.data)
                
            }
        })     
    }, []
        );

    return(
        <div>
        <div className="header__upper">
           <div className="header__upperheader"  style={{backgroundColor:headbg,boxShadow:shadow}}   >
             <div className="header__upperheaderleft">
                <Menu/><RestaurantSidebar/>
                {/* <Link to='/rhome'>
                <img
                    src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/ee037401cb5d31b23cf780808ee4ec1f.svg "
                     alt="uber eats" /></Link> */}
            </div>
            {/* <div className="header__upperheadercenter"   >
               <LocationOn />
               <input type="text" placeholder="What are you craving? " />
            </div> */}
            <div className="header__upperheadercenter">
           
            <input
              type="text"
              placeholder="What are you craving? "
              
            />
          </div>
            <div className="header__upperheaderright" onClick={signout}>
                 <p> Sign out </p>
            </div>
            {/* <div className="header__upperheaderright">
                 <p> Add dishes </p>
            </div> */}
           </div>
        </div>
        <div style={{
   alignSelf: 'center',
   justifyContent: 'center',
   display:'flex',
   alignContent:'center',}}>
           
           {customer.profilepic && <img style={{
  
 
   
   borderWidth: 1,
   marginBottom: 50,
   paddingTop : 100,
   
   
 }} src={`/imageRestaurant/api/images/${customer.profilepic}`} className="showProfile_img"  />}
            </div>
            <div className="name" style={{
   alignSelf: 'center',
   justifyContent: 'center',
   display:'flex',
   alignContent:'center',}}>
        <h1 style={{fontFamily : "UberMove, sans-serif"}}>{customer.cname}</h1>
    </div>
    <div className="desc" style={{
//    alignSelf: 'center',
//    justifyContent: 'center',
//    display:'flex',
//    flexDirection:'column',
//    alignItems:'center',
//    alignContent:'center',
   fontSize: 16,
   marginLeft: '38%'}}>
        
        <p>Nickname: {customer.nickname} </p>
        <br></br>
        <p>About: {customer.about}</p>
        <br></br>
        <p>Date of birth: {customer.DOB?customer.DOB.substr(0,10):customer.DOB} </p>
        <br></br>
        <p>Contact information: </p>
        <p style={{paddingLeft:45}}>         Email: {customer.email} </p>
        <p style={{paddingLeft:45}}>         Contact number: {customer.mobileNo} </p>
        <br></br>
        <p>Location: {customer.city}, {customer.stateId}, {customer.countryId} </p>
    </div>
        </div>
    )
}
export default Cusprofile;