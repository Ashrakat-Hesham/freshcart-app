import React, { useContext, useState } from 'react'
import styles from './LogIn.module.css'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { baseUrl } from '../../baseurl/BaseUrl.js'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import {LoadingContext} from '../../Context/LoadingContext'
import { Triangle } from 'react-loader-spinner'

export default function LogIn({saveUserData}) {
  let {isLoading,setIsLoading}=useContext(LoadingContext)
  let navigate = useNavigate()
  const [errormsg, setErrorMsg] = useState(null)
  const [loading, setloading] = useState(false)
  async function login(values) {
    console.log(values);
    setloading(true)
    setErrorMsg(null)
    await axios.post(`${baseUrl}/api/v1/auth/signin`, values).then((data) => {
      console.log(data);
      if (data.data.message === 'success') {
        console.log(data.data.token);
        setloading(false)
        localStorage.setItem('userToken',data.data.token)
        saveUserData()
        navigate('/')
      }
    }).catch((err) => {
      console.log(err.response);
      setloading(false)
      setErrorMsg(err.response.data.message);
    })

  }
  let mySchema = Yup.object({
    email: Yup.string().required('Email is required').matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, 'insert valid mail'),
    password: Yup.string().required('Password is required').matches(/^[A-z][a-z0-9]{6,8}$/, 'you must start with capital letter then continue from 6 to 8 chars in small letters or numbers'),
  })
  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    }, validationSchema: mySchema,
    onSubmit: (values) => {
      login(values)
    }

  })

  return <>
   <Helmet>
      <meta charSet="utf-8" />
      <title>Log in</title>
    </Helmet>

    {isLoading?<Triangle height="80" width="80" color="#4fa94d" ariaLabel="triangle-loading" wrapperStyle={{}} wrapperClassName="" visible={true}/>
:<><div className="container my-3 ">
<h3>Register Now: </h3>
{errormsg ? <div className='alert alert-danger'>{errormsg}</div> : ''}
<form className='w-50 mx-auto' onSubmit={formik.handleSubmit}>
  <label htmlFor="email">Email</label>
  <input className='form-control mb-2' type="email" name='email' id='email' value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />
  {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : ''}
  <label htmlFor="password">Password</label>
  <input className='form-control mb-2' type="password" name='password' id='password' value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} />
  {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : ''}
  {loading ? <button type='submit' className='btn py-2 px-3 mx-auto text-center bg-main text-white'><i className='fa fa-spin
fa-spinner'></i></button> : <button disabled={!(formik.isValid&&formik.dirty)} type='submit' className='btn py-2 px-3 mx-auto text-center bg-main text-white'>Log in</button>
  }


</form>
</div></>}
    


  </>

}
