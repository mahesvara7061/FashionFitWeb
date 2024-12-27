import React, { useState, useEffect } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const [cartProducts, setCartProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [deliveryDetails, setDeliveryDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("userId"));

  // Fetch cart data
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/api/cart/${userId}`)
      .then((res) => {
        setCartProducts(res.data.items);
        setTotal(res.data.totalVND);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  }, [userId]);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Place Order
  const handlePlaceOrder = async () => {
    try {
      // Validate delivery details
      for (const key in deliveryDetails) {
        if (!deliveryDetails[key]) {
          alert(`Please fill in the ${key} field.`);
          return;
        }
      }

      // Send order data to backend
      const response = await axios.post(
        "http://127.0.0.1:5000/api/order/create-from-cart",
        {
          userId: userId,
        }
      );

      if (response.status === 201) {
        alert("Order placed successfully!");
        navigate("/orders");
      } else {
        alert("Failed to place the order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing the order.");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* Left Side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[500px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="DETAILS" />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First Name"
            name="firstName"
            onChange={handleInputChange}
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last Name"
            name="lastName"
            onChange={handleInputChange}
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email Address"
          name="email"
          onChange={handleInputChange}
        />
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Phone"
          name="phone"
          onChange={handleInputChange}
        />
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street"
          name="street"
          onChange={handleInputChange}
        />
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
            name="city"
            onChange={handleInputChange}
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
            name="state"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Zip Code"
            name="zip"
            onChange={handleInputChange}
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
            name="country"
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal price={total} />
        </div>
        <div className="mt-12">
          <Title text1="PAYMENT" text2="METHOD" />
          {/* Payment Methods */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("visa")}
              className={`flex items-center gap-3 border p-2 px-3 cursor-pointer hover:shadow-lg transition-all duration-300 ${
                method === "visa" ? "border-blue-500" : ""
              }`}
            >
              <img className="h-10 mx-4" src={assets.stripe_logo} alt="visa" />
              <p className="text-gray-500 text-sm font-medium">VISA</p>
            </div>
            <div
              onClick={() => setMethod("mastercard")}
              className={`flex items-center gap-3 border p-2 px-3 cursor-pointer hover:shadow-lg transition-all duration-300 ${
                method === "mastercard" ? "border-blue-500" : ""
              }`}
            >
              <img className="h-10 mx-4" src={assets.razorpay_logo} alt="mastercard" />
              <p className="text-gray-500 text-sm font-medium">MASTERCARD</p>
            </div>
            <div
              onClick={() => setMethod("cod")}
              className={`flex items-center gap-3 border p-2 px-3 cursor-pointer hover:shadow-lg transition-all duration-300 ${
                method === "cod" ? "border-blue-500" : ""
              }`}
            >
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              onClick={handlePlaceOrder}
              className="w-full bg-black text-white p-2 rounded-md text-sm font-medium"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
