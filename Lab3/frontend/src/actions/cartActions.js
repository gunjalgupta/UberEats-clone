export function addCart(payload){
    return {
        type: "ADD_CART",
        payload
    }
}

export function removeCart(id){
    return {
        type: "REMOVE_CART",
        id
    }
}

export function orderPlaced(){
    return {
        type:"ORDER_PLACED"
    }
}