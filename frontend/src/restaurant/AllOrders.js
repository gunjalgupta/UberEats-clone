import React, { useEffect , useState} from "react";
import MaterialTable from "material-table";
import { forwardRef } from 'react';
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
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
import { useDispatch } from "react-redux";
import { logoutRestaurant } from "../actions/resActions";
import {  useHistory } from 'react-router-dom'
import axios from "axios";
import LaunchIcon from '@mui/icons-material/Launch';
import {useSelector } from "react-redux";

import { Menu} from "@mui/icons-material";


function AllOrders() {

  const restaurant= useSelector((state)=>state.restaurant)
  
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

  const history = useHistory()
  const dispatch = useDispatch()
  const [data, setData] = useState([])
  const [status, setStatus] = useState([])

  const [headbg,setheadbg]=useState('transparent');
  const [shadow,setshadow]=useState('none');
  const [deliveryData, setDeliveryData] = useState([]);
  const [pickupData, setPickupData] = useState([]);
  const [lookup, setLookup] = useState({  "placed": 'Placed', "Preparing": 'Preparing', "On the way": "On the way", "Delivered":"Delivered" ,"Cancelled Order":"Cancelled Order" });



window.addEventListener('scroll',()=>{
  if(window.scrollY>=50){
    setheadbg('#FFFFFF');
    setshadow('rgb(226 226 226) 0px -2px 0px inset');

  }
  else{
    setheadbg('transparent');
    setshadow('none');
   


  }
})

function signout(){
  dispatch(logoutRestaurant());
  localStorage.setItem("restaurant",null);
  history.push("/")
}

useEffect(()=>{
  const restaurantId =  JSON.parse(localStorage.getItem("restaurant")).restaurantId;
  axios
  .post(`/orders/api/getresorders/${restaurantId}`,)
  .then((responseData) => {
    console.log("res", responseData);
    if (responseData.data.error) {
      console.log("res", responseData);
      // M.toast({ html: responseData.data.error, classes: "#c62828 red darken-3" })
    } else {
        const tempdatadel = []
        const tempdatapic = []
        responseData.data.forEach((row)=>{
          if(row.mode=="delivery"){
              if(row.ostatus=="Order received" || row.ostatus=="Preparing" || row.ostatus=="On the way")
              {
                  tempdatadel.push({...row, status: "New order"})
              }
              else if(row.ostatus=="Delivered"){
                  tempdatadel.push({...row, status: "Delivered order"})
              }
              else if(row.ostatus=="CCancelled Order"){
                  
                  tempdatadel.push({...row, status: "Cancelled order"})
              }
              
          }
          
          else {
              if(row.ostatus=="Order received" || row.ostatus=="Preparing" || row.ostatus=="Pickup ready")
              {
                  
                  tempdatapic.push({...row, status: "New order"})
              }
              else if(row.ostatus=="Picked up"){
                  tempdatapic.push({...row, status: "Delivered order"})
              }
              else if(row.ostatus=="Cancelled Order"){
                  tempdatapic.push({...row, status: "Cancelled order"})
              }
              
          }
          console.log("here",row)
      })
  
      //setcustomerData(responseData.data)
      setDeliveryData(tempdatadel)
      setPickupData(tempdatapic)
      setData(tempdatadel);
      console.log("restaurant", responseData.data);
    }
  })

},[status])

  const [columns, setColumns] = useState();

  // if mode == delivery then lookup:  { "placed": 'Placed', "Preparing": 'Preparing', on the way, delivered },
  //else lookup:  { "placed": 'Placed', "Preparing": 'Preparing', pickup ready, picked up },

  const saveStatus = async (ostatus,orderId) =>{
      const req = { ostatus: ostatus,
      orderId: orderId}
      //const restaurantId =1
      await axios.post("/orders/api/status",req)
      .then(responseData => {
          if (responseData.data.error) {
              console.log("res",responseData);
             
          }
          else {
            
            console.log("Status save response",responseData); 
          }
      })

  }

  return (
     <div>
      <div className="header__upper">
         <div className="header__upperheader"  style={{backgroundColor:headbg,boxShadow:shadow}}   >
           <div className="header__upperheaderleft">
           <Menu/>
           <Link to='/rhome'>
              <img
                  src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/ee037401cb5d31b23cf780808ee4ec1f.svg "
                   alt="uber eats" /></Link>
          </div>
         
          
          <div className="header__upperheaderright" onClick={signout}>
               <p> Sign out </p>
          </div>
          
         </div>
      </div> 
    <div style={{paddingTop:90, paddingLeft:20, paddingRight:20}}>

        <button onClick={() => {
          console.log("pickup",pickupData)
            setData(pickupData)
           setLookup({ "Order received": 'Order received', "Preparing": 'Preparing', "Pickup ready": "Pickup ready", "Picked up": "Picked up" ,"Cancelled Order":"Cancelled Order" })}
        }>Pickup orders</button>
        <button onClick={() => {
          console.log("deliveryData",deliveryData);
            setData(deliveryData)
          
            setLookup({  "Order received": 'Order received', "Preparing": 'Preparing', "On the way": "On the way", "Delivered":"Delivered" ,"Cancelled Order":"Cancelled Order"  })}}>
                Delivery orders</button>
    <MaterialTable
      icons={tableIcons}
      title="Orders"
      
      columns={[
          { title: 'Invoice number', field: 'orderId' ,editable: 'never', grouping: false },
          { title: 'Customer name', field: 'table2.cname' ,editable: 'never' },
          { title: 'Email', field: 'table2.email', initialEditValue: 'initial edit value' , editable: 'never', grouping: false },
          { title: 'Contact Number', field: 'table2.mobileNo', type: 'numeric' , editable: 'never', grouping: false },
          { title: 'Mode of delivery', field: 'mode' , editable: 'never', grouping: false },
          { title: 'Status', field: "status" , editable: 'never'},
          {
            title: 'Order Status',
            field: 'ostatus',
            lookup: lookup,
          },
          
        ]}




      data={data}
      actions={[
        {
          icon: () => <LaunchIcon />,
          tooltip: 'See customer',
          onClick: (event, rowData) => 
          history.push(`/cusprofile/${rowData.customerId}`)
        }
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
  )
}

export default AllOrders;


//     const history = useHistory()
//     const dispatch = useDispatch()
//     const [data, setData] = useState([])
//     const [status, setStatus] = useState([])

//     const [headbg,setheadbg]=useState('transparent');
//     const [shadow,setshadow]=useState('none');
//     const [deliveryData, setDeliveryData] = useState([]);
//     const [pickupData, setPickupData] = useState([]);
//     const [lookup, setLookup] = useState({  "placed": 'Placed', "Preparing": 'Preparing', "On the way": "On the way", "Delivered":"Delivered"  });





//   useEffect(()=>{
//     const restaurantId =  JSON.parse(localStorage.getItem("restaurant")).restaurantId;
//     axios
//     .post(`/orders/api/getresorders/${restaurantId}`, {})
//     .then((responseData) => {
//       console.log("res", responseData);
//       if (responseData.data.error) {
//         console.log("res", responseData);
//         // M.toast({ html: responseData.data.error, classes: "#c62828 red darken-3" })
//       } else {
//           const tempdatadel = []
//           const tempdatapic = []
//           responseData.data.forEach((row)=>{
//             if(row.mode=="delivery"){
//               console.log("del",row)
//                 if(row.ostatus=="Order received" || row.ostatus=="Preparing" || row.ostatus=="On the way")
//                 {
//                     tempdatadel.push({...row, status: "New order"})
//                 }
//                 else if(row.ostatus=="Delivered"){
//                     tempdatadel.push({...row, status: "Delivered order"})
//                 }
//                 else if(row.ostatus=="Cancelled Order"){
                    
//                     tempdatadel.push({...row, status: "Cancelled order"})
//                 }
                
//             }
            
//             else {
//               console.log("pic",row)
//                 if(row.ostatus=="Order received" || row.ostatus=="Preparing" || row.ostatus=="Pickup ready")
//                 {
                    
//                     tempdatapic.push({...row, status: "New order"})
//                 }
//                 else if(row.ostatus=="Picked up"){
//                     tempdatapic.push({...row, status: "Delivered order"})
//                 }
//                 else if(row.ostatus=="Cancelled  Order"){
//                     tempdatapic.push({...row, status: "Cancelled order"})
//                 }
                
//             }
           
//         })
    
//         //setcustomerData(responseData.data)
//         setDeliveryData(tempdatadel)
//         setPickupData(tempdatapic)
//         setData(tempdatapic);
//         //console.log("restaurant", responseData.data);
//         //console.log("resss ",customerData);
//         //localStorage.setItem("restaurant", JSON.stringify(responseData.data));
//       }
//     })

//   },[status])
  
//     const [columns, setColumns] = useState();

//     // if mode == delivery then lookup:  { "placed": 'Placed', "Preparing": 'Preparing', on the way, delivered },
//     //else lookup:  { "placed": 'Placed', "Preparing": 'Preparing', pickup ready, picked up },
  
//     const saveStatus = async (ostatus,orderId) =>{
//         const req = { ostatus: ostatus,
//         orderId: orderId}
//         //const restaurantId =1
//         await axios.post("/orders/api/status",req)
//         .then(responseData => {
//             if (responseData.data.error) {
//                 //console.log("res",responseData);
//                // M.toast({ html: responseData.data.error, classes: "#c62828 red darken-3" })
//             }
//             else {
//               //console.log(" dishes",responseData.data)
//                     //setcustomerData(responseData.data)
//                     //setDishes(responseData.data)
                    
//                     //console.log("resss ",customerData);
//                     //localStorage.setItem('dish', JSON.stringify(responseData.data));
                
//             }
//         })
  
//     }
  
//     return (
//        <div>
//         <div className="header__upper">
//            <div className="header__upperheader"  style={{backgroundColor:headbg,boxShadow:shadow}}   >
//              <div className="header__upperheaderleft">
//              <Menu /><RestaurantSidebar/>
            
//             </div>
           
            
//         <button onClick={()=>{ console.log("button")}}>button</button>
//             <div className="header__upperheaderright" onClick={signout}>
//                  <p> Sign out </p>
//             </div>
          
//            </div>
//         </div> 
        
//       <div style={{paddingTop:90, paddingLeft:20, paddingRight:20}}>
//         <button onClick={()=>{ console.log("button")}}>button</button>

//           <Button variant="outlined" stlye={{cursor:"pointer"}} onClick={() => {
//             console.log("pickup",pickupData)
//               setData(pickupData)
//              setLookup({ "Order received": 'Order received', "Preparing": 'Preparing', "Pickup ready": "Pickup ready", "Picked up": "Picked up" })}
//           }>Pickup orders</Button>
//           <button onClick={() => {
//              console.log("pickup",pickupData)
//               setData(deliveryData)
            
//               setLookup({  "Order received": 'Order received', "Preparing": 'Preparing', "On the way": "On the way", "Delivered":"Delivered"  })}}>
//                   Delivery orders</button>
      
      
//       <MaterialTable
//         icons={tableIcons}
//         title="Orders"
        
//         columns={[
//             { title: 'Invoice number', field: 'orderId' ,editable: 'never', grouping: false },
//             { title: 'Customer name', field: 'table2.cname' ,editable: 'never' },
//             { title: 'Email', field: 'table2.email', initialEditValue: 'initial edit value' , editable: 'never', grouping: false },
//             { title: 'Contact Number', field: 'table2.mobileNo', type: 'numeric' , editable: 'never', grouping: false },
//             { title: 'Mode of delivery', field: 'mode' , editable: 'never', grouping: false },
//             { title: 'Status', field: "status" , editable: 'never'},
//             {
//               title: 'Order Status',
//               field: 'ostatus',
//               lookup: lookup,
//             },
            
//           ]}
//         data={data}
//         actions={[
//           {
//             icon: () => <LaunchIcon />,
//             tooltip: 'See customer',
//             onClick: (event, rowData) => 
//             history.push(`/cusprofile/${rowData.customerId}`)
//           }
//         ]}
//         cellEditable={{
//           onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
//             return new Promise((resolve, reject) => {
//               console.log('newValue: ' + newValue);
//               console.log('newValue: ' + rowData.orderId);
//               setStatus(newValue);
//               saveStatus(newValue, rowData.orderId)
//               setTimeout(resolve, 1000);
//             });
//           }
//         }}
//         options={{
//             grouping: true
//           }}
//       />
//       </div> 

//       <button onClick={()=>{ console.log("button")}}>button</button>
//       </div>
//     )
//   }
  
//   export default AllOrders;