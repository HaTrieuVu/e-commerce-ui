import React, { useEffect, useState } from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSidebarOn } from '../../store/sidebarSlice';
import { getAllCategories } from '../../store/categorySlice';
import { getAllCarts, getCartItemsCount, getCartTotal } from '../../store/cartSlice';
import CartModal from '../CartModal/CartModal';

const Navbar = () => {
    const dispatch = useDispatch();
    const categories = useSelector(getAllCategories);

    return (
        <nav className="navbar">
            <div className="navbar-cnt flex align-center">
                <div className="brand-and-toggler flex align-center">
                    <button
                        className="sidebar-show-btn text-white"
                        type="button"
                        onClick={() => dispatch(setSidebarOn())}
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                    <Link to="/" className="navbar-brand flex align-center">
                        <span className="navbar-brand-ico">
                            <i className="fa-solid fa-bag-shopping"></i>
                        </span>
                        <span className="navbar-brand-txt mx-2">
                            <span className="fw-7">Snap</span>Up.
                        </span>
                    </Link>
                </div>

                <div className="navbar-collapse w-100">
                    <div className="navbar-search bg-white">
                        <div className="flex align-center">
                            <input
                                type="text"
                                className="form-control fs-14"
                                placeholder="Search your preferred items here"
                            ></input>
                            <Link to="/" className="search-btn text-white flex align-center justify-center">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </Link>
                        </div>
                    </div>

                    <ul className="navbar-nav flex align-center fs-12 fw-4 font-manrope">
                        {categories?.slice(0, 8).map((category, index) => (
                            <li className="nav-item no-wrap" key={index}>
                                <Link to={`category/${category?.slug}`} className="nav-link text-capitalize">
                                    {category?.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="navbar-cart flex align-center">
                    <Link to="/cart" className="cart-btn">
                        <i className="fa-solid fa-cart-shopping"></i>
                        <div className="cart-items-value">0</div>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;