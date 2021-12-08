import React, {useState} from 'react';
import './Login.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login,addingToken } from '../actions/userActions';
import { useHistory, Link } from 'react-router-dom';
import {loginn} from '../queries/queries';
import { graphql, compose } from "react-apollo";
import { useQuery } from "@apollo/react-hooks"
import {withApollo} from 'react-apollo';

function Login() {

    const dispatch = useDispatch();
    const [email , setEmail ] = useState("");
    const [pwd , setPwd ] = useState("");
    const [error , setError] = useState("");
    const history = useHistory();

    //const { loading, error, data } = useQuery(loginn)

    // if (error) return <h1>Something went wrong!</h1>
    // if (loading) return <h1>Loading...</h1>
    
    async function cuslogin(event) {
        event.preventDefault();

        //const { loading, error, data } = useQuery(loginn)
        loginn({
            query : login,
            variables: {
                email : email,
                pwd : pwd,
            }
        }).then((response)=>{
            console.log('Response', response.data);
            console.log('UserData', response.data.login.userData);
            if(response.data.login.result === true){
                
                // localStorage.setItem("ProfileName",response.data.login.userData.FirstName);
                // localStorage.setItem('accountType', response.data.login.userData.Accounttype);
                // localStorage.setItem("isAuthenticated", true);
                // localStorage.setItem("Email", response.data.login.userData.Email);
                console.log("success", response);

            }
            else{
                console.log("error",response);
            }
        })
        // try {
        //     const loginAdmin = {
        //         email,
        //         pwd,
        //     };
        //     console.log("------",loginAdmin)
        //     const res = await axios.post("/customer/api/login",loginAdmin,)
        //     console.log("------",res)
        // if(res.status == 200) {
        //     dispatch(addingToken({
        //         token:res.data.token,
        //     }))
        //     dispatch(login({
        //         email: res.data.email,
        //         customerId: res.data.customerId,
        //         name: res.data.name,
        //         loggedIn: true, 
                
        //     }))
        //   history.push("/chome")
            
            
        //     }
     
        // else {
        //     console.log("error",res.data.message);
        //     console.log("incatch")
        //     setError(res.data.message)
        // }
        // }
        //     //console.log("response", res);
        // catch(err){
        //     console.log("error",err.response.data.message);
        //     console.log("incatch")
        //     setError(err.response.data.message)
        // }
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
                    <Link to="/cregister" className="login_ul"><p className="login__create">Create an account</p></Link>
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

export default withApollo(Login);