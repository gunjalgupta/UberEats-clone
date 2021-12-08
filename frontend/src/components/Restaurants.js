import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useHistory } from "react-router-dom";
import "../customer/Restaurant.css";
import axios from "axios";
import { useSelector} from "react-redux";


const Restaurants = ({ Name, Opens_at, imageKey, id ,desc}) => {
  const history = useHistory();
  const [icon, seticon] = useState([false]);
  const user = useSelector((state) => state.user);
  const [favrestaurants, setRestaurants] = useState([]);

  function addfav() {
    seticon(true);
    const Req = {
      customerId: user.user.customerId,
      restaurantId: id,
    };
    console.log(Req);
    axios
      .post("/customer/api/addfav", Req, )

      .then((responseData) => {
        console.log("add", responseData);
        if (responseData.data.error) {
          console.log("res", responseData);
          //M.toast({ html: responseData.data.error, classes: "#c62828 red darken-3" })
        }
      });
  }

  function deletefav() {
    seticon(false);
    const Req = {
      customerId: user.user.customerId,
      restaurantId: id,
    };
    console.log(Req);
    axios
      .post("/customer/api/deletefav", Req, )

      .then((responseData) => {
        console.log("del", responseData);
        if (responseData.data.error) {
          console.log("res", responseData);
          //M.toast({ html: responseData.data.error, classes: "#c62828 red darken-3" })
        }
      });
  }

  useEffect(() => {
    const req = {
      customerId: user.user.customerId,
      restaurantId: id,
    };
    console.log(id);
    console.log(req);
    axios
      .post("/customer/api/checkfav", req,)
      .then((response) => {
        console.log("res", response);
        if (response.data === "success") {
          console.log("res", response);
          // M.toast({ html: response.data.error, classes: "#c62828 red darken-3" })
          seticon(true);
        } else {
          console.log(response.data);
          //setRestaurants(response.data)
          //console.log("resss ",customerData);
          //M.toast({ html: response.data.error, classes: "#c62828 red darken-3" })
          seticon(false);
        }
      });
  }, []);

  // if(favrestaurants.restaurantId===id){
  //   seticon(true)
  // }
  // else {seticon(false)}

  return (
    <div style={{
      width: '100%',
      height: '100%',
    }}>
      <Card className="cardd_res" style={{
        height: '100%'
      }}>
        <CardHeader title={Name}/>
        {imageKey && (
          <CardMedia
            onClick={() => history.push(`/resprofile/${id}`)}
            component="img"
            height="194"
            image={`/imageRestaurant/api/images/${imageKey}`}
            alt="Paella dish"
          />
        )}

        <CardContent>
        <Typography variant="body2" color="text.secondary">
            Opens at: {Opens_at}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            {desc}
          </Typography> */}
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <div>
              {icon ? (
                <span
                  onClick={() => {
                    deletefav();
                  }}
                >
                  {" "}
                  <FavoriteIcon />{" "}
                </span>
              ) : (
                <span
                  onClick={() => {
                    addfav();
                  }}
                >
                  {" "}
                  <FavoriteBorderIcon />{" "}
                </span>
              )}
            </div>
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};

export default Restaurants;
