import axios from 'axios'
import React, { useEffect ,useState ,useContext} from 'react'
import {useParams} from 'react-router-dom'
import Category from '../Category/Category';
import toast from 'react-hot-toast'
import {CartContext} from './../../Context/CartContex'

export default function Productdetails() {

let{id}=useParams();
console.log( id);

let {addProductTocart}=useContext(CartContext);

  async function addproductItem(id) {
    let response = await addProductTocart(id);
    console.log(response);   
    if(response.data.status == 'success')
      toast.success(response.data.message,{
        duration: 4000,
        position: 'top-center',
    })
    else{
      toast.error(response.data.message,{
        duration: 4000,
        position: 'top-center',
    })
    };}


const [details,setdetails] = useState(null)

function getproductDetails(){
axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  .then(({data})=>{setdetails(data.data)})
  .catch()
}
useEffect(()=>{
  getproductDetails()
},[id])
  return (
    <>
    <div className="row mt-5 justify-center items-center">
      <div className='w-1/4' >
      <img src={details?.imageCover} className='w-full'  />
      </div>
      <div className='w-3/4'>
        <h1 className='text-xl font-semibold text-slate-800' >{details?.title}</h1>
        <p>{details?.description}</p>
        <p className='mt-3'>{details?.category?.name}</p>

        <div className='flex justify-between'>
          <span>{details?.price}EGP</span>
          <span>{details?.ratingsQuantity} <i className='fas fa-star text-yellow-400'></i></span>
      </div>
      <button onclick={()=>{addproductItem(details?.id)}} className='btn'>Add to carts</button>
      </div>
     
    </div>

<Category categoryName={details?.category?.name}/>

    </>
  )
}























