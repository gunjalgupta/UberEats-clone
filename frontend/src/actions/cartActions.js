export function addCart(payload){
    return {
        type: "ADD_CART",
        payload
    }
}

export function removeCart(payload){
    return {
        type: "REMOVE_CART",
        payload
    }
}

export function orderPlaced(){
    return {
        type:"ORDER_PLACED"
    }
}