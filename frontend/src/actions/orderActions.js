export function addOrder(payload){
    return {
        type: "ADD_ORDER",
        payload
    }
}


export function placeOrder(){
    return {
        type:"PLACE_ORDER"
    }
}