import React, { useEffect, useState } from "react";
import Restaurantpic from "../components/Restaurantpic";
import {
  useParams,
  useHistory,
} from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ReactDOM from "react-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Dish from "../components/Dishes";
import {
  LocationOn
} from "@mui/icons-material";
import "./Resprofile.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import bcrypt from 'bcryptjs';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { addCart,removeCart } from "../actions/cartActions";
import { addOrder,placeOrder } from "../actions/orderActions";
import CustomerSidebar from "../components/CustomerSidebar"
import {
  
  Menu,
} from "@mui/icons-material";

var _ = require('lodash');

function Resprofile() {

  const history = useHistory();
  const dispatch= useDispatch();
  const user = useSelector((state) => state.user);
  const cartt= useSelector((state) => state.cart);
  const orderr= useSelector((state)=>state.order);
  const [restaurant, setRestaurant] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [cart, setCart] = useState([cartt.cart]);
  const [headbg, setheadbg] = useState("transparent");
  const [shadow, setshadow] = useState("none");
  const customerId =  user.user.customerId;
  const { restaurantId } = useParams();
  const custId = String(user.user.customerId)
  const invoiceId = bcrypt.hashSync(custId,10);

  window.addEventListener("scroll", () => {
    if (window.scrollY >= 50) {
      setheadbg("#FFFFFF");
      setshadow("rgb(226 226 226) 0px -2px 0px inset");
   
    } else {
      setheadbg("transparent");
      setshadow("none");
    
    }
  });


  const cartorder={
    customerId,
    restaurantId: Number(restaurantId),
    total : _.sumBy(cartt.cart, (dish) => dish.subtotal),
    invoiceId,
    dishes: cartt.cart ? cartt.cart: []
  }

  //localStorage.setItem('order',JSON.stringify(cartorder))
  //dispatch(addOrder(JSON.stringify(cartorder)));
  useEffect(()=>{

    dispatch(addOrder(cartorder));
  },[])

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
                <div style={{ display: "flex", alignItems: "center",fontSize:30}}>  {cartt.cart? cartt.cart[0].rname:<p></p>}</div>
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
                  {cartt.cart?
                    cartt.cart && cartt.cart.map((dish) => (
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
                 <br></br>
                </Grid>
                <Box
                  sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                >
                  <br></br>
                  {cartt.cart? <Link to ='/checkout'style={{paddingTop: '40px'}}>
                  
                  <Button
                    onClick={() => {
                      toggle();
                    }}
                    style={{color:'white', backgroundColor:'black', display:'flex',}}
                  >
                    GO TO CHECKOUT . ${cartorder.total}
                  </Button></Link> : <Button disabled
                    onClick={() => {
                      toggle();
                    }}
                    style={{color:'white', backgroundColor:'black', display:'flex',}}
                  >
                    ADD ITEMS 
                  </Button>}
                  
                </Box>
              </div>
            </div>
          </React.Fragment>,
          document.body
        )
      : null;
  const { isShowing, toggle } = useModal();

  // const Item = styled(Paper)(({ theme }) => ({
  //   ...theme.typography.body2,
  //   padding: theme.spacing(2),
  //   textAlign: "center",
  //   color: theme.palette.text.secondary,
  // }));



  useEffect(() => {
    console.log(restaurantId);
    getRestaurant();
    getDishes();
  }, []);

  const getRestaurant = async () => {
    await axios
      .get(`/restaurant/api/profile/${restaurantId}`, {})
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
      .post(`/restaurant/api/getdish/${restaurantId}`, {})
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

    
  function signout(){
    dispatch(logout());
    localStorage.setItem("customer",null);
    history.push("/")
  }

  return restaurant ? (
    <div style={{padding:20}}>
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
          <div className="header__upperheadercenter"   >
               <LocationOn />
               <input type="text" placeholder="What are you craving? " />
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
      <br />
      <br />
      <br />
      <br />

      <div>
        <Restaurantpic imgKey={restaurant.profilepic} name={restaurant.rname} desc={restaurant.rdesc} from={restaurant.fromTime} to={restaurant.toTime}/>
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
                  restaurantId= {restaurantId}
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
