import React, { useContext, useState } from 'react'
import {useFormik} from 'formik'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import * as Yup from 'yup';
import {UserContext} from './../../Context/UserContext'
export default function Register() {

let {setlogin}= useContext(UserContext)
let navigate = useNavigate()

const [apiErorr, setapiErorr] = useState('')
const [loading, setloading] = useState(false)

 function handleRegister(formsdata) {
    setloading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, formsdata) 
    .then((response)=>{console.log( 'success' ,response)
    if (response.data.message == 'success'){
        localStorage.setItem('userToken' ,response.data.token)
        setlogin(response.data.token)
        setloading(false)
            navigate ('/login')
            }
            ;})
    .catch((error)=>
      {setloading(false)
       setapiErorr(error.response.data.message)})
}

let validationschema = Yup.object({
    name: Yup.string().required('name is required').min(3,'min lenght is 3').max(10, ' max lenght is 10'),
    email: Yup.string().required('email is required').email('enter valid email '),
    phone: Yup.string().required('phone is required').matches(/^(0[1-9][0-9]{1,2}[ -]?[0-9]{6,7}|01[0-9]{1}[ -]?[0-9]{8})$/,'phone not valid '),
    password: Yup.string().required('password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,'password not valid '),
    rePassword: Yup.string().required('rePassword is required').oneOf([Yup.ref('password')])
})

let formik = useFormik({
    initialValues:{
        name: '',
        email:'',
        password:'',
        rePassword:'',
        phone:''
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

            <h2 class="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
                Register Now
            </h2>

            {apiErorr ? 
                     <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                     <span class="font-medium">{apiErorr}</span> 
                     </div>:null
                    }   

            <form class="space-y-6" onSubmit={formik.handleSubmit} method="POST">
           

                <div>
                    <label htmlFor="name" class="block text-sm font-medium text-gray-700">name</label>
                    <div class="mt-1">
                        <input name="name" onChange={formik.handleChange} onBlur={formik.handleBlur}  value={formik.values.name} id='name' type="text" 
                            class="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                    </div>
                    {formik.errors.name && formik.touched.name ? 
                     <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                     <span class="font-medium">{formik.errors.name}</span> 
                     </div>:null
                    }
                   
                </div>

                <div>
                    <label htmlFor="email" class="block text-sm font-medium text-gray-700">email</label>
                    <div class="mt-1">
                        <input name="email" onChange={formik.handleChange} onBlur={formik.handleBlur}  value={formik.values.email} id='email' type="email" autocomplete="email" 
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
                    <label htmlFor="rePassword" class="block text-sm font-medium text-gray-700">RePassword</label>
                    <div class="mt-1">
                        <input name="rePassword" onChange={formik.handleChange} onBlur={formik.handleBlur}  value={formik.values.rePassword} id='rePassword' type="password" autocomplete="confirm-password" 
                            class="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                    </div>
                    {formik.errors.rePassword && formik.touched.rePassword?
                     <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                     <span class="font-medium">{formik.errors.rePassword}</span> 
                     </div>:null
                    }
                </div>
                <div>
                    <label htmlFor="phone" class="block text-sm font-medium text-gray-700">phone</label>
                    <div class="mt-1">
                        <input name="phone" onChange={formik.handleChange} onBlur={formik.handleBlur}  value={formik.values.phone} id='phone' type="tel" autocomplete="phone" 
                            class="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                    </div>
                    {formik.errors.phone && formik.touched.phone?
                     <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                     <span class="font-medium">{formik.errors.phone}</span> 
                     </div>:null
                    }
                </div>

                <div>
                    <button type="submit" disabled={!(formik.isValid && formik.dirty)}
                    class="flex w-full justify-center rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2">
                    Register   
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
