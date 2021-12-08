import React, { useEffect, useState } from "react";
import Restaurantpic from "../components/Restaurantpic";
import { useParams, useHistory } from "react-router-dom";

import axios from "axios";
import Dish from "../components/Dishes";
import { LocationOn } from "@mui/icons-material";
import "./Resprofile.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useDispatch} from "react-redux";
import { logout } from "../actions/userActions";
import CustomerSidebar from "../components/CustomerSidebar";
import { Menu } from "@mui/icons-material";
import Cart from "../components/Cart"
import {useSelector } from "react-redux";

var _ = require("lodash");

function Resprofile() {

  const user= useSelector((state)=>state.user)
  const history = useHistory();
  const dispatch = useDispatch();
  const [restaurant, setRestaurant] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [headbg, setheadbg] = useState("transparent");
  const [shadow, setshadow] = useState("none");
  const { restaurantId } = useParams();

  window.addEventListener("scroll", () => {
    if (window.scrollY >= 50) {
      setheadbg("#FFFFFF");
      setshadow("rgb(226 226 226) 0px -2px 0px inset");
    } else {
      setheadbg("transparent");
      setshadow("none");
    }
  });
  
  useEffect(() => {
    console.log(restaurantId);
    getRestaurant();
    getDishes();
  }, []);

  const getRestaurant = async () => {
    await axios
      .get(`/restaurant/api/profile/${restaurantId}`)
      .then((responseData) => {
        console.log("res", responseData);
        if (responseData.data.error) {
          console.log("res", responseData);
          // M.toast({ html: responseData.data.error, classes: "#c62828 red darken-3" })
        } else {
          //setcustomerData(responseData.data)
          setRestaurant(responseData.data);
          console.log("restaurant", responseData.data);
        }
      });
  };

  const getDishes = async () => {
    await axios
      .post(`/restaurant/api/getdish/${restaurantId}`,)
      .then((responseData) => {
        console.log("res", responseData);
        if (responseData.data.error) {
          console.log("res", responseData);
          // M.toast({ html: responseData.data.error, classes: "#c62828 red darken-3" })
        } else {
          //setcustomerData(responseData.data)
          setDishes(responseData.data);
          console.log(" dishes", responseData.data);
        }
      });
  };

  function signout() {
    dispatch(logout());
    history.push("/");
  }

  return restaurant ? (
    <div style={{ padding: 20 }}>
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

            <CustomerSidebar />
          </div>
          <div className="header__upperheadercenter">
            <LocationOn />
            <input type="text" placeholder="What are you craving? " />
          </div>
          <Cart/>

          <div className="header__upperheaderright" onClick={signout}>
            <p> Sign out </p>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />

      <div>
        <Restaurantpic
          imgKey={restaurant.profilepic}
          name={restaurant.rname}
          desc={restaurant.rdesc}
          from={restaurant.fromTime}
          to={restaurant.toTime}
        />
      </div>

      <div className="dish_home">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={5}>
            {dishes.map((dish) => (
              <Grid item xs={6} key={dish.dishId}>
                <Dish
                  id={dish.dishId}
                  dname={dish.dname}
                  des={dish.ddesc}
                  ing={dish.ingredients}
                  price={dish.Price}
                  imageKey={dish.profilepic}
                  restaurantId={restaurantId}
                  rname={restaurant.rname}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </div>
  ) : (
    <h1></h1>
  );
}

export default Resprofile;
