const initialState = {
    order:{},
}

const reducer = (state= initialState, action)=>{

    switch(action.type){
        case "ADD_ORDER":
            console.log("Added to order");
            return {...state, order :action.payload };
     
        case "PLACE_ORDER":
            console.log("Order placed")
            return{...state, order:null}
        default:
            return state;

    }
}
export default reducer;