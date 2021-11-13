const initialState = {
    user:{},
    token: "",
}

const reducer = (state= initialState, action)=>{

    switch(action.type){
        case "REGISTER":
            console.log("Signup succesful");
            return {...state, user: action.payload}
        case "LOGIN":
            console.log("login succesful");
            return {...state, user: action.payload}
        case "LOGOUT":
            console.log("logout successful")
            return{...state, user:null}
        case "ADDING_TOKEN" :
            return { ...state,token: action.payload};
        case "REMOVE_TOKEN" :
            return { ...state,token:""};
        default:
            return state;

    }
}
export default reducer;