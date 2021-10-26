import React, { useState, useEffect} from "react";

import { Link } from "react-router-dom";
import { Grid} from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./UpdateProfile.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import './Pastorders.css'
import { Typography } from "@material-ui/core";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { logout } from "../actions/userActions";
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { LocationOn} from "@mui/icons-material";


const Pastorders = () => {
  const history= useHistory();
  const dispatch= useDispatch();
  const [headbg, setheadbg] = useState("transparent");
  const [shadow, setshadow] = useState("none");
  const [mode, setMode] = useState("pickup")
  // const [pickup, setPickup] = useState()
  // const [delivery, setDelivery] = useState()
  const [orders, setOrders] = useState([
    {
      restaurantName: "restaurantName",
      date: "date",
      total: "total",
    },
  ]);
  const [orderdetails, setOrderdetails] = useState([])
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [filters, setFilters] = useState([]);
  const [pd, updatePD] = useState({
    delivery: true,
    pickup: true,
  })

  useEffect(() => {
    axios
      .post("/api/order/getcusorder", {
        customerId: JSON.parse(localStorage.getItem("customer")).customerId,
      })
      .then((res) => {
        console.log(res);
        setOrders(res.data)
        
      })

  }, []);

  const getdetails= (invoiceId)=>{
    axios
    .post("/api/order/getcusdetail", {
      customerId: JSON.parse(localStorage.getItem("customer")).customerId,
      invoiceId : invoiceId,
    })
    .then((res) => {
      console.log(res);
      setOrderdetails(res.data)
    })
  }
    
  

  window.addEventListener("scroll", () => {
    if (window.scrollY >= 50) {
      setheadbg("#FFFFFF");
      setshadow("rgb(226 226 226) 0px -2px 0px inset");
     
    } else {
      setheadbg("transparent");
      setshadow("none");
   
    }
  });

  const [status, setStatus] = useState("");
  
  useEffect(() => {
    if(pd.pickup===true && pd.delivery===false){
      console.log("pi")
      setFilters(["Order received", "Preparing", " Pickup Ready", "Picked up"])
      console.log(filters)
    }
    else if(pd.delivery===true && pd.pickup===false){
      console.log("de")
      setFilters(["Order received", "Preparing", "On the way", "Delivered"])
    }
    else{
      
      setFilters(["All orders","Order received", "Preparing", "On the way", "Delivered", " Pickup Ready", "Picked up"])
    }
    console.log(pd)
  }, [pd])

  // const filters = ["All orders","Order received", "Preparing", "On the way", "Delivered", " Pickup Ready", "Picked up"]

   
      // ["Order Received", "Preparing", "On the way", "Delivered"]
      // ["Order Received", "Preparing", " Pick up Ready", "Picked Up"];

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  useEffect(() => {
    if(status=="All orders"){
      setFilteredOrders(orders)
    }
    else setFilteredOrders(orders.filter((order) => order.ostatus === status));
  }, [status]);

  useEffect(() => setFilteredOrders(orders), [orders])

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

  const Modal = ({ isShowing, hide , total}) =>
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
                >
                  <br />
                  Order details
                </Typography>
                <Grid container spacing={3}>
                  {orderdetails.map((dish) => (
                      <Grid container item>
                        <Grid container xs={4}>
                          {dish.dname}
                        </Grid>
                        <Grid container xs={4}>
                          {dish.quantity}
                        </Grid>
                        <Grid container xs={4}>
                          {dish.subtotal}
                        </Grid>
                      </Grid>
                    ))}
                  <Grid container item>
                    <Grid container xs={4}></Grid>
                    {/* <Grid container xs={4}>
                      Total Price :
                    </Grid>
                    <Grid container xs={4}>
                    {total}
                    </Grid> */}
                  </Grid>
                </Grid>
                <Box
                  sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                >
                </Box>
              </div>
            </div>
          </React.Fragment>,
          document.body
        )
      : null;
  const { isShowing, toggle } = useModal();

  
  function signout(){
    dispatch(logout());
    localStorage.setItem("customer",null);
    history.push("/")
  }


  return (
    <div >
      <div className="header__upper">
        <div
          className="header__upperheader"
          style={{ backgroundColor: headbg, boxShadow: shadow }}
        >
          <div className="header__upperheaderleft">
            <Link to="/chome">
              <img
                src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/ee037401cb5d31b23cf780808ee4ec1f.svg "
                alt="uber eats"
              />{" "}
            </Link>
          </div>

          <div className="header__upperheadercenter"   >
          <LocationOn />
<input type="text" placeholder="What are you craving? " />
</div>


          <div className="header__upperheaderright" onClick={signout}>
            <p> Sign out </p>
          </div>
        </div>
      </div>
     
      <div
        style={{
          paddingTop: "100px",
          height: "100vh",
          paddingLeft:'45px',
          paddingRight:'45px'
          
        }}
        container
        direction={"row"}
      >
        <div style ={{
                  paddingBottom: '30px',
                }}>
        <h1>Past Orders</h1>
      </div>
        <Box sx={{ minWidth: 120 }} style ={{
                  color: "black",
                  paddingBottom:'30px'
                }}>
        

            <FormGroup style={{display:"flex"}}>
                <FormControlLabel   value="pickup"  onChange={
                  (event) => updatePD(
                    {...pd,
                      pickup: event.target.checked
                    }
                  )
                }control={<Checkbox  defaultChecked="true" style ={{
                  color: "black",
                }}/>} label="Pick-up"/>

                <FormControlLabel  value="delivery"   onChange={
                  (event) => updatePD(
                    {...pd,
                      delivery: event.target.checked
                    }
                  )
                }
                   control={<Checkbox defaultChecked="true" style ={{
                  color: "black",
                }} />} label="Delivery" />
           </FormGroup>
          <FormControl fullWidth style ={{
                  color: "black",
                }}>
            <InputLabel id="demo-simple-select-label">Order status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="Status"
              onChange={handleChange}
              style ={{
                color: "black",
              }}
            >
              {filters.map((filter) => (
                <MenuItem value={filter}>{filter}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <table
          style={{
            width: "100%",
            paddingTop:'30px'
          }}
        >
          <tr>
            <th>Restaurant Name</th>
            <th>Order Date</th>
            <th>Amount</th>
            <th>Mode of delivery</th>
          </tr> 

          {/* Use filterredOrders for this */}
          {filteredOrders.map((order) => (
            <tr onClick={()=>{toggle()
            getdetails(order.invoiceId)}}>
              <td>{order.rname}</td>
              <td>{order.orderDate}</td>
              <td>{order.total}</td>
              <td>{order.mode}</td>
              <Modal
              isShowing={isShowing}
              hide={toggle}
              total= {order.total}
              style={{ position: "absolute", width: "240px", height: "340px" }}
            />
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Pastorders;
