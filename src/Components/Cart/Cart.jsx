import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext'
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { Triangle } from 'react-loader-spinner';

export default function Cart() {
  const [isLoading, setIsLoading] = useState(true)
  const [cartDetails, setcartDetails] = useState({})
  let { getCart, updateCart, removeCartItem, clearCart,setNumOfCartItems } = useContext(CartContext);

  async function getCartDetails() {
    setIsLoading(true)
    let data = await getCart()
    console.log(data, 'from cart');
    setcartDetails(data.data)
    setIsLoading(false)
  }
  async function updateCartDetails(id, count) {
    setIsLoading(true)
    let data = await updateCart(id, count)
    console.log(data, 'updatecart');
    setcartDetails(data.data)
    setIsLoading(false)

  }
  async function deleteCartDetails(id) {
    setIsLoading(true)

    let data = await removeCartItem(id)
    console.log(data, 'deletecart');
    setcartDetails(data.data)
    setNumOfCartItems(data.data.numOfCartItems)
    setIsLoading(false)


  }
  async function clearCartDetails() {
    setIsLoading(true)
    let data = await clearCart()
    console.log(data, 'clearcart');
    setcartDetails(data.data)
    setIsLoading(false)

  }


  useEffect(() => {
    getCartDetails()
  }, [])

  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Cart</title>
    </Helmet>
    {isLoading? <div className='d-flex justify-content-center align-items-center vh-100 text-center w-100 mx-auto' style={{ translate: '120px' }}>
      <Triangle height="30%" width="30%" color="#0aad0a" ariaLabel="triangle-loading" wrapperClass='' visible={true} /></div>
     : <div className="container my-5">
      <div className="bg-main-light p-5">
        <div>
          <h3>Cart Details:- </h3>
          <h4 className='mb-4 text-end'>Total price : <span className='text-main'>{cartDetails?.data?.totalCartPrice}</span>  |  <button onClick={() => clearCartDetails()} className='btn btn-outline-danger'>clear Cart</button>
          </h4>
          {cartDetails?.data?.products.map((product, index) => <div key={index} className='row mb-2 pb-2 border-bottom'>
            <div className="col-md-1 ">
              <img src={product.product.imageCover} className='w-100' alt="" />
            </div>
            <div className="col-md-11 d-flex justify-content-between align-items-center">
              <div>
                <h4 className='h5 text-main'>{product.product.title}</h4>
                <p>price: {product.price} EGP</p>
                <div onClick={() => deleteCartDetails(product.product.id)} className='d-flex align-items-center'>
                  <button className='btn btn-sm border-outline-danger'>
                    <i className="fa-solid fa-trash-can text-danger fs-6"></i>
                  </button>
                  <p className='ps-2 text-danger cursor-pointer' style={{ translate: '0 9px' }}>Remove</p>
                </div>


              </div>
              <div className='d-flex align-items-center justify-content-evenly'>
                <button className='btn btn-sm border border-outline-main' onClick={() => updateCartDetails(product.product.id, product.count + 1)}>+</button>
                <p className='font-sm px-2' style={{ translate: '0 9px' }}>{product.count}</p>
                {product.count === 0 ? <button disabled className='btn btn-sm border border-outline-danger' onClick={() => updateCartDetails(product.product.id, product.count - 1)}>-</button> : <button className='btn btn-sm border border-outline-danger' onClick={() => updateCartDetails(product.product.id, product.count - 1)}>-</button>}
              </div>
            </div>
          </div>

          )}



          <Link to={'/checkout'} className='btn border-outline-main text-main mt-4'>Proceed To Payment</Link>
        </div></div>
    </div>}
   



  </>
}
