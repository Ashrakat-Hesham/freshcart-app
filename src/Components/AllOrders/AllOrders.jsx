import React, { useEffect, useState } from 'react'
import styles from './AllOrders.module.css'
import { Helmet } from 'react-helmet'
import { baseUrl } from '../../baseurl/BaseUrl'
import axios from 'axios'
import { Link, NavLink, Navigate, useNavigate } from 'react-router-dom'

export default function AllOrders() {
  let navigate=useNavigate()
  const [ordersDetails, setOrdersDetails] = useState([])
  async function Orders() {
    let { data } = await axios.get(`${baseUrl}/api/v1/orders/user/6444473c0683670033f3dc98`)
    console.log(data, 'allOrders');
    setOrdersDetails(data)
  }

  function navigateTo(){
   navigate('/orderdetails')
  }
  useEffect(() => { Orders() }, [])
  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>All Orders</title>
    </Helmet>
    <div className="container my-5">
      <div className="bg-main-light p-5">

        {ordersDetails?.map((order,index) => <div key={index} className='row border-bottom align-items-center'>
          
          <div className="col-md-6 ">
            <h4>Total Price: <span className='text-main'>{order?.totalOrderPrice}</span></h4>
            <h5>Payment Method Type: {order?.paymentMethodType}</h5>
            </div>
            <div className='col-md-6 text-center mt-3'>
          <h5 className='text-main mb-4'>Address Details </h5>
          <p>City: <span className='text-main'>{order.shippingAddress?.city}</span></p>
          <p>Details: <span className='text-main'>{order.shippingAddress?.details}</span></p>
          <p>Phone:<span className='text-main'> {order.shippingAddress?.phone}</span></p>
          </div>

        </div>
        )}
                 <button className='btn w-100 border btn-outline-success my-4' onClick={()=>navigateTo()}>orderDetails</button>

          <h5 className='text-main text-center mt-3 fw-bold'>We are happy to serve you again <i className="fa-regular fa-face-smile-beam"></i> </h5>
        
      </div></div>
  </>
}