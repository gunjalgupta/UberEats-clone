import React from 'react' 
import "./Restaurantpic.css"


const Restaurantpic = ({key, imgKey, name, desc, from, to}) =>{
    return (
        <div className = "cardres">
        
        <div>
           
            {imgKey && <img style={{
    alignSelf: 'center',
    height: '400px',
    width: '100%',
    borderWidth: 1,
    marginBottom: 50
    
  }} src={`/imageRestaurant/api/images/${imgKey}`} className="showProfile_img"  />}
             </div>
    <div className="name">
        <h1 style={{fontFamily : "UberMove, sans-serif"}}>{name}</h1>
    </div>
    <div className="desc">
        <p>{desc}</p>
        <br></br>
        <p>Timings: {from} : {to} </p>
    </div>
    <div className="name">
        <h2 >Dishes picked for you</h2>
    </div>
    
    </div>
    )
}

export default Restaurantpic
