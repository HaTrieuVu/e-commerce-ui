import React, { useEffect } from 'react';
import './CategoryProductPage.scss';
import ProductList from '../../components/ProductList/ProductList';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import {
//   getAllProductsByCategory,
//   fetchAsyncProductsOfCategory,
//   getCategoryProductsStatus,
// } from "../../store/categorySlice";
import Loader from '../../components/Loader/Loader';
import { STATUS } from '../../utils/status';

const CategoryProductPage = () => {
    const dispatch = useDispatch();
    const { category } = useParams();
    // const categoryProducts = useSelector(getAllProductsByCategory);
    // const categoryProductsStatus = useSelector(getCategoryProductsStatus);

    // useEffect(() => {
    //   dispatch(fetchAsyncProductsOfCategory(category));
    // }, [dispatch, category]);

    return (
        <div className="cat-products py-5 bg-whitesmoke">
            <h1>CategoryProductPage</h1>
        </div>
    );
};

export default CategoryProductPage;
