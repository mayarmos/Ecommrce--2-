import React, { useContext, useState } from 'react';
import { CartContext } from './../../Context/CartContex';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { useQuery } from '@tanstack/react-query';

export default function Carts() {
  const [product, setProduct] = useState(null);
  const { isLoading } = useQuery({ queryKey: ['cart'], queryFn: getProduct });
  const { getProductTocart, UpdateProductIncart, deleteProductIncart } = useContext(CartContext);

  async function getProduct() {
    const { data } = await getProductTocart();
    setProduct(data?.data);
  }

  async function updateProduct(id, countNumber) {
    const { data } = await UpdateProductIncart(id, countNumber);
    setProduct(data?.data);
  }

  async function deleteProduct(id) {
    const { data } = await deleteProductIncart(id);
    setProduct(data?.data);
  }

  if (isLoading) {
    return <Loader />;
  } else {
    return (
  <div className="flex flex-col py-8 px-4 md:px-8 lg:px-12">
    <div className="overflow-x-auto shadow-md sm:rounded-lg my-12">
    <div className="max-w-full mx-auto bg-white dark:bg-gray-800 dark:border-gray-700 p-4">
    <h1 className="text-center text-3xl text-main">Shopping Cart</h1>
    <p className="text-center py-3">
      Total Price: <span>{product?.totalCartPrice} EGP</span>
    </p>
  <div className="flex justify-center mb-4">
    <Link
       to={`/CheckOut/${product?._id}`}
    className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" >
  Checkout
  </Link>
  </div>
</div>
{product?.products?.length > 0 ? (
  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
  <thead className="bg-gray-50 dark:bg-gray-700">
  <tr>
    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
    <span className="sr-only">Image</span>
    </th>
    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
     Product
     </th>
      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
      Qty
    </th>
    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
     Price
     </th>
     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
    Action
     </th>
 </tr>
</thead>
<tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
 {product?.products.map((item) => (
 <tr key={item.product.id}>
<td className="px-4 py-2">
<img
 src={item.product.imageCover}
 className="w-16 h-16 md:w-24 md:h-24 object-cover"
 alt={item.product.title} />
  </td>
<td className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white">
 {item?.product.title}
 </td>
<td className="px-4 py-2 text-sm">
 <div className="flex items-center">
 <button
onClick={() => updateProduct(item?.product?.id, item?.count - 1)}
 className="p-1 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none"
 type="button" >
<svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
</svg></button>
<input
 type="number"
 className="w-12 border border-gray-300 text-gray-900 text-sm rounded-lg mx-2"
 value={item?.count}
 readOnly />
<button
 onClick={() => updateProduct(item?.product?.id, item?.count + 1)}
 className="p-1 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none"
type="button" >
  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" /> </svg>
 </button>
</div>
</td>
 <td className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white"> {item?.price} EGP</td>
 <td className="px-4 py-2">
<button onClick={() => deleteProduct(item?.product?.id)} className="text-red-600 hover:underline dark:text-red-500" > Remove</button>
  </td>
 </tr>
 ))}
</tbody>
</table>
 ) : (
  <h1 className="text-center text-lg text-gray-600 dark:text-gray-400">There is no data</h1>
 )}
</div>
 </div>
 );
  }
}


















































// import React, { useContext, useEffect ,useState} from 'react'
// import {CartContext} from './../../Context/CartContex'
// import { Link } from 'react-router-dom';
// import Loader from '../Loader/Loader';
// import { useQuery } from '@tanstack/react-query';

// export default function carts() {

// const [product, setproduct] = useState(null)
//   let {isLoading}= useQuery({queryKey:['cart'],queryFn:getProduct})
//   let {getProductTocart ,UpdateProductIncart, deleteProductIncart }=useContext(CartContext);

//   async function getProduct() {
//     let {data} = await getProductTocart();
    
//     setproduct(data?.data)
  
//   }
//   async function updateProduct(id,countNumber) {
//     let {data} = await UpdateProductIncart(id,countNumber);
//     setproduct(data?.data)
  
//   }
//   async function deleteProduct(id) {
//     console.log(id);
    
//     let {data} = await deleteProductIncart(id);
//     setproduct(data?.data)
//     console.log(data.data);
  
//   }
    


// if(isLoading){
//   return  (<Loader/>) 
// }else{
//   return (
//     <>
   
//     <div className='flex py-8 flex-wrap justify-around'>
  
//     <div className="overflow-x-auto shadow-md sm:rounded-lg my-12 ">

//     <div class=" max-w-sm w-full ms-40 dark:bg-gray-800 dark:border-gray-700">
//     <div class="px-5 py-5 pb-5">
//     <h1 className='text-center text-3xl text-main '>shopping cart</h1>
//     <p className='text-center py-3' >Toltal Price : <span>{product?.totalCartPrice}EGP</span></p>
        
//         <div class="flex items-center justify-center">
//             <Link to={'/CheckOut/'+product?._id} href="#" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">CheckOut</Link>
//         </div>
//     </div>
// </div>
// {product?.products?.length > 0 ?
// <>

//   <table className=" text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//     <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//       <tr>
//         <th scope="col" className="px-16 py-3">
//           <span className="sr-only">Image</span>
//         </th>
//         <th scope="col" className="px-6 py-3">
//           Product
//         </th>
//         <th scope="col" className="px-6 py-3">
//           Qty
//         </th>
//         <th scope="col" className="px-6 py-3">
//           Price
//         </th>
//         <th scope="col" className="px-6 py-3">
//           Action
//         </th>
//       </tr>
//     </thead>
//     <tbody>
//       {product?.products.map((item)=>{
// return <tr className=" bg-white border-b col dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
// <td className="p-4  ">
//   <img src={item.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full col" alt="Apple Watch" />
// </td>
// <td className="px-6 col py-4 font-semibold text-gray-900 dark:text-white">
//  {item?.product.title}
// </td>
// <td className="px-6 py-4 col">
//   <div className="flex items-center">
//     <button onClick={()=>{updateProduct(item?.product?.id,item?.count-1)}} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
//       <span className="sr-only">Quantity button</span>
//       <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
//         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
//       </svg>
//     </button>
//     <div>
//       <input type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={item?.count} required />
//     </div>
//     <button onClick={()=>{updateProduct(item?.product?.id,item?.count+1)}}  className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
//       <span className="sr-only">Quantity button</span>
//       <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
//         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
//       </svg>
//     </button>
//   </div>
// </td>
// <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
//  {item?.price}EGP
// </td>
// <td className="px-6 py-4">
//   <a onClick={()=>{deleteProduct(item?.product?.id)}} href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
// </td>
// </tr>
//       })}
      
//     </tbody>
//   </table>
//  </>
//   :
// <h1>there is no data</h1>
//    }
// </div>

// </div>

//     </>
//   )}
// }
