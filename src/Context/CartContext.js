import axios from "axios";
import { baseUrl } from "../baseurl/BaseUrl";

import { createContext, useEffect, useState } from "react";


export let CartContext = createContext(0);
let headers = { token: localStorage.getItem('userToken') }

export default function CartContextProvider(props) {
    // cart creation calls cart api and uses token in headers and product id
    //hst5dmha f 2:1-products,2- productDetails
    function createCart(productId) {
        return axios.post(`${baseUrl}/api/v1/cart`,
            { productId: productId },
            {
                headers
            })
            .then(res => res)
            .catch(err => err)

    }
    useEffect(() => {
        getCartFirst()
    }, [])
    const [numOfCartItems, setNumOfCartItems] = useState()
    const [cartId, setcartId] = useState()

    async function getCartFirst() {
        let data = await getCart()
        console.log(data, 'from getCartFirst');
        if (data.status == 200) {
            setNumOfCartItems(data.data.numOfCartItems);
            setcartId(data.data.data._id);
        }
    }
    function getCart() {
        return axios.get(`${baseUrl}/api/v1/cart`,
            {
                headers
            })
            .then(res => res)
            .catch(err => err)

    }
    function updateCart(id, count) {
        return axios.put(`${baseUrl}/api/v1/cart/${id}`, { count },
            {
                headers
            })
            .then(res => res)
            .catch(err => err)

    }
    function removeCartItem(id) {
        return axios.delete(`${baseUrl}/api/v1/cart/${id}`,
            {
                headers
            })
            .then(res => res)
            .catch(err => err)

    }
    function generateOnlinePayment(cartId, shippingAddress) {
        return axios.post(`${baseUrl}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
            { shippingAddress: shippingAddress },
            {
                headers
            })
            .then(res => res)
            .catch(err => err)
    }
    function clearCart() {
        return axios.delete(`${baseUrl}/api/v1/cart`,
            {
                headers
            })
            .then(res => res)
            .catch(err => err)

    }
    const [cart, setCart] = useState(0)

    return <CartContext.Provider value={{ numOfCartItems, cartId, setNumOfCartItems, generateOnlinePayment, cart, createCart, getCart, updateCart, removeCartItem, clearCart }}>
        {props.children}</CartContext.Provider>




}
