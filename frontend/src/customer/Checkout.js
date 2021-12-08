import React, { useState, useEffect} from "react";

import { Link } from "react-router-dom";
import { Grid, TextField } from "@material-ui/core";
import axios from "axios";
import M from "materialize-css";
import { useHistory } from "react-router-dom";
import "./UpdateProfile.css";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useDispatch , useSelector} from "react-redux";
import { logout } from "../actions/userActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomerSidebar from "../components/CustomerSidebar"
import {
  
  Menu,
} from "@mui/icons-material";
import { orderPlaced} from "../actions/cartActions";

const Checkout = () => {
  const history= useHistory();
  const dispatch= useDispatch();
  const user=useSelector((state)=>state.user);
  const cartt= useSelector((state)=>state.cart);
  const [headbg, setheadbg] = useState("transparent");
  const [shadow, setshadow] = useState("none");
  const [currentAddress, setCurrentAddress] = useState("")
  const [mode, setMode] = useState("pickup")
  const [savedAddress, setSavedAddress]= useState([]);
  const [message, setMessage]= useState("");
  const [value, setValue] = useState("pickup");
  const [address, setAddress] = useState({
    customerId: user.user.customerId,
    addline1: "",
    addline2: "",
    city: "",
    state: "",
    zipcode: "",
  });
  var _ = require('lodash');


  window.addEventListener("scroll", () => {
    if (window.scrollY >= 50) {
      setheadbg("#FFFFFF");
      setshadow("rgb(226 226 226) 0px -2px 0px inset");
    } else {
      setheadbg("transparent");
      setshadow("none");
    }
  });

  const submitOrder = () => {
    console.log("here",mode,currentAddress)
    if(mode==='delivery' && (currentAddress===null || currentAddress==="")){
    console.log("here",mode,currentAddress)
    
    toast.error("Address required", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
      
  } 
    
    else{
    const cart= cartt.cart
    const restId = Number(cart[0].restaurantId);
    console.log(restId)
    console.log(cart[0].restaurantId)
    console.log(cart[0])
    axios
      .post("/orders/api/addorder", {
        customerId: cart[0].customerId,
        restaurantId: Number(cart[0].restaurantId),
        invoiceId: cart[0].invoiceId,
        total: _.sumBy(cartt.cart, (dish) => dish.subtotal),
        mode: mode,
        rname:cart[0].rname,
        message:message,
        address:currentAddress
      })
      .then((response) => {
        console.log("res", response);
        if (response.data.error) {
          console.log("res", response);
          M.toast({
            html: response.data.error,
            classes: "#c62828 red darken-3",
          });
        } else {
          //setcustomerData(response.data[0])
          console.log("order",response.data);
         
        }
        const dishesToPass = [];
        cart.map((dish) => {
          //console.log(order.invoiceId);
          dishesToPass.push({
            invoiceId: dish.invoiceId,
            dishId: dish.dishId,
            quantity: dish.quantity,
            price: dish.Price,
            subtotal: dish.subtotal,
            dname: dish.dname
          });
        });
        console.log("-----------",dishesToPass);
        axios.post("/orders/api/adddetails", dishesToPass).then((res)=>{
          console.log("orderdetail",res)
        }).catch((err)=>{
          console.log(err);
        })
      }).then(()=>{
        
       
        toast.success("Order placed successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        //localStorage.removeItem("cart",null);
        dispatch(orderPlaced());
        //localStorage.removeItem("rescartid",null);
        //localStorage.removeItem("order",null);
       
        const timeout = setTimeout(() => {
          history.push("/chome");
        }, 3000);
      })
  }};

  const addAddress = () => {
    console.log(address);

    axios.post("/customer/api/addaddress/",address)
    .then(response => {
        
        if (response.data.error) {
            //console.log("res",response);
            M.toast({ html: response.data.error, classes: "#c62828 red darken-3" })
        }
        else {
                //setSavedAddress(response.data)
                console.log(response.data)
        }
    })

    setAddress({
      addline1: "",
      addline2: "",
      city: "",
      state: "",
      zipcode: "",
    });
    setCurrentAddress(`${address.addline1}, ${address.addline2}, ${address.city}, ${address.state} - ${address.zipcode}`)
  };

  useEffect(() => {
    const customerId =  user.user.customerId;
    axios.post(`/customer/api/fetchaddress/${customerId}`)
    .then(response => {
        
        if (response.data.error) {
            console.log("res",response);
            M.toast({ html: response.data.error, classes: "#c62828 red darken-3" })
        }
        else {
                setSavedAddress(response.data)
                console.log(response.data)
        }
    })
    
  },[]);

  function signout(){
    dispatch(logout());
    //localStorage.setItem("customer",null);
    history.push("/")
  }

  return (
    <div className="section" id="about">
      <div className="update">
        <div className="header__upper">
          <div
            className="header__upperheader"
            style={{ backgroundColor: headbg, boxShadow: shadow }}
          >
            <div className="header__upperheaderleft">
              
              <Menu
              style={{
                marginRight: "30px",
              }}
            />

            <CustomerSidebar/>
            </div>

            <div className="header__upperheaderright" onClick={signout}>
              <p> Sign out </p>
            </div>
          </div>
        </div>
      </div>
      <Grid
        style={{
          paddingTop: "100px",
          height: "100vh",
        }}
        container
        direction={"row"}
      >
        <Grid
          container
          // spacing={3}
          xs={6}
          style={{
            // border: "1px solid grey",
            height: "100%",
            margin: 10
           
          }}
        >
          <Grid container xs={12} style={{display:'flex', justifyContent:'center',  paddingTop: "0px",fontSize:32}}>
          {
          cartt.cart[0]?cartt.cart[0].rname:"Panda Express"
          }
                </Grid>
          <table
            style={{
            width: "100%",
          }}
          >
          <tr>
            <th>Dish Name</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr> 
          {cartt.cart&&
            cartt.cart.map((dish) => (
              <tr>
                <td>{dish.dname}</td>
                <td>{dish.quantity}</td>
                <td>{dish.subtotal}</td>
              </tr>
            ))}
            </table>
          <Grid container item>
            <Grid container xs={4}></Grid>
            <Grid container xs={4}>
              Total Price
            </Grid>
            <Grid container xs={4}>
              {cartt.cart[0]?_.sumBy(cartt.cart, (dish) => dish.subtotal):"total"
              }
            </Grid>
          </Grid>
          <Grid container item>
          <Grid container xs={4}><p>Add special instructions: (optional)</p></Grid>
            <Grid><form>
                    <input type="text" placeholder="Instructions" onChange={(e) => setMessage(e.target.value)} value={message}></input>
                    
                </form></Grid>
            
          </Grid>
        
            Mode of delivery:
            <FormControl component="fieldset">
              <FormLabel component="legend">Choose an option</FormLabel>
              <RadioGroup
                aria-label="gender"
                value= {value}
                name="radio-buttons-group"
                onChange={(e) => {setMode(e.target.value)
                setValue(e.target.value)}}
              >    
                <FormControlLabel value="pickup" defaultChecked="true" control={<Radio />} label="Pick-up" />
                <FormControlLabel value="delivery" control={<Radio />} label="Delivery" />
              </RadioGroup>
            </FormControl>
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
          </Grid>
        <Grid
          container
          spacing={3}
          xs={6}
          style={{
            border: "1px solid grey",
            height: "100%",
          }}
        >
          <Grid
            container
            item
            direction="column"
            style={{
              padding: "20px",
            }}
          >
            Address:
            <TextField
              label="Address Line 1"
              value={address.addline1}
              onChange={(e) =>
                setAddress({ ...address, addline1: e.target.value })
              }
            />
            <TextField
              label="Address Line 2"
              value={address.addline2}
              onChange={(e) =>
                setAddress({ ...address, addline2: e.target.value })
              }
            />
            <TextField
              label="City"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
            />
            <TextField
              label="State"
              value={address.state}
              onChange={(e) =>
                setAddress({ ...address, state: e.target.value })
              }
            />
            <TextField
              label="Zip Code"
              value={address.zipcode}
              onChange={(e) => setAddress({ ...address, zipcode: e.target.value })}
            />
            <br />
            <button
              onClick={addAddress}
              style={{
                width: "fill-content",
              }}
            >
              Add address
            </button>
          </Grid>

          <Grid
            container
            item
            direction="column"
            style={{
              padding: "40px 20px",
            }}
          >
            Saved Address:
            <FormControl component="fieldset">
              <FormLabel component="legend">Choose from existing address</FormLabel>
              <RadioGroup
                aria-label="gender"
                defaultValue="female"
                name="radio-buttons-group"
                onChange={(e) => setCurrentAddress(e.target.value)}
              >
                  {savedAddress.map((address) => 
                  <FormControlLabel
                  value={`${address.addline1}, ${address.addline2}, ${address.city}, ${address.state} - ${address.zipcode}`}
                  control={<Radio />}
                  label={`${address.addline1}, ${address.addline2}, ${address.city}, ${address.state} - ${address.zipcode}`}
                />)}
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid
            container
            item
            direction="column"
            style={{
              padding: "40px 20px",
            }}
          >
              Selected Address : {currentAddress}
          </Grid>

          <Grid
            container
            item
            style={{
              height: "fit-content",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button style={{color:'white', backgroundColor:'black',paddingLeft:50,paddingRight:50, fontSize:20}}onClick={submitOrder}>Place Order</button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
export default Checkout;
