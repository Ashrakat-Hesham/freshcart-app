import React, { useState } from 'react'
import styles from './Register.module.css'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { baseUrl } from '../../baseurl/BaseUrl.js'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
export default function Register() {
  let navigate = useNavigate()
  const [errormsg, setErrorMsg] = useState(null)
  const [loading, setloading] = useState(false)
  async function register(values) {
    console.log(values);
    setloading(true)
    setErrorMsg(null)
    await axios.post(`${baseUrl}/api/v1/auth/signup`, values).then((data) => {
      console.log(data);
      if (data.data.message === 'success') {
        console.log(data);
        setloading(false)
        navigate('/login')

      }
    }).catch((err) => {
      console.log(err.response.data.message);
      setloading(false)
      setErrorMsg(err.response.data.message);
    })



  }
  let mySchema = Yup.object({
    name: Yup.string().min(3, 'Name must be at least 3 chars').max(10, 'You have exceeded the limit of chars').required('Name is required'),
    email: Yup.string().required('Email is required').matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, 'insert valid mail'),
    password: Yup.string().required('Password is required').matches(/^[A-z][a-z0-9]{6,8}$/, 'you must start with capital letter then continue from 6 to 8 chars in small letters or numbers'),
    rePassword: Yup.string().required('Repassword is required').oneOf([Yup.ref('password')], 'enter the same password'),
  })
  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
    }, validationSchema: mySchema,

    onSubmit: (values) => {
      register(values)
    }

  })

  return <>
   <Helmet>
      <meta charSet="utf-8" />
      <title>Register</title>
    </Helmet>
    <div className="container my-3 ">
      <h3>Register Now: </h3>
      {errormsg ? <div className='alert alert-danger'>{errormsg}</div> : ''}
      <form className='w-50 mx-auto' onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name</label>
        <input className='form-control mb-2' type="text" name='name' id='name' value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} />
        {formik.errors.name && formik.touched.name ? <div className='alert alert-danger'>{formik.errors.name}</div> : ''}
        <label htmlFor="email">Email</label>
        <input className='form-control mb-2' type="email" name='email' id='email' value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />
        {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : ''}

        <label htmlFor="password">Password</label>
        <input className='form-control mb-2' type="password" name='password' id='password' value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} />
        {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : ''}

        <label htmlFor="rePassword">Repassword</label>
        <input className='form-control mb-2' type="password" name='rePassword' id='rePassword' value={formik.values.rePassword} onBlur={formik.handleBlur} onChange={formik.handleChange} />
        {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger'>{formik.errors.rePassword}</div> : ''}
        {loading ? <button type='submit' className='btn py-2 px-3 mx-auto text-center bg-main text-white'><i className='fa fa-spin
    fa-spinner'></i></button> : <button disabled={!(formik.isValid&&formik.dirty)} type='submit' className='btn py-2 px-3 mx-auto text-center bg-main text-white'>Register</button>
        }


      </form>
    </div>


  </>

}
