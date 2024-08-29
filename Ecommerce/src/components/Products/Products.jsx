import axios from 'axios'
import React, { useEffect, useState , useContext } from 'react'
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import CategorySlider from '../CategorySlider/CategorySlider';
import { CartContext } from '../../Context/CartContex';
import toast from 'react-hot-toast'
import MainSlider from '../MainSlider/MainSlider';
import { useQuery } from '@tanstack/react-query';



export default function Products() {

  // const [product, setproduct] = useState([]);
  // const [loading, setloading] = useState(true)

let {data,error, isError, isFetching, isLoading}= useQuery({queryKey:['recentProduct'],queryFn:getproduct})
console.log(data?.data);


  let {addProductTocart}= useContext(CartContext);

  async function addproductItem(id) {
    let response = await addProductTocart(id);
    console.log(response);
    
    if(response.data.status =='success')
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
    

async function getproduct(){
  return  axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then(({data})=>{
      return data
     
    })
    .catch(()=>{  })
    }


  
// useEffect(()=>{
//   getproduct()
// } ,[])

if(isLoading){
  return  (<Loader/>) 
}else{
  return (
    <>
     <MainSlider/>
    <CategorySlider/>
   
      <div className='container mt-5'>
      
        <div className='row'>
        {data?.data?.map((productInfo)=>{ 
          return <div className='w-2/12 px-4 product' key={productInfo.id} >
            <div className='bg-slate-200 p-5'>
            <Link to={`/ProductDetails/${productInfo.id}/${productInfo.category.name}`}>
            <img src={productInfo.imageCover} alt={productInfo.category.name} className=''></img>
        <span className='font-light text-green-800 block'> {productInfo.category.name}</span>
        <span className='text-lg font-light'> {productInfo.title}</span>
        <div className='flex justify-between'>
          <span>{productInfo.price}</span>
          <span>{productInfo.ratingsQuantity} <i className='fas fa-star text-yellow-400'></i></span>
        </div> 
            </Link>
            <button onClick={()=>{addproductItem(productInfo.id)}} className='btn'>Add to cart</button>
            </div>

            </div>
  
        }
        )}
        </div>
      
      
      </div>
    
    </>
  )
}
 


}
