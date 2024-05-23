import React from 'react'
import styles from './Home.module.css'
import Products from '../Products/Products'
import CategorySlider from '../CategorySlider/CategorySlider'
import { Helmet } from "react-helmet";

export default function Home() {
  
  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Home</title>
    </Helmet>
    
    <CategorySlider />
    <Products />
  </>
}
