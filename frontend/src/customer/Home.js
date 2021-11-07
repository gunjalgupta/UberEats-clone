import React, { useEffect, useState } from "react";
//import React, { useState, useEffect, useContext } from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
import M from "materialize-css";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import Restaurant from "../components/Restaurants";
import ReactDOM from "react-dom";
import {
  
  Menu,
  LocationOn,
  Search
} from "@mui/icons-material";
import "./Home.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useDispatch ,useSelector} from "react-redux";
import { logout } from "../actions/userActions";
import { login } from '../actions/userActions';
import CustomerSidebar from "../components/CustomerSidebar"
import Slider from '@mui/material/Slider';
import { orderPlaced } from "../actions/cartActions";


const Home = () => {
  const history = useHistory();
  const dispatch= useDispatch();
  const [search, setsearch] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [customerData, setcustomerData]= useState();
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [value, setValue] = useState("");
  const [headbg, setheadbg] = useState("transparent");
  const [shadow, setshadow] = useState("none");
  const user = useSelector((state) => state.user);
  const cartt = useSelector((state)=>state.cart)
  

 
  

  window.addEventListener("scroll", () => {
    if (window.scrollY >= 50) {
      setheadbg("#FFFFFF");
      setshadow("rgb(226 226 226) 0px -2px 0px inset");
 
    } else {
      setheadbg("transparent");
      setshadow("none");

    }
  });

  useEffect(() => setFilteredRestaurants(restaurants), [restaurants])

  // const Item = styled(Paper)(({ theme }) => ({
  //   ...theme.typography.body2,
  //   padding: theme.spacing(2),
  //   textAlign: 'center',
  //   color: theme.palette.text.secondary,
  // }));

  useEffect(() => {
    const customerId = user.user.customerId;

    axios.get(`/customer/api/profile/${customerId}`, {}).then((response) => {
      //console.log("res", response);
      if (response.data.error) {
        console.log("res", response);
        M.toast({ html: response.data.error, classes: "#c62828 red darken-3" });
      } else {
        setcustomerData(response.data);
        console.log(response.data);
        dispatch(login( response.data))

        
      }
    });

  
  }, []);

  function signout(){
    dispatch(logout());
    history.push("/")
  }

  const useModal = () => {
    const [isShowing, setIsShowing] = useState(false);

    function toggle() {
      setIsShowing(!isShowing);
    }

    return {
      isShowing,
      toggle,
    };
  };

  const Modal = ({ isShowing, hide }) =>
    isShowing
      ? ReactDOM.createPortal(
          <React.Fragment>
            <div className="modal-overlay" />
            <div
              className="modal-wrapper"
              aria-modal
              aria-hidden
              tabIndex={-1}
              role="dialog"
            >
              <div className="modal">
              <div style={{ display: "flex", alignItems: "center",fontSize:30}}> {cartt.cart?cartt.cart[0].rname: <p/>}</div>
               
                <div className="modal-header" style={{justifyContent: 'flex-end'}}>
                  <button
                    type="button"
                    className="modal-close-button"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={hide}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <Typography component="div" variant="h5"></Typography>
              
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                  style={{paddingBottom: '25px'}}
                >
                  <br />
                  {cartt.cart? 
                  <div >Cart Items
                  <div style={{display :"flex", flexDirection:"row"}}> 
                  <div>Dish name  </div> <div style={{paddingLeft:"85px"}}>   Quantity </div><div style={{paddingLeft:"110px"}}>  Subtotal</div></div></div>
                  :<p></p>}
                
                </Typography>
                <Grid container spacing={3}>
                  
                  {cartt.cart?cartt.cart&&
                    cartt.cart.map((dish) => (
                      <Grid container item>
                        <Grid container xs={4}>
                          {dish.dname}
                        </Grid>
                        <Grid container xs={4}>
                          {dish.quantity}
                        </Grid>
                        <Grid container xs={4}>
                          ${dish.subtotal}
                        </Grid>
                      </Grid>
                    )):<Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                    style={{paddingBottom: '25px'}}
                  > Cart is empty </Typography>}
                  
                </Grid>
                <Box
                  sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                >
                  

                  {cartt.cart? <Link to ='/checkout'style={{paddingTop: '40px'}}>
                  
                  <Button
                    onClick={() => {
                      toggle();
                    }}
                    style={{color:'white', backgroundColor:'black', display:'flex',}}
                  >
                    GO TO CHECKOUT . ${localStorage.getItem("order") && JSON.parse(localStorage.getItem("order")).total}
                  </Button></Link> : <Button disabled
                    onClick={() => {
                      toggle();
                    }}
                    style={{color:'white', backgroundColor:'black', display:'flex',}}
                  > ADD ITEMS
                  </Button>}
                </Box>
              </div>
            </div>
          </React.Fragment>,
          document.body
        )
      : null;
  const { isShowing, toggle } = useModal();

  useEffect(() => {
    getRestaurants();
    //dispatch(orderPlaced());
  }, []);

  const getRestaurants = async () => {
    const customerId= user.user.customerId;
    console.log(customerId);
    await axios
      .post(
        `/customer/api/getRestarants/${customerId}`,
        {}
      )
      //     .then((response) =>
      //   {
      //     return JSON.parse(response)
      //   })
      .then((responseData) => {
        console.log("res", responseData);
        if (responseData.data.error) {
          console.log("res", responseData);
          M.toast({
            html: responseData.data.error,
            classes: "#c62828 red darken-3",
          });
        } else {
          //setcustomerData(responseData.data)
          setRestaurants(responseData.data);
          console.log(responseData.data);
        }
      });
  };

  function searchRestaurant(name) {
    setsearch(true);
    const Name = { name: name };
    console.log(Name);
    axios
      .post("/customer/api/searchRestaurant", Name)

      .then((responseData) => {
        console.log("res", responseData);
        if (responseData.data.error) {
          console.log("res", responseData);
          M.toast({
            html: responseData.data.error,
            classes: "#c62828 red darken-3",
          });
        } else {
          setRestaurants(responseData.data);
          //setRestaurants(responseData.data)
          console.log(responseData.data);
         
        }
      });
  }
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    //e.preventDefault();
    searchRestaurant(value);
    // or you can send data to backend
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.key === "Enter") {
      console.log("enter");
      handleSubmit();
    }
  };

  const [filters, updateFilters] = useState({
    delivery: true,
    pickup: false,
    vegan: true,
    veg: true,
    nonVeg: true
  })

  const deliveryOrPickup = (delivery, pickup, rname) => {
    if (delivery === "Yes" && filters.delivery) {
      return true
    }
    else if (pickup === "Yes" && filters.pickup) {
      return true
    }
    else {
      return false
    }
  }

  useEffect(() => {
    setFilteredRestaurants(
      restaurants
      .filter((restaurent) => (deliveryOrPickup(restaurent.delivery, restaurent.pickup, restaurent.rname)))
      .filter((restaurent) => (( filters.veg && restaurent.veg === "Yes" ) || ( filters.nonVeg && restaurent.nonVeg === "Yes" ) || ( filters.vegan && restaurent.vegan === "Yes" )))
    )
  }, [filters])

  console.log("filtered", filteredRestaurants)
  console.log("all", restaurants)


  return (
    <div className="cushome">
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

          <div className="header__upperheaderright">

            <p> <LocationOn /> {user.user.city!==''?user.user.city: "Enter your location"}</p>
          </div>
          <div className="header__upperheadercenter">
            <Search/>
            <input
              type="text"
              placeholder="What are you craving? "
              value={value}
              onChange={handleChange}
              onKeyPress={handleKeypress}
            />
          </div>
          <div className="header__upperheaderright" onClick={toggle}>
            <p>
              {" "}
              <ShoppingCartOutlinedIcon style={{ color: "black" }} />
              <span className="empty-message">
                {" "}
                {cartt.cart
                  ? cartt.cart.length
                  : "Your cart is empty"}
              </span>{" "}
            </p>
            <Modal
              isShowing={isShowing}
              hide={toggle}
              style={{ position: "absolute", width: "240px", height: "340px" }}
            />
          </div>
          <div className="header__upperheaderright" onClick={signout}>
            <p> Sign out </p>
          </div>
        </div>
      </div>
      <div style={{paddingTop: 110,paddingLeft:40, display:"flex", justifyContent:"space-between"}}>
        
        <div>
        <img src='https://d4p17acsd5wyj.cloudfront.net/shortcuts/deals.png'
        style={{height: '75px'}}></img>
        <p style={{paddingLeft:10}}>Deals</p>
        </div>
        <div>
        <img src='https://d4p17acsd5wyj.cloudfront.net/shortcuts/convenience.png'
        style={{height: '75px'}}></img>
        <p>Convienience</p>
        </div>
        <div>
        <img src='https://d4p17acsd5wyj.cloudfront.net/shortcuts/alcohol.png'
        style={{height: '75px'}}></img>
        <p style={{paddingLeft:20}}>Alcohol</p>
        </div>
        <div>
        <img src='https://d4p17acsd5wyj.cloudfront.net/shortcuts/pharmacy.jpg'
        style={{height: '75px'}}></img>
        <p>Pharmacy</p>
        </div>
        <div>
        <img src='https://d4p17acsd5wyj.cloudfront.net/shortcuts/baby.png'
        style={{height: '75px'}}></img>
        < p style={{paddingLeft:20}}>      Baby</p>
        </div>
        <div>
        <img src='https://d4p17acsd5wyj.cloudfront.net/shortcuts/specialty_foods.jpg'
        style={{height: '75px'}}></img>
        <p>Speciality foods</p>
        </div>
        <div>
        <img src='https://d4p17acsd5wyj.cloudfront.net/shortcuts/flowers.jpg'
        style={{height: '75px'}}></img>
        <p style={{paddingLeft:20}}>Flowers</p>
        </div>
        <div>
        <img src='https://d4p17acsd5wyj.cloudfront.net/shortcuts/retail.jpg'
        style={{height: '75px'}}></img>
        <p style={{paddingLeft:20}}> Retail</p>
        </div>
        <div>
        <img src='https://d4p17acsd5wyj.cloudfront.net/shortcuts/top_eats.png'
        style={{height: '75px'}}></img>
        <p style={{paddingLeft:10}}>Top Eats</p>
        </div>
        <div>
        <img src='https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/coffeeandtea.png'
        style={{height: '75px'}}></img>
        <p style={{paddingLeft:20}}>Coffee</p>
        </div>
        <div>
        <img src='https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/bakery.png'
        style={{height: '75px'}}></img>
        <p style={{paddingLeft:15}}>Bakery</p>
        </div>
        <div>
        <img src='https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/asian.png'
        style={{height: '75px'}}></img>
        <p style={{paddingLeft:20}}>Asian</p>
        </div>
      
      </div>

       <hr style={{marginTop:30, marginLeft:35, marginRight:35, color:"gray"}} />
      <Grid
        container
        style={{
          paddingTop: "40px",
          paddingLeft:'30px'
        }}
      >
{/* 
<img href='https://d4p17acsd5wyj.cloudfront.net/shortcuts/top_eats.png'></img> */}

        <Grid container item xs={2} style={{
          height: "fit-content",
          
        }}>
          <h2 style={{paddingBottom:'20px', paddingLeft:'10px'}}>All Stores</h2>
          <Grid container item>
            <FormControl component="fieldset">
              <FormLabel component="legend">Choose delivery option</FormLabel>
              <RadioGroup defaultValue="delivery" name="radio-buttons-group" >
                <FormControlLabel
                  value="delivery"
                  control={<Radio style ={{
                    color: "black",
                  }}/>}
                  label="Delivery"
                  onChange={
                    (event) => updateFilters(
                      {...filters,
                        delivery: event.target.checked,
                        pickup: !event.target.checked,
                      }
                    )
                  }
                />
                <FormControlLabel
                  value="pickup"
                  control={<Radio style ={{
                    color: "black",
                  }}/>}
                  label="Pickup"
                  onChange={
                    (event) => updateFilters(
                      {...filters,
                        pickup: event.target.checked,
                        delivery: !event.target.checked,
                      }
                    )
                  }
                />
              </RadioGroup>
            </FormControl>

          </Grid>
          <Grid >
           <p style={{paddingTop: '50px'}}>Max delivery fee</p> 
          <Box sx={{ width: 180 }}>
      <Slider
        aria-label="Delivery"
        defaultValue={6}
        step={2}
        marks
        min={1}
        max={10}
        valueLabelDisplay='auto'
        style={{color:'black'}}
      />
     
    </Box>
          </Grid>
          <Grid container item style={{paddingTop: '50px'}}>

            <FormGroup >
              <FormLabel component="legend">Diet preference</FormLabel>
              <FormControlLabel
                control={<Checkbox defaultChecked style ={{
                  color: "black",
                }}/>}
                label="Vegan"
                onChange={
                  (event) => updateFilters(
                    {...filters,
                      vegan: event.target.checked
                    }
                  )
                }
              />
              <FormControlLabel
                control={<Checkbox defaultChecked  style ={{
                  color: "black",
                }}
                />}
                label="Veg"
                onChange={
                  (event) => updateFilters(
                    {...filters,
                      veg: event.target.checked
                    }
                  )
                }
              />
              <FormControlLabel
                control={<Checkbox defaultChecked style ={{
                  color: "black",
                }}/>}
                label="Non-Veg"
                onChange={
                  (event) => updateFilters(
                    {...filters,
                      nonVeg: event.target.checked
                    }
                  )
                }
              />
            </FormGroup>
          </Grid>
        </Grid>
        
        {search ? (
          <Grid container item xs={10} spacing={5} style={{paddingRight:'40px'}}>
            {
              filteredRestaurants.map((restaurant) => (
                <Grid container item xs={4}>
                  <Restaurant
                    id={restaurant.restaurantId}
                    Name={restaurant.rname}
                    Opens_at={restaurant.fromTime}
                    imageKey={restaurant.profilepic}
                    desc= {restaurant.rdesc}
                  />
                </Grid>
              ))
            }
          </Grid>
        ) : (
          <Grid container item xs={10} spacing={5} style={{paddingRight:'40px'}}>
            {filteredRestaurants.map((restaurant) => (
              <Grid container item xs={4}>
                <Restaurant
                  id={restaurant.restaurantId}
                  Name={restaurant.rname}
                  Opens_at={restaurant.fromTime}
                  imageKey={restaurant.profilepic}
                  desc= {restaurant.rdesc}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Home;



