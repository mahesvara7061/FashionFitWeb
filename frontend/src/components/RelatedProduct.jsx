import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import Title from './Title';
import ProductItem from './ProductItems';

const RelatedProduct = ({ category, subcategory }) => {
    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (category && subcategory) {
            axios.get(`http://127.0.0.1:5000/api/product/search?Category=${category}`)
                .then(res => {
                    if (res.data.success && res.data.products.length > 0) {
                        setRelated(res.data.products.slice(0, 5));
                    } else {
                        setRelated([]);
                    }
                })
                .catch(error => {
                    console.error("There was an error fetching related products!", error);
                });
        }
    }, [category, subcategory]);

    return (
        <div className='my-24'>
            {related.length === 0 ? (
                <p>No related products found</p>
            ) : (
                <>
                    <div className='text-center text-3xl py-2'>
                        <Title text1={`RELATED`} text2={"PRODUCTS"} />
                    </div>

                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                        {related.map((item, index) => (
                            <ProductItem 
                                key={item.ProductId || index}
                                id={item.ProductId} 
                                price={item.PriceVND} 
                                image={item.ImageURL}
                                name={item.ProductTitle}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default RelatedProduct;
