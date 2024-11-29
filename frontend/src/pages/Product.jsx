import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProduct from '../components/RelatedProduct';
import { toast } from 'react-toastify';
import axios from 'axios';

const Product = () => {
  const { productId } = useParams(); // Access productId from route parameters
  const { products, addToCart } = useContext(ShopContext); // Access products and addToCart from context
  const [productData, setProductData] = useState(null); // State for product data
  const [image, setImage] = useState(''); // State for main image
  const [size, setSize] = useState(''); // State for selected size
  const [activeTab, setActiveTab] = useState('description'); // State for active tab (Description/Reviews)

  const fetchProductData = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:5000/api/product/search?keyword=${productId}&search_fields=ProductId`);
      if (res.data.success && res.data.products.length > 0) {
        setProductData(res.data.products[0]);
      } else {
        setProductData(null); 
      }
    } catch (error) {
      console.error("There was an error fetching the product!", error);
    }
  };

  useEffect(() => {
    fetchProductData(); 
  }, [productId, products]);

  const handleAddToCart = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem('userId'));
      const res = await axios.post('http://127.0.0.1:5000/api/cart/add', {
        userId: userId,
        productId: productId,
        quantity: 1,
      });
  
      if (res.status === 201) {
        toast.success("Product added to cart successfully!");
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error("Failed to add product to cart.");
    }
  };

  if (!productData) {
    return (
      <p className="text-center text-gray-500">
        Loading product details or product not found.
      </p>
    );
  }

  return (
    <div className="border-t-2 pt-10 transition-opacity duration-500 opacity-100">
      {/* Product Detail */}
      <div className="flex gap-12 flex-col sm:flex-row">
        {/* Product Image Section */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">

          {/* Main Image */}
          <div className="w-full sm:w-[81.3%]">
            <img
              src={productData.ImageURL}
              alt={productData.ProductTitle || 'Product Image'}
              className="w-full h-auto object-cover border border-gray-300"
            />
          </div>
        </div>

        {/* Product Info Section */}
        <div className="flex-1">
          {/* Product Name */}
          <h1 className="font-medium text-2xl mt-2">{productData.ProductTitle}</h1>

          {/* Star Rating */}
          <div className="flex items-center gap-1 mt-2">
            {[...Array(4)].map((_, index) => (
              <img
                key={index}
                src={assets.star_icon}
                alt="Star"
                className="w-5"
              />
            ))}
            <img
              src={assets.star_dull_icon}
              alt="Dull Star"
              className="w-5"
            />
          </div>

          {/* Price */}
          <p className="mt-5 text-3xl font-medium">
            {productData.PriceVND} {productData.currency?.symbol || '₫'}
          </p>

          {/* Description */}
          <p className="mt-5 text-gray-500">{productData.Description_Paragraph}</p>

          {/* Size Selector */}
          <div className="flex flex-col gap-4 my-8">

          </div>
          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-10 py-2 rounded-md"
          >
            Add to Cart
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product</p>
            <p>Cash on Delivery Available</p>
            <p>14 Days Return Policy</p>
          </div>
        </div>
      </div>

      {/* Description & Reviews Section */}
      <div className="mt-20">
        <div className="flex">
          <button
            className={`px-5 py-3 text-sm ${
              activeTab === 'description' ? 'font-bold border-b-2' : ''
            }`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button
            className={`px-5 py-3 text-sm ${
              activeTab === 'reviews' ? 'font-bold border-b-2' : ''
            }`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          {activeTab === 'description' ? (
            <p>{productData.Description_Paragraph || productData.Description_Paragraph}</p>
          ) : (
            <p>No reviews yet. Be the first to review this product!</p>
          )}
        </div>
      </div>

      {/* Related Products */}
      <RelatedProduct
        category={productData.Category}
        subcategory={productData.SubCategory}
        subsubcategory={productData.SubCategory}
      />
    </div>
  );
};

export default Product;
