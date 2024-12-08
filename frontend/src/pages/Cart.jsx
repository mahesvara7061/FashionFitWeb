import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import axios from 'axios';

const Cart = () => {
  const { products, cartItems, currency, updateQuantity, navigate } = useContext(ShopContext);
  const [cartProducts, setCartProducts] = useState([]);
  const [total, setTotal] = useState([])

  const userId = JSON.parse(localStorage.getItem('userId'));

  const handleQuantityChange = (itemId) => {
    axios.post('http://127.0.0.1:5000/api/cart/add', {
      userId: userId,
      productId: itemId,
      quantity: 1,
    });
    setCartProducts((prevCartProducts) =>
      prevCartProducts.map((item) =>
        item.productId === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
    setTotal(res.data.totalVND)
  };

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/api/cart/${userId}`)
        .then((res) => {
            setCartProducts (res.data.items);
            setTotal(res.data.totalVND)
        })
        .catch((error) => {
            console.error("There was an error fetching the products!", error);
        });
  }, []);
  
  const handleRemoveItem = async (itemId) => {
    try {
      const response = await axios.delete('http://127.0.0.1:5000/api/cart/remove', {
        data: {
          userId: userId,
          productId: itemId,
        },
      });
  
      if (response.status === 200) {
        setCartProducts((prevCartProducts) =>
          prevCartProducts.filter((item) => item.productId !== itemId)
        );
        setTotal(res.data.totalVND)

      } else {
        console.error("Failed to remove product from cart.");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };
  
  



  return (
    <div className="pt-14 px-4 sm:px-10 border-t">
      {/* Title Section */}
      <div className="text-3xl font-semibold mb-10">
        <Title text1="YOUR" text2="CART" />
      </div>

      {/* Cart Products */}
      {cartProducts.length > 0 ? (
        <div className="grid gap-6">
          {cartProducts.map((item, index) => (
            <div
              key={`${item.productId}`}
              className="flex flex-col sm:flex-row items-center gap-4 border border-gray-300 rounded-lg p-4 shadow-sm"
            >
              {/* Product Details */}
              <div className="flex-1">
                <p className="text-lg font-medium text-gray-800">{item.name}</p>
                <p className="text-sm font-medium mt-2">
                  {currency.symbol}
                  {item.priceVND} x {item.quantity} = {currency.symbol}
                  {(item.priceVND * item.quantity).toFixed(2)}
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-4">
                <p className="text-lg">{item.quantity}</p>
                <button
                  className="border border-gray-300 p-1 rounded hover:bg-gray-100"
                  onClick={() =>
                    handleQuantityChange(item.productId,item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>

              {/* Remove Button */}
              <button
                className="text-gray-500 hover:text-red-500 text-sm sm:text-base font-medium flex items-center gap-2"
                onClick={() => handleRemoveItem(item.productId)}
              >
                <img
                  src={assets.bin_icon}
                  alt="Remove item"
                  className="w-5 h-5"
                />
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-10">
          Your cart is currently empty.
        </p>
      )}

      {/* Cart Summary */}
      {cartProducts.length > 0 && (
        <div className="flex justify-end my-20">
          <div className="w-full sm:w-[450px]">
            <CartTotal price={total} />
            <div className='w-full text-end '>
              <button onClick={() => navigate('/place-order')} className='bg-black text-white w-full py-3 rounded-md hover:bg-gray-800 transition'>
                PROCEED TO CHECKOUT
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
