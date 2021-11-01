import React ,{useState} from 'react' 
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom'

 

function Resdishes({id, dname, des, ing, imageKey , price, func}) {

  const [dishes, setDishes] = useState([])
  const history= useHistory();


    return (
        <div className = 'dishcard' sx={{ display: 'flex' }}>
            <Card class Name=  "root" sx={{ display: 'flex' }} >
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                     {dname}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            
            <br/>
            Ingredients: {ing} 
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
              Price ${price}
        </Box>
      </Box>
      {imageKey && 
      <CardMedia className= "media"
        component="img"
        sx={{ width: 151 }}
        image={`/imageRestaurant/api/images/${imageKey}`}
        alt="Live from space album cover"
      />}
      <CardActions>
     
        <Button size="small"onClick={() => {
          localStorage.setItem('dishId',JSON.stringify(id))
          history.push(`/editdish/${id}`);}
          } >Edit</Button>
        <Button size="small" onClick= {() => func(id)}>Delete</Button>
      </CardActions>
    </Card>
        </div>
    )
}

export default Resdishes;