import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
const CartTotal = ({price}) => {

    const { currency, getCartAmount, deliveryFee } = useContext(ShopContext);
    
  return (
      <div className='w-full'>
          <div className='text-2xl'>
              <Title text1 = "Cart" text2 = "Total"/>
              
          </div>
          
          <div className='flex flex-col gap-2 mt-2 text-sm'>
              <div className='flex justify-between'>
                  <p>Subtotal</p>
                  <p>{currency.symbol} {price}.00</p>
              </div>
              <div className='flex justify-between'>
                  <p>Delivery Fee</p>
                  <p>{currency.symbol} {deliveryFee}.00</p>
              </div>
              <div className='flex justify-between'>
                  <p>Total</p>
                  <p>{currency.symbol} {price + deliveryFee}.00</p>
              </div>
          </div>
    </div>
  )
}

export default CartTotal
