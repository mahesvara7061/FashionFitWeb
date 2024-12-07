import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Toggle visibility only for the `/collection` route
    setVisible(location.pathname === '/collection');
  }, [location]);

  const handleSearchClose = () => {
    setSearch(''); // Clear search input when closing
    setShowSearch(false);
  };

  return showSearch && visible ? (
    <div className='border-t border-b border-gray-50 text-center bg-gray-100'>
      {/* Search Input */}
      <div className='inline-flex items-center justify-center border border-gray-300 px-5 py-2 my-4 mx-3 rounded-full w-3/4 sm:w-1/2 bg-white'>
        <input
          className='flex-1 outline-none bg-inherit text-sm text-gray-800 placeholder-gray-500'
          type='text'
          placeholder='Search in collection...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label='Search products'
        />
        <img
          className='w-4 cursor-pointer'
          src={assets.search_icon}
          alt='search'
        />
      </div>

      {/* Close Button */}
      <img
        onClick={handleSearchClose}
        className='inline w-4 cursor-pointer hover:scale-110 transition-transform'
        src={assets.cross_icon}
        alt='close'
        aria-label='Close search bar'
      />
    </div>
  ) : null;
};

export default SearchBar;
