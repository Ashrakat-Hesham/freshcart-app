import React, { useContext, useEffect, useState } from 'react'
import styles from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import { baseUrl } from '../../baseurl/BaseUrl';
import axios from 'axios';
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { Triangle } from 'react-loader-spinner'


export default function ProductDetails({isLoading,setIsLoading}) {

  let { setNumOfCartItems } = useContext(CartContext)
  const notify = (msg, type) => { return toast[type](msg) };

  let { createCart } = useContext(CartContext)
  let { id } = useParams()
  console.log(id);
  const [productDetails, setProductDetails] = useState({})
  async function getAllproductDetails() {
    setIsLoading(true)
    await axios.get(`${baseUrl}/api/v1/products/${id}`).then((data) => {
      if (productDetails !== null && productDetails !== undefined) {
        console.log(data.data.data, 'productDetails');
        setProductDetails(data.data.data)
        setIsLoading(false)

      }
    })
      .catch((err) => {
        if (err.response.status === 409 || err.response.status === 400) {
          console.log(err);
        }
      })
  }
  useEffect(() => {
    getAllproductDetails()
  }, [])
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,

  };
  let y = localStorage.getItem('userToken')
  console.log(y);
  return <>

    <Helmet>
      <meta charSet="utf-8" />
      <title>Product Details</title>
    </Helmet>
    {isLoading?<div className='d-flex justify-content-center align-items-center vh-100 text-center w-100 mx-auto' style={{translate:'120px'}}>
      <Triangle height="30%" width="30%" color="#0aad0a" ariaLabel="triangle-loading" wrapperClass='' visible={true}/></div>
      : <>{productDetails && <div className="container py-3">
        <div className="row align-items-center">

          <div className="col-md-4">
            <Slider {...settings}>

              {productDetails?.images?.map((img, index) => <div key={index}>
                <img src={img} className='w-100' alt="" />
              </div>)}

            </Slider>
          </div>
          <div className="col-md-8">
            <h1 className='text-main'>{productDetails?.category?.name}</h1>
            <h6 className='my-4'>{productDetails?.brand?.name}</h6>
            <h4 className='mb-5'>{productDetails.description}</h4>

            <div className=" d-flex text-dark justify-content-between my-4 align-items-center">
              {productDetails.priceAfterDiscount ? [<span className='p-2 rounded discountTag'>Sale : {productDetails.priceAfterDiscount}</span>] : <span className='priceTag p-2 rounded'>price : {productDetails.price}</span>}
              <p><i className="mt-3 fa-solid fa-star rating-color"></i>{productDetails.ratingsAverage}</p>
            </div>
            <button onClick={() => createCart(id)} className='btn bg-main text-white w-100'>Add To Cart</button>
          </div>
        </div>
      </div>
      }</>}

  </>
}
