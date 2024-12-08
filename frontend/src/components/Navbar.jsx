import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { useContext } from 'react';
import { toast } from 'react-toastify';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const { setShowSearch, getCartCount } = useContext(ShopContext);
    

    return (
        <div className='flex items-center justify-between py-5 font-medium'>
            {/* Logo */}
            <Link to='/'>
                <img src={assets.logo} className='w-36' alt="Logo" />
            </Link>

            {/* Desktop Nav Links */}
            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                {['home', 'collection', 'about', 'contact'].map((path, idx) => (
                    <NavLink
                        key={idx}
                        to={`/${path}`}
                        className={({ isActive }) =>
                            `flex flex-col items-center gap-1 ${isActive ? 'nav-active' : ''}`
                        }
                    >
                        <p className={`${path === 'ai' ? 'text-amber-500' : ''}`}>
                            {path.toUpperCase()}
                        </p>
                        <hr
                            className={`w-0 hover:w-2/4 transition-all duration-300 border-none h-[1.5px] ${
                                path === 'ai' ? 'bg-amber-500' : 'bg-gray-700'
                            }`}
                        />
                    </NavLink>
                ))}
            </ul>

            {/* Icons and Small Screen Menu */}
            <div className='flex items-center gap-6'>
                {/* Search Icon */}
                <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="Search Icon" />

                {/* Profile Dropdown */}
                <div className='group relative'>
                   <Link to='/login'> <img className='w-5 cursor-pointer' src={assets.profile_icon} alt="Profile Icon" /></Link>
                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                        <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg'>
                            <p className='cursor-pointer hover:text-black'>My Profile</p>
                            <p className='cursor-pointer hover:text-black'>Orders</p>
                            <p className='cursor-pointer hover:text-black'>Log Out</p>
                        </div>
                    </div>
                </div>

                {/* Cart Icon */}
                <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} className='w-5 cursor-pointer' alt="Cart Icon" />
                    <p className='absolute right-[-5px] bottom-[-5px] bg-black text-white w-4 leading-4 h-4 flex items-center justify-center aspect-square rounded-full text-[8px]'>
                        {getCartCount()}
                    </p>
                </Link>

                {/* Hamburger Menu */}
                <img
                    onClick={() => setVisible(true)}
                    src={assets.menu_icon}
                    className='w-5 cursor-pointer sm:hidden'
                    alt="Menu Icon"
                />
            </div>

            {/* Sidebar Menu for Small Screens */}
            <div
                className={`fixed top-0 right-0 bottom-0 z-40 bg-white transition-transform duration-300 shadow-lg ${
                    visible ? 'translate-x-0 w-3/4' : 'translate-x-full'
                }`}
            >
                <div className='flex flex-col text-gray-600'>
                    {/* Close Button */}
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="Close Icon" />
                        <p>Back</p>
                    </div>

                    {/* Sidebar Links */}
                    <div className='flex flex-col p-4 gap-4'>
                        {['home', 'collection', 'about', 'contact', 'ai'].map((path, idx) => (
                            <NavLink
                                key={idx}
                                to={`/${path}`}
                                onClick={() => setVisible(false)}
                                className={({ isActive }) =>
                                    `${isActive ? 'font-bold text-black' : ''}`
                                }
                            >
                                {path.toUpperCase()}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>

            {/* Overlay when Sidebar is Open */}
            {visible && (
                <div
                    className='fixed inset-0 bg-black bg-opacity-30 z-30'
                    onClick={() => setVisible(false)}
                />
            )}
        </div>
    );
};

export default Navbar;
