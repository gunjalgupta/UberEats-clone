import React from "react";
import Box from "@mui/material/Box";
import { Card, Grid } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCart, orderPlaced } from "../actions/cartActions";
import bcrypt from 'bcryptjs';

function Dishes({ dname, des, ing, imageKey, price, id , restaurantId,rname}) {


  id = String(id)
  const cartId = bcrypt.hashSync(id,10);
  const dispatch= useDispatch();
  const user = useSelector((state) => state.user);
  const cartt= useSelector((state) => state.cart);
  const custId = String(user.user.customerId)
  const invoiceId = bcrypt.hashSync(custId,10);
  const [dish, setdish] = useState([]);
  const [dish1, setdish1] = useState([]);
  let [counter, setcounter] = useState(0);

  const increment = () => {
    setcounter(counter + 1);
  };
  const decrement = () => {
    setcounter(counter - 1);
  };
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
  const useModal1 = () => {
    const [isShowing1, setIsShowing1] = useState(false);

    function toggle1() {
      setIsShowing1(!isShowing1);
    }

    return {
      isShowing1,
      toggle1,
    };
  };

  function addtocartt(dishId, quantity,dname,price){
    console.log("Inside add to cart")
   
    let flag = false;
    const quant = parseInt(quantity,10)
    const subtotal= quantity*price
    
    console.log(cartt.cart)
    if(cartt.cart.length != 0){
      console.log("Inside basket lenfth");
      cartt.cart.forEach(element => {
        if(Number(element.restaurantId) != Number(restaurantId))
          flag = true
          console.log(element.restaurantId)
          console.log(restaurantId)
      })
    }
      if(!flag){
        console.log("Inside else")
        dispatch(addCart( { dishId: dishId,
          dname:dname, 
          quantity: quant, 
          Price: price, 
          subtotal: subtotal,
          rname:rname ,
          customerId : user.user.customerId,
          restaurantId: restaurantId,
          cartId: cartId,
          imageKey : imageKey,
          invoiceId: invoiceId}
          ))
      
      } else {
        toggle()
      console.log(isShowing1)
      console.log(isShowing)
      toggle1();
      setdish1({ dishId, dname, quant, price,subtotal});
      }
  }

  const newOrder=(dishId, quantity,dname,subtotal,price)=>{
    
    
    const quant = parseInt(quantity,10)
    
    dispatch(orderPlaced());

    dispatch(addCart( { dishId: dishId,
      dname:dname, 
      quantity: quant, 
      Price: price, 
      subtotal: subtotal,
      rname:rname ,
      customerId : user.user.customerId,
      restaurantId: restaurantId,
      cartId: cartId,
      imageKey : imageKey,
      invoiceId: invoiceId}
      ))
   
    console.log("sucessfully")
  }

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
              <div style={{ display: "flex", alignItems: "center",fontSize:30}}> {rname} </div>
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
                <Typography component="div" variant="h5">
                  {dish.dname}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {dish.des}
                  <br />
                  Ingredients: {dish.ing}
                </Typography>
                <Box
                  sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                >
                  Price ${price}
                </Box>

                {imageKey && (
                  <CardMedia
                    className="media"
                    component="img"
                    sx={{ width: 151 }}
                    image={`/imageRestaurant/api/images/${imageKey}`}
                    alt="Live from space album cover"
                  />
                )}
                <ButtonGroup size="small" aria-label="small button group">
                  {counter > 1 ? (
                    <Button
                      key="one"
                      onClick={() => {
                        decrement();
                      }}
                    >
                      -
                    </Button>
                  ) : (
                    <Button
                      disabled
                      key="one"
                      onClick={() => {
                        decrement();
                      }}
                    >
                      -
                    </Button>
                  )}
                  ,
                  <Button key="two" diabled>
                    {counter}
                  </Button>
                  ,
                  <Button
                    key="three"
                    onClick={() => {
                      increment();
                    }}
                  >
                    +
                  </Button>
                  ,
                </ButtonGroup>
                <Button
                  style={{ marginLeft: 30 }}
                  onClick={() => 
                    
                    addtocartt(id, counter,dname,price)
                
                  }
                  disabled={counter===0}
                >
                  {" "}
                  Add to cart
                </Button>
              </div>
            </div>
          </React.Fragment>,
          document.body
        )
      : null;
  const { isShowing, toggle } = useModal();
  //====================================================================

  const { isShowing1, toggle1 } = useModal1();

  const Modal1 = ({ isShowing1, hide }) =>
    isShowing1
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
                <Typography component="div" variant="h4">
                  Create new order?
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  Your cart contains items from another restaurant. Do you want to create new order?
                  <br />
                 
                </Typography>
                <Box
                  sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                >
                 
                </Box>

                 
                    <Button
                      key="one"
                      onClick={() => {
                        newOrder(dish1.id, dish1.quantity,dish1.dname,dish1.subtotal,dish1.price)
                        toggle1()
                      }}
                      style={{color:'white', backgroundColor: "black" }}
                    >
                      New Order
                    </Button>
                 
              </div>
            </div>
          </React.Fragment>,
          document.body
        )
      : null;



  return (
    <div className="dishcard">
      <Modal isShowing={isShowing} hide={toggle} />
      <Modal1 isShowing1={isShowing1} hide={toggle1} />
      <Card
        class
        Name="root"
        style={{
          border: "1px solid grey",
          cursor: "pointer",
        }}
      >
        <Grid
          container
          direction={"row"}
          onClick={() => {
            toggle();
            setdish({ dname, des, ing, imageKey, price });
          }}
        >
          <Grid
            container
            item
            xs={6}
            style={{
              padding: "20px",
            }}
          >
            <Grid container item onClick={() => {
            toggle();
            setdish({ dname, des, ing, imageKey, price });
          }}>
              <Typography component="div" variant="h5">
                {dname}
              </Typography>
            </Grid>
            <Grid container item>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                <br />
                Ingredients: {ing}
              </Typography>
            </Grid>
            <Grid container item>
              Price ${price}
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={6}
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {imageKey && (
              <CardMedia
                className="media"
                component="img"
                sx={{ width: 151 }}
                image={`/imageRestaurant/api/images/${imageKey}`}
                alt="Live from space album cover"
              />
            )}
          </Grid>
        </Grid>
        
      </Card>
    </div>
  );
}

export default Dishes;
