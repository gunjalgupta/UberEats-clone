import React, {  useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { addCart, removeCart } from "../actions/cartActions";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ReactDOM from "react-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

const Cart=()=>{
    const dispatch = useDispatch();
    const cartt = useSelector((state) => state.cart);

    var _ = require("lodash");

    const cartorder = {
        
        total: _.sumBy(cartt.cart, (dish) => dish.subtotal),
       
      };
    
      async function remove(id) {
        console.log("fdewfef", id);
        dispatch(
          removeCart({
            id: id,
          })
        );
      }
      async function add(event, dish) {
        console.log("fdewfef", dish);
        dispatch(
          addCart({
            dishId: dish.dishId,
            dname: dish.dname,
            quantity: event.target.value,
            Price: dish.price,
            subtotal: dish.subtotal,
            rname: dish.rname,
            customerId: dish.customerId,
            restaurantId: dish.restaurantId,
            cartId: dish.cartId,
            imageKey: dish.imageKey,
            invoiceId: dish.invoiceId,
          })
        );
      }

      const handleChange = (event, dish) => {
        console.log(event.target.value);
        console.log(dish);
        if (event.target.value === "") {
          remove(dish.cartId);
        } else {
          add(event, dish);
          remove(dish.cartId);
        }
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
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: 30,
                    }}
                  >
                    {" "}
                    {cartt.cart ? cartt.cart[0].rname : <p></p>}
                  </div>
                  <div
                    className="modal-header"
                    style={{ justifyContent: "flex-end" }}
                  >
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
                    style={{ paddingBottom: "25px" }}
                  >
                    <br />
                    {cartt.cart ? (
                      <div>
                        Cart Items
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <div> Quantity </div>{" "}
                          <div style={{ paddingLeft: "80px" }}> Dish name </div>
                          <div style={{ paddingLeft: "75px" }}> Subtotal</div>
                        </div>
                      </div>
                    ) : (
                      <p></p>
                    )}
                  </Typography>
  
                  <Grid container spacing={3} style={{
                      display: "flex",
                      alignItems: "center",
                     
                    }}>
                    {cartt.cart ? (
                      cartt.cart &&
                      cartt.cart.map((dish) => (
                        <Grid container item style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent:"center"
                           
                          }}>
                          <Grid container xs={4}>
                            <FormControl
                              variant="standard"
                              sx={{ m: 1, minWidth: 90 }}
                            >
                              <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={dish.quantity}
                                onChange={(event) => {
                                  handleChange(event, dish);
                                }}
                                label="Quantity"
                              >
                                <MenuItem value="">
                                  <em>Remove</em>
                                </MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                                <MenuItem value={7}>7</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                                <MenuItem value={9}>9</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={11}>11</MenuItem>
                                <MenuItem value={12}>12</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid container xs={4}>
                            {dish.dname}
                          </Grid>
  
                          <Grid container xs={4}>
                            ${dish.subtotal}
                          </Grid>
                        </Grid>
                      ))
                    ) : (
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                        style={{ paddingBottom: "25px" }}
                      >
                        {" "}
                        Cart is empty{" "}
                      </Typography>
                    )}
                    <br />
                  </Grid>
                  <Box
                    sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                  >
                    <br></br>
                    {cartt.cart ? (
                      <Link to="/checkout" style={{ paddingTop: "40px" }}>
                        <Button
                          onClick={() => {
                            toggle();
                          }}
                          style={{
                            color: "white",
                            backgroundColor: "black",
                            display: "flex",
                          }}
                        >
                          GO TO CHECKOUT . ${cartorder.total}
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        disabled
                        onClick={() => {
                          toggle();
                        }}
                        style={{
                          color: "white",
                          backgroundColor: "black",
                          display: "flex",
                        }}
                      >
                        ADD ITEMS
                      </Button>
                    )}
                  </Box>
                </div>
              </div>
            </React.Fragment>,
            document.body
          )
        : null;
        
    const { isShowing, toggle } = useModal();

return(
    <div className="header__upperheaderright" onClick={toggle}>
        <p>
              {" "}
              <ShoppingCartOutlinedIcon style={{ color: "black" }} />
              <span className="empty-message">
                {" "}
                {cartt.cart ? cartt.cart.length : "Your cart is empty"}
              </span>{" "}
            </p>
            <Modal
              isShowing={isShowing}
              hide={toggle}
              style={{ position: "absolute", width: "240px", height: "340px" }}
            />
    </div>
)

}
export default Cart;


