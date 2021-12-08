// import React, {useState, useEffect} from 'react';
// import { useDispatch,useSelector } from 'react-redux';
// import { addingDetails } from '../features/detailsSlice';
// import { selectUser } from '../features/userReducer';
// import axios from 'axios';
// import {useHistory} from 'react-router-dom';
// import Dheader from './Dheader.js';
// import './Details.css'
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';

// const Details = () => {
//     const history = useHistory();
//     const dispatch = useDispatch();
//     const [mobileNo, setMobileNo] = useState();
//     const [DOB, setDOB] = useState()
//     const [about, setAbout] = useState()
//     const [nickname, setNickname] = useState()
//     const [key, setKey] = useState()
//     const user = useSelector((state) => state.user);
//     console.log(user.user.customerId)
//     useEffect(() => {
//         const getkey = async () => {
//             try{
//                 console.log("useeffect",user.user.customerId);
//                 const cusId = {
//                     customerId : user.user.customerId
//                 }
//                 const res = await axios.post("http://localhost:8080/key", cusId)
//                 setKey(res.data.key)
//             }catch(err){
//                 console.log(err)
//             }
//         } 
//         getkey()
//     }, [])
//     async function updatingDetails(event) {
//         event.preventDefault();
//         try {
//             const sendDetails = {
//                 cname : user.user.name,
//                 email : user.user.email,
//                 DOB,
//                 nickname,
//                 mobileNo,
//                 customerId : user.user.customerId,
//                 about
//             }
//             console.log("try", sendDetails)
            
//             const response = await axios.post("http://localhost:8080/updateDetails",sendDetails)
//             console.log("response", response);
//         }catch(err) {
//             console.log(err);
//             console.log("incatch");
//         }
//     }

//     function profilepic() {
//         history.push("/profilepic")
//     }
   
//     return (
//         <div>
//         <Dheader />
//         <div className="details">
//             <div className="details_title">
//                 <h1>Name</h1>
//                 <Box
//                 component="form"
//                 sx={{
//                     '& .MuiTextField-root': { m: 1, width: '25ch' },
//                  }}
//                 noValidate
//                  autoComplete="off"
//                 >
//                     <div className="details_input">
//                     <TextField
//                         id="filled-password-input"
//                         label="Enter mobile Number"
//                         type="text"
//                         autoComplete="current-mobile-number"
//                         variant="filled"
//                         value={mobileNo}
//                         onChange={(e) => setMobileNo(e.target.value)}
//                     />
//                     <TextField
//                         id="filled-password-input"
//                         label="Date of birth"
//                         type="text"
//                         autoComplete="current-DOB"
//                         variant="filled"
//                         value={DOB}
//                         onChange={(e) => setDOB(e.target.value)}
//                     />
//                     <TextField
//                         id="filled-password-input"
//                         label="NickName"
//                         type="text"
//                         autoComplete="current-password"
//                         variant="filled"
//                         value={nickname}
//                         onChange={(e) => setNickname(e.target.value)}
//                     />
//                     <TextField
//                         id="filled-multiline-static"
//                         label="About"
//                         multiline
//                         rows={4}
//                         variant="filled"
//                         value={about}
//                         onChange={(e) => setAbout(e.target.value)}
//                     />
//                     </div>
//                 </Box>
               
//             </div>
//       <Button variant="contained">Save Changes</Button>
//         <button placeholder="enter profile pic " onClick={profilepic}>Update profile pic</button>
//         <p>{key}</p>
//         <img src={`http://localhost:8080/images/${key}`}></img>
//         </div>
//     </div>
//     )
// }


// export default Details;