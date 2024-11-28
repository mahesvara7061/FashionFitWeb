import { createContext, useState, useEffect } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext({
  products: [],
  currency: { code: "", symbol: "" }, // Default structure for currency
  deliveryFee: 0,
});

const ShopContextProvider = ({ children }) => {
  const currency = { code: "VND", symbol: "₫" }; // Define currency with code and symbol
  const deliveryFee = 10; // Set a default delivery fee
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();
  

  const addToCart = (itemId, size) => {
    if (!size) {
      toast.error("Please select a size before adding to cart!");
      return;
    }

    const cartData = structuredClone(cartItems); // Deep clone the cartItems

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1; // Increment quantity
      } else {
        cartData[itemId][size] = 1; // Add new size with quantity 1
      }
    } else {
      cartData[itemId] = { [size]: 1 }; // Add new item with size and quantity
    }

    setCartItems(cartData);
   
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          totalCount += cartItems[itemId][size];
        }
      }
    }
    return totalCount;
  };


  const removeFromCart = (itemId, size) => {
    const cartData = structuredClone(cartItems);

    if (cartData[itemId] && cartData[itemId][size]) {
      if (cartData[itemId][size] > 1) {
        cartData[itemId][size] -= 1; // Decrease quantity
      } else {
        delete cartData[itemId][size]; // Remove size if quantity reaches 0
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId]; // Remove item if no sizes remain
        }
      }
      setCartItems(cartData);
      
    }
  };

 

  useEffect(() => {
    console.log("Updated Cart Items:", cartItems); // Log updated cart items
  }, [cartItems]);

  const updateQuantity = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
  };

  const getCartAmount =  () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      const itemInfo = products.find((p) => p._id === items);
      for (const size in cartItems[items]) {
        try {
          if (cartItems[items][size] > 0) {
            totalAmount += itemInfo.price * cartItems[items][size];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalAmount;
  };

  const value = {
    products,
    currency,
    deliveryFee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    removeFromCart, // Expose `removeFromCart` function
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
