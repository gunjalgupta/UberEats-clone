export function registerRestaurant(payload){
    return {
        type: "REGISTER_RESTAURANT",
        payload
    }
}

export function loginRestaurant(payload){
    return {
        type: "LOGIN_RESTAURANT",
        payload
    }
}

export function logoutRestaurant(){
    return {
        type:"LOGOUT_RESTAURANT"
    }
}