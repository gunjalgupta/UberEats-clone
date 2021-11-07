const initialState = {
    cart:[],
}

const reducer = (state= initialState, action)=>{

    switch(action.type){
        case "ADD_CART":
            console.log("Added to cart");
            return {...state, cart : [...state.cart ,action.payload] };
        
        case "REMOVE_CART":
            console.log("Removed to cart")
            return{...state, cart:[...state.cart ,action.payload]}
        case "ORDER_PLACED":
            console.log("Order placed")
            return{...state, cart: []}
        default:
            return state;

    }
}
export default reducer;