import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../baseurl/BaseUrl';
import { Helmet } from 'react-helmet';

export default function Categories() {
const [categories, setcategories] = useState([])
    function getAllCategories(){
        axios.get(`${baseUrl}/api/v1/categories/6407ea3d5bbc6e43516931df/subcategories`).then((data)=>{
        if(categories!==null||categories!==undefined){
         console.log(data.data.data,'subcategories');
         setcategories(data.data.data)
        }
       
       })
       .catch((err)=>{if(err.response.status === 409){
         console.log(err);
       }})
     }

     useEffect( () => {
        getAllCategories()}, [])
      
      
      

  return<><Helmet>
  <meta charSet="utf-8" />
  <title>Categories</title>
</Helmet>
<div className="container">
    <div className="row">
       {categories.map((category)=><div key={category._id} className='col-md-2'>
        <img src={category.image} className='w-100' alt="" />
       </div>
       )}
    </div>
</div>



</>

}
