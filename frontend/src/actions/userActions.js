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