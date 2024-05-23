import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../../baseurl/BaseUrl'
import { Link } from 'react-router-dom'
import './Products.css'
import { CartContext } from '../../Context/CartContext'

import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet'
import { Triangle } from 'react-loader-spinner'

export default function Products() {
  const [isLoading, setIsLoading] = useState(true)

  let { createCart, setNumOfCartItems } = useContext(CartContext)
  const notify = (msg, type) => { return toast[type](msg) };

  const [products, setProducts] = useState([])

  async function generateCart(productId) {
    setIsLoading(true)

    let data = await createCart(productId)
    console.log(data, 'hello');
    if (data.data.status) {
      console.log('Hello', data);
      notify(data.data.message, 'success')
      setNumOfCartItems(data.data.numOfCartItems)
      setIsLoading(false)
    }

    else if (data.data.status === 'fail') {
      notify(data.data.message, 'error')
    }
  }
  function getAllProducts() {
    setIsLoading(true)
    axios.get(`${baseUrl}/api/v1/products`).then((data) => {

      if (products !== null || products !== undefined) {
        console.log(data.data.data);
        setProducts(data.data.data)
        setIsLoading(false)
      }
    })
      .catch((err) => {
        if (err.response.status === 409) {
          console.log(err);
        }
      })
  }
  useEffect(() => {
    getAllProducts()
  }, [])



  return <>
    {isLoading ? <div className='d-flex justify-content-center align-items-center vh-100 text-center w-100 mx-auto' style={{ translate: '120px' }}>
      <Triangle height="30%" width="30%" color="#0aad0a" ariaLabel="triangle-loading" wrapperClass='' visible={true} /></div>
      :
      <>  {products && <div className="container my-5">
        <div className="row pt-5">
          {products?.map((item) => <div key={item.id} className='col-md-2 my-2 products'>

            <Link className='text-decoration-none' to={'/product-details/' + item.id}>
              <img className='w-100' src={item.imageCover} alt="" />
              <h4 className='text-main text-center my-3'>{item.category.name}</h4>
              <h3 className='fw-bold text-dark h6'>{item.title.split(' ').slice(0, 2).join(' ')}</h3>
              <div className=" d-flex text-dark justify-content-between my-4 align-items-center">
                {item.priceAfterDiscount ? [<span className='p-2 rounded discountTag'>Sale : {item.priceAfterDiscount}</span>] : <span className='priceTag p-2 rounded'>price : {item.price}</span>}
                <p><i className="mt-3 fa-solid fa-star rating-color"></i>{item.ratingsAverage}</p>
              </div>
            </Link>
            <button onClick={() => generateCart(item.id)} className='btn bg-main text-white w-100'>Add To Cart</button>
          </div>
          )}
        </div>
      </div>}</>}
  </>
}
