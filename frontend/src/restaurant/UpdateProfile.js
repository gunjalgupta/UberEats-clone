import React, { useState, useEffect} from 'react'


import { Link } from 'react-router-dom'
import axios from 'axios';
import M from 'materialize-css'
import { Formik } from 'formik';
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import { CountryDropdown, RegionDropdown } from "react-country-region-selector-material-ui-new";
import './UpdateProfile.css'
import Showprofile from './Showprofile';
import Profilepic from './Profilepic';
import { logoutRestaurant, loginRestaurant } from "../actions/resActions";
import { useDispatch,useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RestaurantSidebar from '../components/RestaurantSidebar';
import { Menu, LocationOn} from "@mui/icons-material";

const UpdateProfile = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const restaurant = useSelector((state) => state.restaurant);
    const [restaurantData, setRestaurantData] = useState([])
    const [image, setImage] = useState([])
    const [url, setUrl] = useState([])
    const [headbg,setheadbg]=useState('transparent');
    const [shadow,setshadow]=useState('none');
    const [inputdisplay,setinputdisplay]=useState(0);


  window.addEventListener('scroll',()=>{
    if(window.scrollY>=50){
      setheadbg('#FFFFFF');
      setshadow('rgb(226 226 226) 0px -2px 0px inset');
      setinputdisplay(1);

    }
    else{
      setheadbg('transparent');
      setshadow('none');
      setinputdisplay(0);


    }
  })

  function signout(){
    dispatch(logoutRestaurant());
    history.push("/")
  }

    //const { state, dispatch } = useContext(UserContext)
    useEffect(() => {
        const restaurantId =restaurant.restaurant.restaurantId;
        console.log(restaurantId);

        axios.get(`/restaurant/api/profile/${restaurantId}`, {
        },).then(response => {
            console.log("res",response);
            if (response.data.error) {
                console.log("res",response);
                M.toast({ html: response.data.error, classes: "#c62828 red darken-3" })
            }
            else {

                    setRestaurantData(response.data)
                    console.log(response.data)
                    console.log("resss ",restaurantData);
                    localStorage.setItem('restaurant', JSON.stringify(response.data));
                    dispatch(loginRestaurant(response.data))
                
            }
        })
    },[]
        );
        
  

    return (restaurantData.restaurantId?
        <div className="update">
            <section className="section" id="about">
                <div className="update" >
                    
                    <div className="header__upper">
                <div className="header__upperheader"  style={{backgroundColor:headbg,boxShadow:shadow}}   >
                  <div className="header__upperheaderleft">
                    <Menu/><RestaurantSidebar/>
                
                 </div>
                

                 <div className="header__upperheaderright" onClick={signout}>
                      <p> Sign out </p>
                 </div>
                </div>
             </div>
             <div className= "details_img">
                    <Showprofile />
                    <Profilepic />
                    </div>
                    <br />
                    <br />
                
                    <br />
                    <br />
                    <div className="row" style = {{ justifyContent : 'center'}}>
                    
                   
                    {
                        <Formik
                            style={{ width: '40%' }}
                            initialValues={{
                                rname: restaurantData.rname,
                                email: restaurantData.email,
                                mobileNo : restaurantData.mobileNo,
                                city: restaurantData.city,
                                stateId: restaurantData.stateId,
                                countryId: restaurantData.countryId,
                                fromTime: restaurantData.fromTime,
                                toTime: restaurantData.toTime,
                                rdesc: restaurantData.rdesc,
                                pickup :restaurantData.pickup,
                                delivery : restaurantData.delivery,
                                veg : restaurantData.veg,
                                nonVeg : restaurantData.nonVeg,
                                vegan : restaurantData.vegan
                            }}
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                console.log(values)
                                
                                const restaurantId = restaurant.restaurant.restaurantId
                                console.log(restaurantId)
                                axios.post(`restaurant/api/profile/updatedetails/`, { restaurantId ,values: values},)
                                    .then(response => {
                                        console.log("update",response)
                                        if (response.data.error) {
                                            M.toast({ html: response.data.error, classes: "#c62828 red darken-3" })
                                        }
                                        else {
                                            console.log("update1",response)
                                            toast.success('Updated details successful', {
                                                position: "top-right",
                                                autoClose: 5000,
                                                hideProgressBar: true,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                                progress: undefined,
                                                });
                                                dispatch(loginRestaurant(response.data))
                                                const timeout = setTimeout(() => {
                                                    history.push("/rhome");
                                                  }, 3000);
                                        }
                                    }).catch(err => {
                                        console.log(err)
                                    })
                               // history.push('/rhome')
                            }}>
                            {({
                                errors,
                                handleBlur,
                                handleChange,
                                handleSubmit,
                                isSubmitting,
                                touched,
                                values
                            }) => (
                                <form id="contactForm" style={{ width: '40%' }} name="sentMessage" onSubmit={handleSubmit}>
                                    <h4 className="font-weight-normal" style={{ fontFamily: 'UberMoveText-Medium,Helvetica,sans-serif' }}> Update Restaurant Information</h4>
                                    <br />
                                     
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label style={{ width: "100%",border:"none" }}>Restaurant Name<input required style={{ width: "100%", borderRadius: 0 }} className="form-control" id="rname" type="text" onBlur={handleBlur} onChange={handleChange} value={values.rname} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}> Email <input required type="text" style={{ width: "100%", borderRadius: 0 }} className="form-control" id="email" onBlur={handleBlur} onChange={handleChange} value={values.email} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Contact Number <input required type="number" style={{ width: "100%", borderRadius: 0 }} className="form-control" id="mobileNo" onBlur={handleBlur} onChange={handleChange} value={values.mobileNo} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>City <input type="text" style={{ width: "100%", borderRadius: 0 }} className="form-control" id="city" onBlur={handleBlur} onChange={handleChange} value={values.city} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Country<CountryDropdown style={{ width: "100%" }}value={values.countryId} className="form-control" id="countryId" onBlur={handleBlur} onChange= {handleChange("countryId")} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                            <label>State  <RegionDropdown style={{ width: "100%" }} country={values.countryId} value={values.stateId} className="form-control" id="stateId" onBlur={handleBlur} onChange={handleChange("stateId") }/></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Description <input type="text" style={{ width: "100%", borderRadius: 0 }} className="form-control" id="rdesc" onBlur={handleBlur} onChange={handleChange} value={values.rdesc} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}> Opens at <input type="time" style={{ width: "100%", borderRadius: 0 }} className="form-control" id="toTime" onBlur={handleBlur} onChange={handleChange} value={values.toTime} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Closes at <input type="time" style={{ width: "100%", borderRadius: 0 }} className="form-control" id="fromTime" onBlur={handleBlur} onChange={handleChange} value={values.fromTime} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                           
                                            <div className="form-group" >
                                            
                                                <label>Pickup <input type="dropdown" className="form-control" /></label>
                                                <select name= 'pickup' value={values.pickup} id="pickup" onBlur={handleBlur} onChange={handleChange}>
                                                <option value="Yes" label="Yes" defaultChecked/>
                                                <option value="No" label="No" />
                                                </select>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                            
                                                <label style={{ width: "100%" }}> Delivery <input type="dropdown" className="form-control"   /></label>
                                                <select  name ='delivery' value={values.delivery} id="delivery" onBlur={handleBlur} onChange={handleChange} >
                                                <option value="Yes" label="Yes" defaultChecked/>
                                                <option value="No" label="No" />
                                                </select>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Vegitarian options < input type="dropdown" className="form-control"  /></label>
                                                <select name ='veg' value={values.veg} id="veg" onBlur={handleBlur} onChange={handleChange} >
                                                <option value="Yes" label="Yes" defaultChecked/>
                                                <option value="No" label="No" />
                                                </select>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Non-Vegetarian options <input type="dropdown" className="form-control"  /></label>
                                                <select name ='nonVeg' value={values.nonVeg} id="nonVeg" onBlur={handleBlur} onChange={handleChange}>
                                                <option value="Yes" label="Yes" defaultChecked/>
                                                <option value="No" label="No" />
                                                </select>
                                                <p className="help-block text-danger"></p>
                                            </div>

                                            

                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Vegan options <input type="dropdown" className="form-control" /></label>
                                                <select name ='vegan' value={values.vegan} id="vegan" onBlur={handleBlur} onChange={handleChange} >
                                                <option value="Yes" label="Yes" defaultChecked/>
                                                <option value="No" label="No" />
                                                </select>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            
                                        </div>
                                    </div>
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
                                    <Button type="submit" className= "update-button" style={{ width: "100%", borderRadius: 5 }}>
                                        Save changes
                                    </Button>
                                    <br />
                                    <br />
                                </form>
                                
                            )}
                        </Formik>
} 
                    </div>
                </div>
            </section>
        </div>:<h1></h1> 
    )
}

export default UpdateProfile;