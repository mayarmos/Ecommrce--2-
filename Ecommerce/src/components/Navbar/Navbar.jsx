import React, {useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {UserContext} from './../../Context/UserContext'
export default function Navbar() {

let navigate = useNavigate()
  let {islogin, setlogin }= useContext(UserContext)

  function logout (){
    localStorage.removeItem('userToken');
    setlogin(null);
    navigate('/login')
  }
  return (
  <>
<header class="lg:px-16 px-4 bg-white flex flex-wrap items-center py-4 shadow-md">
    <div class="flex-1 flex justify-between items-center">
        <a href="#" class="text-xl">Company</a>
    </div>

    <label for="menu-toggle" class="pointer-cursor md:hidden block">
      <svg class="fill-current text-gray-900"
        xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
        <title>menu</title>
        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
      </svg>
    </label>
    <input class="hidden" type="checkbox" id="menu-toggle" />

    <div class="hidden md:flex md:items-center md:w-auto w-full" id="menu">
        <nav>
            <ul class="md:flex items-center  justify-between text-base text-gray-700 pt-4 md:pt-0">
            
            {islogin?<>
            
              <li><NavLink to={''} className="md:p-4 py-3  " href="#">Products</NavLink></li>
              <li><NavLink to={'brands'} className="md:p-4 py-3  " href="#">brands</NavLink></li>
              <li><NavLink to={'Carts'} className="md:p-4 py-3  " href="#">Carts</NavLink></li>
            </>:null
            }

            {!islogin?
              <>
               <li><NavLink to={'login'} className="md:p-4 py-3  " href="#">login</NavLink></li>
               <li><NavLink to={'register'} className="md:p-4 py-3  " href="#">register</NavLink></li>
              </>:
             <li><span className="md:p-4 py-3  " onClick={()=>{logout()}}>logout</span></li>
            }  
            </ul>
        </nav>
    </div>
</header>
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  </>
  )
}
