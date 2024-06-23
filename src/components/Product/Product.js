import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/helpers';
import './Product.scss';

const Product = ({ product }) => {
    return (
        <Link to={`/product/${product?.id}`} key={product?.id}>
            <div className="product-item bg-white">
                <div className="category">{product?.category}</div>
                <div className="product-item-img">
                    <img src={product?.images[0]} className="img-cover" alt="product-img" />
                </div>
                <div className="product-item-info fs-14">
                    <div className="brand">
                        <span>Band: </span>
                        <span className="fw-7">{product?.brand}</span>
                    </div>
                    <div className="title py-2">{product?.title}</div>
                    <div className="price flex align-center justify-center">
                        <span className="old-price">{product?.price}</span>
                        <span className="new-price">{product?.discountedPrice.toFixed(2)}</span>
                        <span className="discount fw-6">{`${product?.discountPercentage.toFixed(1)}% Off`}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Product;
