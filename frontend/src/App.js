import './App.css';
import Header from './Header';
import Footer from './Footer';
import Center from './Center';
import CLogin from './customer/Login';
//import Home from './customer/Home'
import CRegister from './customer/Register'
import RLogin from './restaurant/Login';
import RRegister from './restaurant/Register'
import RProfile from './restaurant/UpdateProfile';
import CProfile from './customer/UpdateProfile';
import CHome from "./customer/Home";
import RHome from "./restaurant/Home";
import Resprofile  from './restaurant/Resprofile';
import Adddish from './dish/Adddish'
import Editdish from './dish/Editdish'
import Favorite from './customer/Favourite';
import Checkout from './customer/Checkout';
import Pastorders from './customer/Pastorders';
import AllOrders from './restaurant/AllOrders';
import Cusprofile from './restaurant/Cusprofile';
//import Details from './customer/Details'
//import Profilepic from './customer/Profilepic';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


function App() {
  return (
    <Router>
    <div className="app">
    <Switch>
           <Route path='/clogin'>
            <CLogin />
          </Route>
         <Route path='/cregister'>
            <CRegister/>
          </Route>
          <Route path='/rlogin'>
            <RLogin />
          </Route>
         <Route path='/rregister'>
            <RRegister/>
          </Route>
          <Route exact path = '/resprofile/:restaurantId'>
            <Resprofile />
            </Route>
          <Route path='/rprofile/'>
            <RProfile/>
          </Route>
          <Route path='/cprofile/'>
            <CProfile/>
          </Route>
          <Route path='/chome/'>
            <CHome/>
          </Route>
          <Route path='/rhome/'>
            <RHome/>
          </Route>
          <Route path='/adddish/'>
            <Adddish/>
          </Route>
          <Route exact path='/editdish/:dishId'>
            <Editdish/>
          </Route>
          <Route path='/favourite/'>
            <Favorite/>
          </Route>
          <Route path='/checkout'>
            <Checkout/>
          </Route>
          <Route path='/pastorders'>
            <Pastorders/>
          </Route>
          <Route path='/allorders'>
            <AllOrders/>
          </Route>
          <Route exact path='/cusprofile/:customerId'>
            <Cusprofile/>
          </Route>

    <Route path= "/">
     <Header />
    <Center />  
    <Footer  /> 
    </Route>
        
          </Switch>
    </div>
    </Router>
  );
}

export default App;



