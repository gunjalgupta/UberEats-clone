import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import M from "materialize-css";
import { useHistory } from "react-router-dom";
import Restaurant from "../components/Restaurants";
import Cart from "../components/Cart"
import {
  
  Menu,
  LocationOn,
  Search
} from "@mui/icons-material";
import "./Home.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useDispatch ,useSelector} from "react-redux";
import { logout ,removeToken} from "../actions/userActions";
import { login } from '../actions/userActions';
import {orderPlaced} from '../actions/cartActions'
import CustomerSidebar from "../components/CustomerSidebar"
import Slider from '@mui/material/Slider';

const Home = () => {
  const history = useHistory();
  const dispatch= useDispatch();
  const [search, setsearch] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [value, setValue] = useState("");
  const [headbg, setheadbg] = useState("transparent");
  const [shadow, setshadow] = useState("none");
  const user = useSelector((state) => state.user);
  
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

  useEffect(() => {
    const customerId = user.user.customerId;

    axios.get(`/customer/api/profile/${customerId}`).then((response) => {
      //console.log("res", response);
      if (response.data.error) {
        console.log("res", response);
        M.toast({ html: response.data.error, classes: "#c62828 red darken-3" });
      } else {
        console.log(response.data);
        dispatch(login( response.data))

        
      }
    });

  
  }, []);

  function signout(){
    dispatch(logout());
    dispatch(removeToken());
    dispatch(orderPlaced());
    history.push("/")
  }


  useEffect(() => {
    getRestaurants();
  }, []);

  const getRestaurants = async () => {
    const customerId= user.user.customerId;
    console.log(customerId);
    await axios
      .post(
        `/customer/api/getRestarants/${customerId}`,
        
      )
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
          console.log(responseData.data);
        }
      });
  };

  function searchRestaurant(name) {

    const customerId= user.user.customerId;
    setsearch(true);
    const Name = { name: name };
    console.log(Name);
    axios
      .post(`/customer/api/searchRestaurant/${customerId}`, Name,)

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
          <Cart/>
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



