import React from 'react'
import styles from './LayOut.module.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet ,useNavigate} from 'react-router-dom'

export default function LayOut({userData,setUserData}) {
  let navigate=useNavigate()
  function logOut(){
    localStorage.removeItem('userToken');
    setUserData(null)
   navigate('/login')
  }
  return (
    <>
      <Navbar logOut={logOut} userData={userData} />
      <Outlet />
      {/* <Footer /> */}


    </>
  )
}
