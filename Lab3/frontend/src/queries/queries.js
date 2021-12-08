import {gql} from 'apollo-boost';

const Cusloginn = gql`
query Cuslogin($email: String, $pwd: String){
        Cuslogin(email: $email, email: $email){
            result
            userData{
                cname
                email
              }
        }
    }`

const Resloginn = gql`
query Reslogin($email: String, $pwd: String){
        Reslogin(email: $email, email: $email){
            result
            userData{
                cname
                email
              }
        }
    }`

    const CustomerDetails = gql`
    query CustomerDetails($email: String){
        CustomerDetails(email: $email){
            cname
            email
            about
            country
            city
            state
            mobileNo
            profilepic
            DOB
            nickname
        }
    }
`
const RestaurantDetails = gql`
query RestaurantDetails($email: String){
    RestaurantDetails(email: $email){
        rname
        email
        rdesc
        country
        city
        state
        mobileNo
        profilepic
        fromTime
        toTime
        delivery
        pickup
        veg
        nonVeg
        vegan
    }
}
`
const getDish = gql`
query getDish($email: String){
    getDish(dishId : $dishId){
        dname
        ddesc
        profilepic
        veg
        nonVeg
        vegan
        cuisine 
        category
        restaurantId
        price
        ingredients
    }
}
`
const getOrder = gql`
query getOrder($customerId: int){
    getOrder(customerId : $customerId){
        customerId
        restaurantId
        invoiceId
        total
        ostatus
        mode
        rname
        address
    }
}
`
const getOrderdetails = gql`
query getOrderdetails($customerId: int){
    getOrderdetails(customerId : $customerId){
        price
        invoiceId
        quantity
        dishId
        dname
        subtotal
    }
}
`

    export {Cusloginn,Resloginn,RestaurantDetails, CustomerDetails ,getDish ,getOrder ,getOrderdetails};