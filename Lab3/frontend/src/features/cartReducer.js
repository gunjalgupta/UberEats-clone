const initialState = {
    cart:[],
}

const reducer = (state= initialState, action)=>{

    switch(action.type){
        case "ADD_CART":
            console.log("Added to cart");
            return {...state, cart : [...state.cart ,action.payload] };
        
        case "REMOVE_CART":
            //console.log("Removed to cart")
            //return{...state, cart:[...state.cart ,action.payload]}

            let newCart = [...state.cart];
            const index = state.cart.findIndex(
                (basketItem) => basketItem.cartId === action.id.id);
            if(index >= 0) {
                newCart.splice(index,1);
            } else {
                console.log("Can't remove the product");
            }
            return {...state, cart:newCart};

        case "ORDER_PLACED":
            console.log("Order placed")
            return{...state, cart: []}
        default:
            return state;

    }
}
export default reducer;