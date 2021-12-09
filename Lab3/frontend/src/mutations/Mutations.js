  import {gql} from 'apollo-boost';

const registerUser = gql `
    mutation registerUser( $email: String, $password: String, $cname: String){
        registerUser( email: $email, password: $password, cname: $cname){
            cname
            email,
            password,
            
        }
    }
`;

const registerRestaurant = gql `
    mutation registerUser( $email: String, $password: String, $rname: String){
        registerUser(email: $email, password: $password, rname: $rname){
            email,
            password,
            rname
        }
    }
`;

const updateUser = gql `
  mutation updateUser($customerId: int, $cname: String, $phone: String, $country: String, $city: ID, $state: String, $about: String, $profilepic: String
  ) {
    updateUser(
        customerId: $customerId
        cname: $cname
      last_name: $last_name
      phone: $phone
      city: $city
      state: $state
      country: $country
      about: $about
      profilepic: $profilepic
    ) {
        cname
      last_name
      phone
      city
      state
      country
      about
      profilepic
    }
  }
`;
const addOrder = gql `
  mutation addOrder($customerId: int, $restaurantId: int, $invoiceId: String, $total: int, $ostatus: String
  ) {
    updateUser(
        customerId: $customerId
        cname: $cname
        restaurantId: $restaurantId
        invoiceId: $invoiceId
        total: $total
        ostatus: $ostatus
    ) {
        customerId 
        cname 
        restaurantId 
        invoiceId
        ostatus
    }
  }
`;

const addOrderDetails = gql `
  mutation addOrderDetails($invoiceId: String, $subtotal: int, $quantity: int, $price: int, $dishId: int
  ) {
    updateUser(
        subtotal: $subtotal
        dishId: $dishId
        price: $price
        invoiceId: $invoiceId
        dishId: $dishId
    ) {
        subtotal 
        dishId 
        price 
        invoiceId 
        dishId 
    }
  }
`;
export { registerUser, addOrderDetails, addOrder, updateUser, registerRestaurant}; 