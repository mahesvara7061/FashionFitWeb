import React, { useEffect, useState } from 'react';
import Title from './Title';
import ProductItem from './ProductItems';
import axios from 'axios';

const LatestCollection = () => {
    const [latestProducts, setLatestProducts] = useState([]);
    
    useEffect(() => {
        axios.get("http://127.0.0.1:5000/api/product/search?limit=5&sort_field=UpdatedTime&sort_order=desc")
            .then((res) => {
                setLatestProducts(res.data.products);
            })
            .catch((error) => {
                console.error("There was an error fetching the products!", error);
            });
    }, []);

    return (
        <div className='py-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1='OUR' text2='LATEST COLLECTION' text3='_' />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-500'>
                    Our latest collection of products, featuring the latest trends and styles.
                </p>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {latestProducts.map((item, index) => (
                    <ProductItem key={index} id={item.ProductId} image={item.ImageURL} name={item.ProductTitle} price={item.PriceVND} />
                ))}
            </div>
        </div>
    );
};

export default LatestCollection;
