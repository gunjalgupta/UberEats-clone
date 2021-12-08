export function register(payload){
    return {
        type: "REGISTER",
        payload
    }
}
export function login(payload){
    return {
        type: "LOGIN",
        payload
    }
}

export function logout(){
    return {
        type:"LOGOUT"
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