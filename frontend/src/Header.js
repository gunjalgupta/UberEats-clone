// note ---  component file name should be Start With capital letter like Header.js not header.js

import React,{useState} from "react";
import "./Header.css";
import { Menu, LocationOn,WatchLater,ArrowDownward } from "@mui/icons-material";
import { useHistory, Link } from 'react-router-dom';
import Sidebar from "./components/Sidebar";

function Header() {
   
  const [headbg,setheadbg]=useState('transparent');
  const [shadow,setshadow]=useState('none');
  const [inputdisplay,setinputdisplay]=useState(0);


  window.addEventListener('scroll',()=>{
    if(window.scrollY>=50){
      setheadbg('#FFFFFF');
      setshadow('rgb(226 226 226) 0px -2px 0px inset');
      setinputdisplay(1);

    }
    else{
      setheadbg('transparent');
      setshadow('none');  
      setinputdisplay(0);


    }
  })

  
 

  return (
    <>
      <div className="header">
        <div className="header__background">
          <img
            src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/f54fdfb464db5da7c42e62c735bdf8f1.svg"
            alt="part 1"
          />
          <div className="header__backgroundmid"></div>
          <img
            src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/bab80ef67bbbc99f2b7d45cfc395eb1b.svg"
            alt=" part 2"
          />
        </div>

        <div className="header__upper">
          <div className="header__upperheader"  style={{backgroundColor:headbg,boxShadow:shadow}}   >
            <div className="header__upperheaderleft">
              <Menu /><Sidebar />
              
            </div>
            <div className="header__upperheadercenter"  style={{transform:`scaleX(${inputdisplay})`}}    >
              <LocationOn />
              <input type="text" placeholder="Enter delivery address" />
            </div>
            <Link to= "/clogin">
            <div className="header__upperheaderright">
               <p>Sign in </p>
            </div></Link>
          </div>
        </div>
        <div className="header__center">
        <div className="header__centerbox">
        <h1>   Want food? Get food.  </h1> 
        <div className="header__centercenter">
            <div className="header__center1">
                <LocationOn   />
                <input type="text" placeholder="Enter anything"    />
            </div>
            <div className="header__center2">
                <WatchLater />
                <h3> Deliver now  </h3> 
                <ArrowDownward />

            </div>
            <div className="header__center3">
                <h3>   Find food </h3>
            </div>
        </div>
        

        </div>

        </div>


      </div>
    </>
  );
}

export default Header;