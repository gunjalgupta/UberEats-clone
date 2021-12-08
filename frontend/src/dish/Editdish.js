import React, { useEffect, useState } from "react";
import axios from "axios";
import M from "materialize-css";
import { Button } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import { Formik } from "formik";
import { Menu } from "@mui/icons-material";
import Showprofile from "./Showprofile";
import Profilepic from "./Profilepic";
import Center from "../Center";
import RestaurantSidebar from '../components/RestaurantSidebar';
import {useSelector } from "react-redux";

const Editdish = () => {
  const history = useHistory();
  const restaurant= useSelector((state)=>state.restaurant)
  const [dishData, setdishData] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [image, setImage] = useState([]);
  const [headbg, setheadbg] = useState("transparent");
  const [shadow, setshadow] = useState("none");
  const [inputdisplay, setinputdisplay] = useState(0);
  const { dishId } = useParams();

  window.addEventListener("scroll", () => {
    if (window.scrollY >= 50) {
      setheadbg("#FFFFFF");
      setshadow("rgb(226 226 226) 0px -2px 0px inset");
      setinputdisplay(1);
    } else {
      setheadbg("transparent");
      setshadow("none");
      setinputdisplay(0);
    }
  });

  useEffect(() => {
    var restaurantId = restaurant.restaurant.restaurantId;
    axios
      .post(`/restaurant/api/getd/${dishId}/${restaurantId}`,)
      .then((response) => {
        console.log("res", response);
        if (response.data.error) {
          console.log("res", response);
          M.toast({
            html: response.data.error,
            classes: "#c62828 red darken-3",
          });
        } else {
          setdishData(response.data);
          console.log(response.data);
        }
      });
  }, []);

  return dishData.dname ? (
    <div className="reshome" style={{ padding: 20 }}>
      <div className="header__upper">
        <div
          className="header__upperheader"
          style={{ backgroundColor: headbg, boxShadow: shadow }}
        >
          <div className="header__upperheaderleft">
            <Menu /><RestaurantSidebar/>
          </div>
          {/* <div className="header__upperheadercenter"   >
           <LocationOn />
           <input type="text" placeholder="What are you craving? " />
        </div> */}

          <div className="header__upperheaderright">
            <p> Sign out </p>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="details_img">
        <Showprofile />
        <Profilepic />
      </div>

      <div className="row" style={{ marginTop: 120, alignContent: Center }}>
        {
          <Formik
            style={{ width: "40%" }}
            initialValues={{
              dname: dishData.dname,
              ingredients: dishData.ingredients,
              ddesc: dishData.ddesc,
              cuisine: dishData.cuisine,
              veg: dishData.veg,
              nonVeg: dishData.nonVeg,
              vegan: dishData.vegan,
              categoryId: dishData.categoryId,
              Price: dishData.Price,
              restaurantId: restaurant.restaurant.restaurantId,
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
              // const dishId = 1
              const value = { values: values };
              console.log("price", value);
              var restaurantId = restaurant.restaurant.restaurantId;
              axios
                .post(`/restaurant/api/editdish/${dishId}`, value,)
                .then((response) => {
                  console.log("update", value);
                  if (response.data.error) {
                    M.toast({
                      html: response.data.error,
                      classes: "#c62828 red darken-3",
                    });
                  } else {
                    console.log("update1", response);
                    M.toast({
                      html: "Updated dish details successfully",
                      classes: "#43a047 green darken-1",
                    });
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
              history.push("/rhome");
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
                        Dish Name
                        <input
                          required
                          type="text"
                          style={{ width: "100%", borderRadius: 0 }}
                          className="form-control"
                          id="dname"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.dname}
                        />
                      </label>
                      <p className="help-block text-danger"></p>
                    </div>
                    <div className="form-group">
                      <label style={{ width: "100%" }}>
                        {" "}
                        Ingredients{" "}
                        <input
                          type="text"
                          style={{ width: "100%", borderRadius: 0 }}
                          className="form-control"
                          id="ingredients"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.ingredients}
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
                          id="ddesc"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.ddesc}
                        />
                      </label>
                      <p className="help-block text-danger"></p>
                    </div>
                    <div className="form-group">
                      <label style={{ width: "100%" }}>
                        Price{" "}
                        <input
                          required
                          type="number"
                          style={{ width: "100%", borderRadius: 0 }}
                          className="form-control"
                          id="Price"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.Price}
                        />
                      </label>
                      <p className="help-block text-danger"></p>
                    </div>

                    <div className="form-group">
                      <label style={{ width: "100%" }}>
                        Cuisine <input className="form-control" />
                      </label>
                      <select
                        value={values.cuisine}
                        id="cuisine"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      >
                        <option value="Chinese" label="Chinese" />
                        <option value="Indian" label="Indian" />
                        <option value="Mediterrian" label="Mediterrian" />
                        <option value="Lebanese" label="Lebanese" />
                        <option value="Italian" label="Italian" />
                        <option value="Thai" label="Thai" />
                        <option value="South Indian" label="South Indian" />
                        <option value="Mexican" label="Mexican" />
                        <option value="Greek" label="Greek" />
                        <option value="Korean" label="Korean" />
                      </select>
                      <p className="help-block text-danger"></p>
                    </div>

                    <div className="form-group">
                      <label style={{ width: "100%" }}>
                        Is Vegitarian
                        <input type="dropdown" className="form-control" />
                      </label>
                      <select
                        name="veg"
                        value={values.veg}
                        id="veg"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      >
                        <option value="Yes" label="Yes" />
                        <option value="No" label="No" />
                      </select>
                      <p className="help-block text-danger"></p>
                    </div>
                    <div className="form-group">
                      <label style={{ width: "100%" }}>
                        Is Non-Vegetarian
                        <input type="dropdown" className="form-control" />
                      </label>
                      <select
                        value={values.nonVeg}
                        id="nonVeg"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      >
                        <option value="Yes" label="Yes" />
                        <option value="No" label="No" />
                      </select>
                      <p className="help-block text-danger"></p>
                    </div>
                    <div className="form-group">
                      <label style={{ width: "100%" }}>
                        Is Vegan
                        <input type="dropdown" className="form-control" />
                      </label>
                      <select
                        value={values.vegan}
                        id="vegan"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      >
                        <option value="Yes" label="Yes" />
                        <option value="No" label="No" />
                      </select>
                      <p className="help-block text-danger"></p>
                    </div>
                    <div className="form-group">
                      <label style={{ width: "100%" }}>
                        Category{" "}
                        <input type="dropdown" className="form-control" />
                      </label>
                      <select
                        name="categoryId"
                        value={values.categoryId}
                        id="categogyId"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      >
                        <option value="Apetizer" label="Apetizer" />
                        <option value="Salad" label="Salad" />
                        <option value="Main course" label="Main course" />
                        <option value="Desert" label="Desert" />
                        <option value="Beverage" label="Beverage" />
                      </select>
                      <p className="help-block text-danger"></p>
                    </div>
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
  ) : (
    <h1></h1>
  );
};

export default Editdish;
