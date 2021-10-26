const initialState = {
    restaurant:{},
}

const reducer = (state= initialState, action)=>{

    switch(action.type){
        case "REGISTER_RESTAURANT":
            console.log("Signup succesful");
            return {...state, restaurant : action.payload}
        case "LOGIN_RESTAURANT":
            console.log("login succesful");
            return {...state, restaurant : action.payload}
        case "LOGOUT_RESTAURANT":
            console.log("logout successful")
            return{...state, restaurant:null}
        default:
            return state;

    }
}
export default reducer;