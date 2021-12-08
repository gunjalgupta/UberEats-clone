import {gql} from 'apollo-boost';
import { useQuery } from "@apollo/react-hooks"

const loginn = gql`
query Cuslogin($email: String, $pwd: String){
        login(email: $email, email: $email){
            result
            userData{
                Username
                Email
                FirstName
                LastName
                Aboutme
              Country
              City
              Gender
              Hometown
              School
              Company
              Language
              PhoneNumber
              Accounttype
              }
        }
    }`


    export {loginn, };