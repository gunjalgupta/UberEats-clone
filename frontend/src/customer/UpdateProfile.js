import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
import M from "materialize-css";
import { Formik } from "formik";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import {
  CountryDropdown,
  RegionDropdown,
} from "react-country-region-selector-material-ui-new";
import "./UpdateProfile.css";
import Showprofile from "./Showprofile";
import Profilepic from "./Profilepic";
import { useDispatch, useSelector } from "react-redux";
import { logout,login } from "../actions/userActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  
  Menu,
  LocationOn,
} from "@mui/icons-material";
import CustomerSidebar from "../components/CustomerSidebar"

//import "materialize-css/dist/css/materialize.min.css";

const UpdateProfile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [customerData, setcustomerData] = useState([]);
  const [headbg, setheadbg] = useState("transparent");
  const [shadow, setshadow] = useState("none");
  const user = useSelector((state) => state.user);

  window.addEventListener("scroll", () => {
    if (window.scrollY >= 50) {
      setheadbg("#FFFFFF");
      setshadow("rgb(226 226 226) 0px -2px 0px inset");
    
    } else {
      setheadbg("transparent");
      setshadow("none");
     
    }
  });

  function signout() {
    dispatch(logout());
    history.push("/");
  }

  useEffect(() => {
    const customerId = user.user.customerId;

    axios.get(`/customer/api/profile/${customerId}`, ).then((response) => {
      console.log("res", response);
      if (response.data.error) {
        console.log("res", response);
        M.toast({ html: response.data.error, classes: "#c62828 red darken-3" });
      } else {
        setcustomerData(response.data);
        console.log(response.data);
        //console.log("resss ",customerData);
        dispatch(login( response.data))
        
      }
    });

  
  }, []);

  return customerData.email ? (
    <section className="section" id="about">
      <div className="update">
        <div className="header__upper">
          <div
            className="header__upperheader"
            style={{ backgroundColor: headbg, boxShadow: shadow }}
          >
            <div className="header__upperheaderleft">
              {/* <Link to="/chome">
                <img
                  src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/ee037401cb5d31b23cf780808ee4ec1f.svg "
                  alt="uber eats"
                />{" "}
              </Link> */}
              <Menu
              style={{
                marginRight: "30px",
              }}
            />

            <CustomerSidebar/>
            </div>

            {/* <div className="header__upperheadercenter"   >
                 
                    <input type="text" placeholder="What are you craving? " />
                 </div> */}

            <div className="header__upperheaderright" onClick={signout}>
              <p> Sign out </p>
            </div>
          </div>
        </div>

        <br />
        <br />
        <div className="details_img">
          <Showprofile />
          <Profilepic />
        </div>
        <div className="row">
          {
            <Formik
              style={{ width: "40%" }}
              initialValues={{
                cname: customerData.cname,
                email: customerData.email,
                mobileNo: customerData.mobileNo,
                city: customerData.city,
                stateId: customerData.stateId,
                countryId: customerData.countryId,

                DOB: customerData.DOB ? customerData.DOB.substr(0, 20) : null,
                nickname: customerData.nickname,
                about: customerData.about,
              }}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                console.log(values);
                // if (image) {
                //     const data = new FormData()
                //     data.append("api_key", '757831828593633');
                //     data.append("file", image)
                //     data.append("upload_preset", "l3ihyhha")
                //     data.append("cloud_name", "du8oeufnp")
                //     fetch("https://api.cloudinary.com/v1_1/du8oeufnp/image/upload", {
                //         method: "post",
                //         body: data
                //     }).then(res => res.json())
                //         .then(res => {
                //             console.log(res + "Hiii")
                //             setUrl(res.url)
                //         })
                //         .catch(err => {
                //             console.log(err)
                //         })
                // }
                const customerId = user.user.customerId;
                console.log(customerId);
                axios
                  .post(`/customer/api/profile/updatedetails/`, {
                    customerId,
                    values: values,
                  })
                  .then((response) => {
                    console.log("update", response);
                    if (response.data.error) {
                      M.toast({
                        html: response.data.error,
                        classes: "#c62828 red darken-3",
                      });
                    } else {
                      toast.success("Updated details successful", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                      dispatch(login(response.data))
                      const timeout = setTimeout(() => {
                        history.push("/chome");
                      }, 3000);
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                //history.push('/chome')
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values,
              }) => (
                <form
                  id="contactForm"
                  style={{ width: "40%" }}
                  name="sentMessage"
                  onSubmit={handleSubmit}
                >
                  <h4
                    className="font-weight-normal"
                    style={{
                      fontFamily: "UberMoveText-Medium,Helvetica,sans-serif",
                    }}
                  >
                    {" "}
                    Update details
                  </h4>
                  <br />

                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label style={{ width: "100%" }}>
                          Customer Name
                          <input
                            required
                            type="text"
                            style={{ width: "100%", borderRadius: 0 }}
                            className="form-control"
                            id="cname"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.cname}
                          />
                        </label>
                        <p className="help-block text-danger"></p>
                      </div>
                      <div className="form-group">
                        <label style={{ width: "100%" }}>
                          {" "}
                          Email{" "}
                          <input
                            required
                            type="text"
                            style={{ width: "100%", borderRadius: 0 }}
                            className="form-control"
                            id="email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                          />
                        </label>
                        <p className="help-block text-danger"></p>
                      </div>
                      <div className="form-group">
                        <label style={{ width: "100%" }}>
                          Contact Number{" "}
                          <input
                            required
                            type="number"
                            style={{ width: "100%", borderRadius: 0 }}
                            className="form-control"
                            id="mobileNo"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.mobileNo}
                          />
                        </label>
                        <p className="help-block text-danger"></p>
                      </div>
                      <div className="form-group">
                        <label style={{ width: "100%" }}>
                          City{" "}
                          <input
                            type="text"
                            style={{ width: "100%", borderRadius: 0 }}
                            className="form-control"
                            id="city"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.city}
                          />
                        </label>
                        <p className="help-block text-danger"></p>
                      </div>
                      <div className="form-group">
                        <label style={{ width: "100%" }}>
                          Country
                          <CountryDropdown
                            style={{ width: "100%" }}
                            value={values.countryId}
                            className="form-control"
                            id="countryId"
                            onBlur={handleBlur}
                            onChange={handleChange("countryId")}
                          />
                        </label>
                        <p className="help-block text-danger"></p>
                      </div>
                      <div className="form-group">
                        <label>
                          State{" "}
                          <RegionDropdown
                            style={{ width: "100%" }}
                            country={values.countryId}
                            value={values.stateId}
                            className="form-control"
                            id="stateId"
                            onBlur={handleBlur}
                            onChange={handleChange("stateId")}
                          />
                        </label>
                        <p className="help-block text-danger"></p>
                      </div>
                      <div className="form-group">
                        <label style={{ width: "100%" }}>
                          Description{" "}
                          <input
                            type="text"
                            style={{ width: "100%", borderRadius: 0 }}
                            className="form-control"
                            id="about"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.about}
                          />
                        </label>
                        <p className="help-block text-danger"></p>
                      </div>
                      <div className="form-group">
                        <label style={{ width: "100%" }}>
                          Date of birth{" "}
                          <input
                            type="date"
                            style={{ width: "100%", borderRadius: 0 }}
                            className="form-control"
                            id="DOB"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.DOB}
                          />
                        </label>
                        <p className="help-block text-danger"></p>
                      </div>
                      <div className="form-group">
                        <label style={{ width: "100%" }}>
                          Nickname{" "}
                          <input
                            type="text"
                            style={{ width: "100%", borderRadius: 0 }}
                            className="form-control"
                            id="nickname"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.nickname}
                          />
                        </label>
                        <p className="help-block text-danger"></p>
                      </div>
                      <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="update_button"
                    style={{ width: "100%", borderRadius: 5 }}
                  >
                    Save changes
                  </Button>
                  <br />
                  <br />
                </form>
              )}
            </Formik>
          }
        </div>
      </div>
    </section>
  ) : (
    <h1></h1>
  );

  // <form onSubmit={submit}>
  //   <input
  //     type="text"
  //     name="user name "
  //     value={customerData.cname}
  //     onChange={e => setUser({ ...user, name: e.target.value })}
  //   />
  //   {user.errors.name && <p>{user.errors.name}</p>}

  //   <input
  //     type="email"
  //     name="user[email]"
  //     value={user.email}
  //     onChange={e => setUser({ ...user, email: e.target.value })}
  //   />
  //   {user.errors.name && <p>{user.errors.name}</p>}

  //   <input type="submit" name="Sign Up" />
  // </form>
};
export default UpdateProfile;
