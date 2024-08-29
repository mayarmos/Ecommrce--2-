
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';



 
      
export default function CategorySlider() {

    const [category, setcategory] = useState([]);
   
    function getcategory(){
      axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({data})=>{setcategory(data.data);
     
      })
      .catch(()=>{  })
    }
  
  useEffect(()=>{
    getcategory()
  } ,[])


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
  };


  return (
   
<>
<h1 className='text-xl font-medium text-slate-500 my-4 px-6'>shop popular category </h1>

<Slider {...settings}>

{category.map((img)=>{
return  <img src={img.image} className='cat w-100'  />

})} 
</Slider>


</>
    
  )
}

















{/* {category.map((img)=>{

    return <div key={img.id}>
<img src={img.image}  className='cat' />
<p className='text-center'> {img.name}</p>
    </div>
  
})} */}