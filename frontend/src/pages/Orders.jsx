import React, { useContext, useState, useEffect  } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Orders = () => {
  const { products, currency } = useContext(ShopContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const userId = JSON.parse(localStorage.getItem('userId'));
  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/api/cart/${userId}`)
        .then((res) => {
          setOrders (res.data.items);
        })
        .catch((error) => {
            console.error("There was an error fetching the products!", error);
        });
  }, []);

  return (
    <div className="border-t pt-16 px-4 sm:px-10">
      {/* Title */}
      <div className="text-3xl font-semibold mb-8">
        <Title text1="MY" text2="ORDERS" />
      </div>

      {/* Orders List */}
      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div
              key={order.id}
              className="bg-white border border-gray-200 rounded-lg shadow-md p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
            >
              {/* Product Info */}
              <div className="flex items-start gap-6 text-sm">
                <div>
                  <p className="text-lg font-medium text-gray-800">{order.name}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2 text-sm text-gray-700">
                    <p>
                      <span className="font-semibold">{currency.symbol}{order.priceVND}</span>
                    </p>
                    <p className="sm:ml-4">
                      Quantity: <span className="font-semibold">{order.quantity}</span>
                    </p>
                  </div>
                  {/* Order Status */}
                  <p className="mt-2 text-sm font-medium text-green-600">
                    {order.status}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-10">You have no orders yet.</p>
      )}
    </div>
  );
};

export default Orders;
