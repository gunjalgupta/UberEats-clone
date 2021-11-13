import React, { useState, useEffect} from "react";

import { Link } from "react-router-dom";
import {
  
  Menu,
  LocationOn,
} from "@mui/icons-material";
import TablePagination from '@mui/material/TablePagination';
import MaterialTable from "material-table";
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
import CustomerSidebar from "../components/CustomerSidebar"
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import LaunchIcon from '@mui/icons-material/Launch';
import CancelIcon from '@mui/icons-material/Cancel';

import { forwardRef } from 'react';


const Pastorders = () => {

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);
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
  const [data, setData] = useState([])
  const [pd, updatePD] = useState({
    delivery: true,
    pickup: true,
  })
  const lookup={  "Order received": 'Order received', "Cancel order":"Cancelled order" }

  useEffect(() => {
    axios
      .post("/orders/api/getcusorder", {
        customerId: JSON.parse(localStorage.getItem("customer")).customerId,
      })
      .then((res) => {
        console.log("api",res);
        setOrders(res.data)
        setData(res.data)
      })

  }, []);

  const getdetails= (invoiceId)=>{
    axios
    .post("/orders/api/getcusdetail", {
      customerId: JSON.parse(localStorage.getItem("customer")).customerId,
      invoiceId : invoiceId,
    })
    .then((res) => {
      console.log("api",res);
      setOrderdetails(res.data.orderdetails)
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
  const saveStatus = async (ostatus,orderId) =>{
    const req = { ostatus: ostatus,
    orderId: orderId}
    //const restaurantId =1
    await axios.post("/orders/api/status",req)
    .then(responseData => {
        if (responseData.data.error) {
            //console.log("res",responseData);
           // M.toast({ html: responseData.data.error, classes: "#c62828 red darken-3" })
        }
        else {
          //console.log(" dishes",responseData.data)
                //setcustomerData(responseData.data)
                //setDishes(responseData.data)
                
                //console.log("resss ",customerData);
                //localStorage.setItem('dish', JSON.stringify(responseData.data));
            
        }
    })

}

const emptyRows =
page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orders.length) : 0;

const handleChangePage = (event, newPage) => {
setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
setRowsPerPage(parseInt(event.target.value, 10));
setPage(0);
};
// TablePaginationActions.propTypes = {
//   count: PropTypes.number.isRequired,
//   onPageChange: PropTypes.func.isRequired,
//   page: PropTypes.number.isRequired,
//   rowsPerPage: PropTypes.number.isRequired,
// };


  return (
    <div >
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
                <MenuItem value={filter}>{filter} <br/></MenuItem>
                
              ))}
              
            </Select>
          </FormControl>
        </Box>
        {/* <table
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

          {/* Use filterredOrders for this 
          {filteredOrders.map((order) => (
            <tr onClick={()=>{toggle()
            getdetails(order.invoiceId)}}>
              <td>{order.rname}</td>
              <td>{order.updatedAt? (order.updatedAt).substring(0,10): order.updatedAt}</td>
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
        </table> */}
<Modal
              isShowing={isShowing}
              hide={toggle}
              //total= {order.total}
              style={{ position: "absolute", width: "240px", height: "340px" }}
            />
<MaterialTable
        icons={tableIcons}
        title="Orders"
        components={{
          Pagination: props => (
            <TablePagination
            rowsPerPageOptions={[2, 5, 10, { label: 'All', value: -1 }]}
            colSpan={3}
            count={orders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: {
                'aria-label': 'rows per page',
              },
              native: true,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            //ActionsComponent={TablePaginationActions}
          />
              ),
                    }}
        
        columns={[
            { title: 'Invoice number', field: 'orderId' ,editable: 'never', grouping: false },
            { title: 'Restaurant name', field: 'rname' ,editable: 'never' },
            { title: 'Order date', field: 'updatedAt', initialEditValue: 'initial edit value' , editable: 'never', grouping: false },
            { title: 'Amount', field: 'total', type: 'numeric' , editable: 'never', grouping: false },
            { title: 'Mode of delivery', field: 'mode' , editable: 'never', grouping: false },
            { title: 'Status', field: "ostatus" , editable: 'never'},
           
            
          ]}
        data={data}
        actions={[
          {
            icon: () => <LaunchIcon />,
            tooltip: 'See order details',
            onClick: (event, rowData) => 
            {toggle();
            getdetails(rowData.invoiceId);
            //history.push(`/cusprofile/${rowData.customerId}`)
          }
          },
          rowData => ({
            icon:() => <CancelIcon/>,
            tooltip: 'Cancel order',
            onClick: (event, rowData) => saveStatus("Cancelled Order", rowData.orderId),
            disabled: rowData.ostatus !== "Order received"
          })
          
        ]}
        cellEditable={{
          onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
            return new Promise((resolve, reject) => {
              console.log('newValue: ' + newValue);
              console.log('newValue: ' + rowData.orderId);
              setStatus(newValue);
              saveStatus(newValue, rowData.orderId)
              setTimeout(resolve, 1000);
            });
          }
        }}
        options={{
            grouping: true
          }}
        
        
      />
      </div>
    </div>
  );
};

export default Pastorders;
