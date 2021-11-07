import React, { useEffect , useState} from "react";
//import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Dish from '../components/Resdishes'
import { useHistory } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import './Home.css'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useDispatch } from "react-redux";
import { logoutRestaurant } from "../actions/resActions";
import { styled,useTheme } from "@mui/material/styles";
import RestaurantSidebar from '../components/RestaurantSidebar';
import { Menu, LocationOn} from "@mui/icons-material";
const Home =()=>{

    const history = useHistory()
    const dispatch = useDispatch()
    const [customerData, setcustomerData] = useState([])
    const [restaurant, setRestaurant] = useState([])
    const [dishes, setDishes] = useState([])
    const [image, setImage] = useState([])
    const [headbg,setheadbg]=useState('transparent');
  const [shadow,setshadow]=useState('none');
  


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

  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function signout(){
    dispatch(logoutRestaurant());
    localStorage.setItem("restaurant",null);
    history.push("/")
  }

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

    useEffect(()=>{
      getDishes();
      getRestaurant();
    }, []);

  
    const getDishes = async () =>{
      const restaurantId =  JSON.parse(localStorage.getItem("restaurant")).restaurantId;
      //const restaurantId =1
      await axios.post(`/restaurant/api/getdish/${restaurantId}`,{})
      .then(responseData => {
          if (responseData.data.error) {
              console.log("res",responseData);
             // M.toast({ html: responseData.data.error, classes: "#c62828 red darken-3" })
          }
          else {
            console.log(" dishes",responseData.data)
                  //setcustomerData(responseData.data)
                  setDishes(responseData.data)
                  
                  //console.log("resss ",customerData);
                  //localStorage.setItem('dish', JSON.stringify(responseData.data));
              
          }
      })

  }
  const getRestaurant = async () =>{
    const restaurantId =  JSON.parse(localStorage.getItem("restaurant")).restaurantId;
    //const restaurantId =1
    await axios.get(`/restaurant/api/profile/${restaurantId}`,{})
    .then(responseData => {
        console.log("res",responseData);
        if (responseData.data.error) {
           // M.toast({ html: responseData.data.error, classes: "#c62828 red darken-3" })
        }
        else {
                //setcustomerData(responseData.data)
                setRestaurant(responseData.data)
                console.log("restaurant",responseData.data)
                //console.log("resss ",customerData);
                localStorage.setItem('restaurant', JSON.stringify(responseData.data));
            
        }
    })

} 
const deleteDish =  (id) =>{

  axios.post(`/restaurant/api/deletedish/${id}`,{})
 .then(responseData => {
     if (responseData.data.error) {
        // M.toast({ html: responseData.data.error, classes: "#c62828 red darken-3" })
     }
     else {
             setDishes(dishes.filter((dish) => dish.dishId !== id))
             //console.log(" dishes",responseData.data)
             
             //console.log("resss ",customerData);
             //localStorage.setItem('dish', JSON.stringify(responseData.data));
         
     }
 })

}

    return(dishes?

        <div className= "reshome">
        <div className="header__upper">
           <div className="header__upperheader"  style={{backgroundColor:headbg,boxShadow:shadow}}   >
             <div className="header__upperheaderleft">
                <Menu /><RestaurantSidebar/>
               
            </div>
            
            <div className="header__upperheadercenter">
            <LocationOn />
            <input
              type="text"
              placeholder="What are you craving? "
              
            />
          </div>
            <div className="header__upperheaderright" onClick={signout}>
                 <p> Sign out </p>
            </div>
           
           </div>
        
           
        </div>
        

        
        
        
        <div className = 'dish_home' style={{marginTop:100, marginLeft: 0, display:"flex"}}>
       
        <Box sx={{ flexGrow: 1 }}>
        <div className="name" style={{paddingLeft: 0, fontSize:22}}>
           Welcome back {restaurant.rname}
        </div>
        <div>
           
           {restaurant.profilepic && <img style={{
   alignSelf: 'center',
   height: '400px',
   width: '100%',
   borderWidth: 1,
   marginBottom: 50,
   marginRight: "30px",
   
   
 }} src={`imageRestaurant/api/images/${restaurant.profilepic}`} className="showProfile_img"  />}
            </div>
        <div className="name" style={{paddingLeft: 40, fontSize:18}}>
           Your popular dishes
        </div>
        <Grid container item xs={10} spacing={5}>
                {
                dishes.map(dish =>(
                
                <Grid container item xs={4} key={dish.dishId}>
      <Item>
      <Dish id={dish.dishId} func={deleteDish}  dname={dish.dname} des={dish.ddesc} ing={dish.ingredients} price={dish.Price} imageKey={dish.profilepic} />
    </Item>
    </Grid>
                ))
                }
                </Grid>

                

                </Box>
            </div>
           
          
    </div>:<h1></h1>
    )
    
}

export default Home;

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
