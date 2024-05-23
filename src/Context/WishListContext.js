import { createContext } from "react";
import { baseUrl } from "../baseurl/BaseUrl";
import axios from "axios";
let headers = { token: localStorage.getItem('userToken') }



export let WishContext = createContext(0);


export default function WishContextProvider(props) {

    function Createwishlist() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {headers})
            .then(res => console.log(res))
           
            .catch(err => console.log(err))
    }



    <WishContext.Provider value={{Createwishlist}}>{props.children}</WishContext.Provider>
}