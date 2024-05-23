import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { baseUrl } from '../../baseurl/BaseUrl'
import axios from 'axios'

export default function AllOrders() {
  const [allOrdersDetails, setAllOrdersDetails] = useState([])
  async function allOrders() {
    let data = await axios.get(`${baseUrl}/api/v1/orders/user/6444473c0683670033f3dc98`)
    console.log(data, 'from order details');
    if (data.status == 200) {
      console.log(data, 'HELLLLLLLLO');
      setAllOrdersDetails(data.data)
    }


  }
  useEffect(() => { allOrders() }, [])


  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Order Details</title>
    </Helmet>
    <div className="container my-5">
      <div className="bg-main-light p-5">

        <div>
          <h3 className='border-bottom w-25 border-success'>All Orders Details:- </h3>
          {allOrdersDetails.map((item) => <div className='my-4'><h4>Order Number: {item?.id}</h4><h5 className='text-center text-main my-3'>Payment method type: {item?.paymentMethodType}</h5>
            <p className='text-center text-main my-3'>Total Order Price: {item?.totalOrderPrice} EGP</p>
            {item?.cartItems?.map((order, index) => <div key={index} className='row align-items-center mb-3'>

              <div className="col-md-2">
                <img src={order?.product?.imageCover} className='w-100' alt="" />
              </div>

              <div className="col-md-10">
                <h4 className='h5 text-main'>{order?.product?.title}</h4>
                <p>price: <span className='text-main'>{order?.price}</span>  EGP</p>

              </div>
              
            </div>)}




          <hr className='mt-5' /></div>)}



        </div></div>

    </div>
  </>
}
