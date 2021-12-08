import React, {useState} from 'react';
import './Login.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginRestaurant,addingToken } from '../actions/resActions';
import { useHistory, Link } from 'react-router-dom';

function Login() {

    const dispatch = useDispatch();
    const [email , setEmail ] = useState("");
    const [pwd , setPwd ] = useState("");
    const [error , setError] = useState("");
    const history = useHistory();
    
    async function cuslogin(event) {
        event.preventDefault();
        try {
            const loginAdmin = {
                email,
                pwd,
            };
            console.log("------",loginAdmin)
            const res = await axios.post("/restaurant/api/login",loginAdmin);
                console.log("response",res);
                console.log("data",res.data);
        
                
            if(res.status == 200) {
                dispatch(addingToken({
                    token:res.data.token,
                }))
                dispatch(loginRestaurant({
                    email: res.data.email,
                    restaurantId: res.data.restaurantId,
                    name: res.data.name,
                    loggedIn: true, 
                }))
              history.push("/rhome")
            }
            else{
                console.log("error",res.data.message);
                console.log("incatch")
                setError(res.data.message)
            }
            //console.log("response", res);
        }catch(err){
            console.log(err);
            console.log(err.response);
            console.log(err.response.data)
            console.log("incatch")
            setError(err.response.data.message)
        }
    }

    const divStyle = {
        color: 'red'
      }; 

    return(
    <div className ="login_cen">
    <div className ="logi">
            <img className="login__logo" 
            src="https://d1a3f4spazzrp4.cloudfront.net/arch-frontend/1.1.1/d1a3f4spazzrp4.cloudfront.net/eats/eats-logo-1a01872c77.svg"
            alt=""
            />
        <div className ="login_wc">
            <h4>Welcome back</h4>
            <div className ="login__container">
                <p>Sign in with your email and password</p>
                <form>
                    <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email}></input>
                    <input type="password" placeholder="password" onChange={(e) => setPwd(e.target.value)} value={pwd}></input>
                    <button onClick={cuslogin} className="login__button">Next</button>
                </form>
                <div className="login__text">
                    <p>New to Uber?</p>
                    <Link to="/rregister" className="login_ul"><p className="login__create">Create an account</p></Link>
                </div>
                <div style = {divStyle}>
                    {error && <p> {error} </p>}
                        
                </div>
            </div>
        </div>
    </div>
    </div>
    )
}



export default Login;