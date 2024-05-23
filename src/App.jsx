import logo from './logo.svg';
import Brands from './Components/Brands/Brands';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LayOut from './Components/LayOut/LayOut';
import Home from './Components/Home/Home';
import LogIn from './Components/LogIn/LogIn';
import Register from './Components/Register/Register';
import Products from './Components/Products/Products';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import MainSlider from './Components/MainSlider/MainSlider';
import NotFound from './Components/NotFound/NotFound';
import Cart from './Components/Cart/Cart';
import styles from './App.css'
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import LogOut from './Components/LogOut/LogOut';
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SpinnerDotted } from 'spinners-react';
import { Offline, Online } from "react-detect-offline";
import Categories from './Components/Categories/Categories';
import CheckOut from './Components/CheckOut/CheckOut';
import './App.css';
import AllOrders from './Components/AllOrders/AllOrders';
import OrderDetails from './Components/OrderDetails/OrderDetails';
// import Wishlist from './Components/Wishlist/Wishlist';
import CartContextProvider from './Context/CartContext';
import WishContextProvider from './Context/WishListContext';



function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      saveUserData()
    }
  }, [])


  function saveUserData() {
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(encodedToken)
    console.log(decodedToken);
    setUserData(decodedToken)
  }


  const routes = createBrowserRouter([{
    path: '',
    element: <LayOut userData={userData} setUserData={setUserData} />,
    children: [
      { index: true, element: <ProtectedRoutes><Home setIsLoading={setIsLoading} isLoading={isLoading} /></ProtectedRoutes> },
      { path: 'home', element: <ProtectedRoutes><Home setIsLoading={setIsLoading} isLoading={isLoading} /></ProtectedRoutes> },
      { path: 'login', element: <LogIn saveUserData={saveUserData} /> },
      { path: 'register', element: <Register /> },
      { path: 'products', element: <ProtectedRoutes><Products setIsLoading={setIsLoading} isLoading={isLoading} /></ProtectedRoutes> },
      { path: 'product-details/:id', element: <ProtectedRoutes><ProductDetails setIsLoading={setIsLoading} isLoading={isLoading} /></ProtectedRoutes> },
      { path: 'brands', element: <ProtectedRoutes><Brands setIsLoading={setIsLoading} isLoading={isLoading} /></ProtectedRoutes> },
      { path: 'checkout', element: <ProtectedRoutes><CheckOut setIsLoading={setIsLoading} isLoading={isLoading} /></ProtectedRoutes> },
      { path: 'categories', element: <ProtectedRoutes><Categories setIsLoading={setIsLoading} isLoading={isLoading} /></ProtectedRoutes> },
      { path: 'allOrders', element: <ProtectedRoutes><AllOrders setIsLoading={setIsLoading} isLoading={isLoading} /></ProtectedRoutes> },
      { path: 'orderDetails', element: <ProtectedRoutes><OrderDetails setIsLoading={setIsLoading} isLoading={isLoading} /></ProtectedRoutes> },
      { path: 'cart', element: <ProtectedRoutes><Cart setIsLoading={setIsLoading} isLoading={isLoading} /></ProtectedRoutes> },
      // { path: 'wishlist', element: <ProtectedRoutes><Wishlist setIsLoading={setIsLoading} isLoading={isLoading} /></ProtectedRoutes> },
      { path: 'logout', element: <LogOut /> },
      { path: '*', element: <NotFound /> },
      { path: 'mainslider', element: <ProtectedRoutes><MainSlider /></ProtectedRoutes> },
    ]
  }])
  return <><Offline><span className='network-status'>Only shown offline (surprise!)</span></Offline>

    <CartContextProvider>
     
        <ToastContainer />
        <RouterProvider router={routes}></RouterProvider>

    </CartContextProvider>

  </>
}

export default App;
