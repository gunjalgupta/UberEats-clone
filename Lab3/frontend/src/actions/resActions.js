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
export function addingToken(payload) {
    return {
        type: "ADDING_TOKEN",
        payload
    }
}

export function removeToken() {
    return {
        type: "REMOVE_TOKEN"
    }
}