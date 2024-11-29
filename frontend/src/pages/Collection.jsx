import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItems';
import SearchBar from '../components/SearchBar';
import axios from 'axios';

const Collection = () => {
  const { products, search } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [sortOption, setSortOption] = useState('asc');
  const [page, setPage] = useState(1);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (search.trim() !== '') {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter((product) =>
        product.category === selectedCategory
      );
    }

    // Type filter
    if (selectedType) {
      filtered = filtered.filter((product) =>
        product.subCategory === selectedType
      );
    }

    axios.get(`http://127.0.0.1:5000/api/product/search?keyword=${search}&search_fields=ProductTitle&Category=${selectedType}&Gender=${selectedCategory}&page=${page}`)
      .then((res) => {
        setFilteredProducts(res.data.products);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });

  }, [products, search, selectedCategory, selectedType, sortOption, page]);

  return (
    <div className="pt-10 border-t">
      {/* Search Bar */}
      <SearchBar />

      {/* Filter Options */}
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 mt-5">
        {/* Filter Section */}
        <div className="min-w-60">
          <p
            onClick={() => setShowFilter(!showFilter)}
            className="my-2 text-xl flex items-center cursor-pointer gap-2"
          >
            Filters
            <img
              className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
              src={assets.dropdown_icon}
              alt="filter"
            />
          </p>

          {/* Category Filter */}
          <div
            className={`border border-gray-300 px-5 py-3 mt-6 rounded-md shadow-sm ${
              showFilter ? '' : 'hidden'
            } sm:block`}
          >
            <p className="mb-3 text-sm font-medium text-gray-800">CATEGORIES</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-600">
              {['Boys', 'Girls'].map((category) => (
                <label
                  key={category}
                  className="flex items-center gap-2 cursor-pointer hover:text-gray-800"
                >
                  <input
                    className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 rounded-sm"
                    type="radio"
                    value={category}
                    checked={selectedCategory === category}
                    onChange={() => handleCategoryChange(category)}
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>

          {/* Type Filter */}
          <div
            className={`border border-gray-300 px-5 py-3 mt-6 rounded-md shadow-sm ${
              showFilter ? '' : 'hidden'
            } sm:block`}
          >
            <p className="mb-3 text-sm font-medium text-gray-800">TYPE</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-600">
              {['Topwear', 'Bottomwear'].map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 cursor-pointer hover:text-gray-800"
                >
                  <input
                    className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 rounded-sm"
                    type="radio"
                    value={type}
                    checked={selectedType === type}
                    onChange={() => handleTypeChange(type)}
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="flex-1">
          <div className="flex justify-between items-center text-base sm:text-2xl mb-4">
            <Title text1={'ALL'} text2={'COLLECTIONS'} />

            {/* Product Page */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-1 bg-gray-300 text-gray-700 rounded"
              >
                Previous
              </button>
              <span>{page}</span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={filteredProducts.length < 10}
                className="px-1 bg-gray-300 text-gray-700 rounded"
              >
                Next
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item, index) => (
                <ProductItem key={index} id={item.ProductId} image={item.ImageURL} name={item.ProductTitle} price={item.PriceVND} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No products found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
