import React, { useContext } from 'react'
import styles from './Navbar.module.css'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.svg'
import { CartContext } from '../../Context/CartContext'

export default function Navbar({ userData, logOut }) {
  let { numOfCartItems } = useContext(CartContext)
  return <>
    <nav className="navbar navbar-expand-lg border-main shadow-sm text-main fixed-top bg-light ">
      <div className="container">
        <a className="navbar-brand" href="#"><img src={logo} alt="" /></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarSupportedContent">

          {userData ?
            <ul className="navbar-nav  mb-2 mb-lg-0"><li className="nav-item"><Link className="nav-link" to=''>Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to='products'>Products</Link></li>
            </ul> : ''}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className='mx-2'><i className='cursor-pointer fas fa-brands fa-facebook-f'></i></li>
            <li className='mx-2'><i className='cursor-pointer fas fa-brands fa-twitter'></i></li>
            <li className='mx-2'><i className='cursor-pointer fas fa-brands fa-instagram'></i></li>
            <li className='mx-2'><i className='cursor-pointer fas fa-brands fa-youtube'></i></li>
          </ul>

          <ul className="navbar-nav mb-2 mb-lg-0">
            {userData ? <>
              <li className="nav-item"><Link className="nav-link position-relative" to='wishlist'><i className='fa-regular fa-heart fa-lg text-secondary'></i></Link></li>
              <li className="nav-item"><Link className="nav-link position-relative" to='cart'><i className='fa fa-shopping-cart fa-lg text-secondary'></i>
                <div className='badge position-absolute bg-main top-0 end-0 rounded rounded-circle font-sm'>{numOfCartItems}</div></Link></li>
              <li className="nav-item mx-2"><span className="nav-link cursor-pointer" onClick={logOut}>LogOut</span></li>
            </> : <>
              <li className="nav-item"><Link className="nav-link" to='login'>Login</Link></li>
              <li className="nav-item"><Link className="nav-link" to='register'>Register</Link></li>
            </>}

          </ul>
        </div>
      </div>
    </nav >


  </>

}
