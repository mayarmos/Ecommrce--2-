import axios from "axios";
import { createContext } from "react";



let headers= {token:localStorage.getItem('userToken')}



export let CartContext =createContext()
export default function  CartContextProvider (props){

async function addProductTocart (productId){
 return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
    {
        productId:productId
    },
    {
        headers:headers
    })
    .then((response)=>response)
    .catch((error)=>error)
}

async function getProductTocart (){
 return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
    {
        headers:headers
    })
    .then((response)=>response)
    .catch((error)=>error)
}
async function UpdateProductIncart (productId,count){
 return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {
        count:count
    },
    {
        headers:headers
    })
    .then((response)=>response)
    .catch((error)=>error)
}

return <CartContext.Provider value={{addProductTocart , getProductTocart ,UpdateProductIncart}}>

{props.children}
</CartContext.Provider>

}