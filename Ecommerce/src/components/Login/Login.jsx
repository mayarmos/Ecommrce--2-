import React, {useContext, useState } from 'react'
import {useFormik} from 'formik'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import * as Yup from 'yup';
import {UserContext} from './../../Context/UserContext'
export default function Login() {

  let navigate = useNavigate()

  let {setlogin}= useContext(UserContext)

  const [apiErorr, setapiErorr] = useState('')
  const [loading, setloading] = useState(false)
  
   function handleRegister(formsdata) {
      setloading(true)
      axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, formsdata) 
      .then((response)=>{console.log( 'success' ,response)
      if (response.data.message == 'success'){
        localStorage.setItem('userToken' ,response.data.token)
        setlogin(response.data.token)
          setloading(false)
              navigate ('/')
              }
              ;})
      .catch((error)=>
        {setloading(false)
         setapiErorr(error.response.data.message)})
  }
  
  let validationschema = Yup.object({

      email: Yup.string().required('email is required').email('enter valid email '),
      password: Yup.string().required('password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,'password not valid '),
      
  })
  
  let formik = useFormik({
      initialValues:{
        
          email:'',
          password:'',
          
      },
  validationSchema: validationschema
  ,
      onSubmit: handleRegister
  })
  
  
  
    return (
      <>
      <div class="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-md space-y-8">
          <div class="bg-white shadow-md rounded-md p-6">
  
              <h2 class="my-3 text-center text-3xl font-bold tracking-tight text-green-900">
                 Login Now
              </h2>
  
              {apiErorr ? 
                       <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                       <span class="font-medium">{apiErorr}</span> 
                       </div>:null
                      }   
  
              <form class="space-y-6" onSubmit={formik.handleSubmit} method="POST">
             
  
         
  
                  <div>
                      <label htmlFor="email" class="block text-sm font-medium text-gray-700">email</label>
                      <div class="mt-1">
                          <input name="email" onChange={formik.handleChange} onBlur={formik.handleBlur}  value={formik.values.email} id='email' type="email-address" autocomplete="email-address" 
                              class="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                      </div>
                      {formik.errors.email && formik.touched.email?
                       <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                       <span class="font-medium">{formik.errors.email}</span> 
                       </div>:null
                      }
                  </div>
  
                  <div>
                      <label htmlFor="password" class="block text-sm font-medium text-gray-700">Password</label>
                      <div class="mt-1">
                          <input name="password" onChange={formik.handleChange} onBlur={formik.handleBlur}  value={formik.values.password} id='password' type="password" autocomplete="password" 
                              class="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                      </div>
                      {formik.errors.password && formik.touched.password?
                       <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                       <span class="font-medium">{formik.errors.password}</span> 
                       </div>:null
                      }
                  </div>
  
                  <div>
                      <button type="submit" disabled={!(formik.isValid && formik.dirty)}
                      class="flex w-full justify-center rounded-md border border-transparent bg-green-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2">
                      Login  
                     {loading? <i className='fa fa-spinner fa-spin mx-3'></i>:null }
                     </button>
                  </div>
              </form>
          </div>
      </div>
  </div>
      
      
      
      </>
    )
}
