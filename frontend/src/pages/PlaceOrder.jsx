import React from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { useState } from 'react'
import { data, useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios';

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const navigate = useNavigate(ShopContext)
  const userId = JSON.parse(localStorage.getItem('userId'));
  const [cartProducts, setCartProducts] = useState([]);
  const [total, setTotal] = useState([])
  
  axios.get(`http://127.0.0.1:5000/api/cart/${userId}`)
  .then((res) => {
      setCartProducts (res.data.items);
      setTotal(res.data.totalVND)
  })
  .catch((error) => {
      console.error("There was an error fetching the products!", error);
  });
    
  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t' >
      {/* left side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[500px]'>
        <div className='text-xl sm:text-2xl my-3'>
            <Title text1 = "DELIVERY" text2 = "DETAILS"/>

        </div>
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type='text' placeholder='First Name' />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type='text' placeholder='Last Name' />

        </div>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type='email' placeholder='Email Address' />
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type='number' placeholder='Phone' />
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type='text' placeholder='Street' />
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type='text' placeholder='City' />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type='text' placeholder='State' />
        </div>
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type='text' placeholder='Zip Code' />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type='text' placeholder='Country' />
        </div>
        
      </div>
      {/* right side */}
      <div className='mt-8 '>
        <div className='mt-8 min-w-80'>
          <CartTotal price={total}/>

        </div>
        <div className='mt-12 '>
          <Title text1="PAYMENT" text2="METHOD" />
          {/* payment method */}
          <div className='flex gap-3 flex-col lg:flex-row '>
            <div onClick={() => setMethod("visa")} className='flex items-center gap-3 border p-2 px-3 cursor-pointer hover:shadow-lg transition-all duration-300'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "visa" ? " bg-blue-900" : "bg-gray-200"}`}></p>
              <img  className='h-10 mx-4' src={assets.stripe_logo} alt='visa' />
            </div>
             <div onClick={() => setMethod("mastercard")} className='flex items-center gap-3 border p-2 px-3 cursor-pointer hover:shadow-lg transition-all duration-300'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "mastercard" ? " bg-blue-900" : "bg-gray-200"}`}></p>
              <img  className='h-10 mx-4' src={assets.razorpay_logo} alt='visa' />
            </div>
            <div onClick={() => setMethod("cod")} className='flex items-center gap-3 border p-2 px-3 cursor-pointer hover:shadow-lg transition-all duration-300'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? " bg-blue-900" : "bg-gray-200"}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4 '>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button onClick={() => navigate("/orders")} className='w-full bg-black text-white p-2 rounded-md text-sm font-medium'>PLACE ORDER</button>
          </div>

        </div>
 
      </div>
    </div>
  )
}

export default PlaceOrder
