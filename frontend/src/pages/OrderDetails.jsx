import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Title from "../components/Title";
import axios from "axios";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  // Fetch order details
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/api/order/${orderId}`)
      .then((res) => {
        setOrder(res.data.order);
      })
      .catch((error) => {
        console.error("There was an error fetching the order details!", error);
      });
  }, [orderId]);

  if (!order) {
    return <p>Loading order details...</p>;
  }

  return (
    <div className="border-t pt-16 px-4 sm:px-10">
      {/* Title */}
      <div className="text-3xl font-semibold mb-8">
        <Title text1="ORDER" text2="DETAILS" />
      </div>

      {/* Order Info */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 space-y-4">
        <p>
          <span className="font-semibold">Order ID:</span> {order.orderId}
        </p>
        <p>
          <span className="font-semibold">Status:</span> {order.status}
        </p>
        <p>
          <span className="font-semibold">Order Time:</span>{" "}
          {new Date(order.orderTime).toLocaleString()}
        </p>
        <p>
          <span className="font-semibold">Total:</span> {order.total} VND
        </p>

        {/* Items */}
        <div>
          <p className="font-semibold">Items:</p>
          <ul className="list-disc list-inside">
            {order.items.map((item, index) => (
              <li key={index}>
                {item.name} - {item.quantity} x {item.priceVND} VND
              </li>
            ))}
          </ul>
        </div>

        <button
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
          onClick={() => navigate("/orders")}
        >
          Back to Orders
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
