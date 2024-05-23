import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import { baseUrl } from '../../baseurl/BaseUrl'
import axios from 'axios';
import { Triangle } from 'react-loader-spinner';

export default function CategorySlider() {
    const [isLoading, setIsLoading] = useState(true)

    const [categories, setcategories] = useState([])
    async function getAllCategories() {
        setIsLoading(true)
        let data = await axios.get(`${baseUrl}/api/v1/categories`)
        if (categories !== null || categories !== undefined) {
            console.log(data.data.data);

            setcategories(data.data.data)
            setIsLoading(false)
        }


        else if (data.response.status === 409) {
            console.log(data.response.status);
        }


    }
    useEffect(() => {
        getAllCategories()
    }, [])


    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,

    };
    return <>
{isLoading?<div className='d-flex justify-content-center align-items-center vh-100 text-center w-100 mx-auto' style={{ translate: '120px' }}>
      <Triangle height="30%" width="30%" color="#0aad0a" ariaLabel="triangle-loading" wrapperClass='' visible={true} /></div>
      :<div className="container pt-5">
            <div className='my-5'>
                <h2 className='text-main'>Shop Popular Categories</h2>
                <Slider {...settings}>

                    {categories.map((category, index) => <div key={index}>
                        <img src={category.image} className='w-100' height={'300px'} alt="" />
                        <h3 className='h6 text-center'>{category.name.split(' ').splice(0, 2).join(' ')}</h3>
                    </div>)}

                </Slider></div>
        </div>}
        

    </>
}
