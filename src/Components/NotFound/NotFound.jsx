import React from 'react'
import styles from './NotFound.module.css'
import notfound from '../../assets/images/error.svg'
export default function NotFound() {
  return (
    <>
    <div className="container mx-auto my-5 d-flex justify-content-center align-items-center ">
    
    <img className='w-50' src={notfound} alt="" />
   
    </div>
    </>
  )
}
