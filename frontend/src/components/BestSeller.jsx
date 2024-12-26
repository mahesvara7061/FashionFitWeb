import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItems';
import axios from 'axios';

const BestSeller = () => {
    const [latestProducts, setLatestProducts] = useState([]);
    
    useEffect(() => {
        axios.get("http://127.0.0.1:5000/api/product/search?limit=5&sort_field=Sales&sort_order=desc")
            .then((res) => {
                setLatestProducts(res.data.products);
            })
            .catch((error) => {
                console.error("There was an error fetching the products!", error);
            });
    }, []);

    return (
        <div className='my-10'>
            {/* Title Section */}
            <div className='text-center text-3xl py-8'>
                <Title text1="BEST" text2="SELLER" />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Our best-selling products, featuring the latest trends and styles.
                </p>
            </div>

            {/* Products Section */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {latestProducts.map((item, index) => (
                    <ProductItem key={index} id={item.ProductId} image={item.ImageURL} name={item.ProductTitle} price={item.PriceVND} />
                ))}
            </div>
        </div>
    );
};

export default BestSeller;
