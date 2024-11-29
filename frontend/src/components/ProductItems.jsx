import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext);

    // Ensure we handle fallback cases
    const currencySymbol = currency?.symbol || '';
    const displayPrice = price || 'N/A';
    const imageSrc = Array.isArray(image) ? image[0] : image || 'fallback-image.jpg';

    return (
        <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
            <div className='overflow-hidden'>
                <img 
                    className='hover:scale-110 transition ease-in-out' 
                    src={imageSrc} 
                    alt={`${name} image`} 
                />
            </div>
            <p className='pt-3 pb-1 text-sm'>{name}</p>
            <p className='text-sm font-medium'>
                {currencySymbol}{displayPrice}
            </p>
        </Link>
    );
}

export default ProductItem;
