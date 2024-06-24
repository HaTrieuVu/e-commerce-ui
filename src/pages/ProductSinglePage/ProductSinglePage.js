import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './ProductSinglePage.scss';
import { fetchAsyncProductSingle, getProductSingle, getSingleProductStatus } from '../../store/productSlice';
import { STATUS } from '../../utils/status';
import Loader from '../../components/Loader/Loader';
import { formatPrice } from '../../utils/helpers';
import { addToCart, getCartMessageStatus, setCartMessageOff, setCartMessageOn } from '../../store/cartSlice';
import CartMessage from '../../components/CartMessage/CartMessage';

const ProductSinglePage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector(getProductSingle);
    const productSingleStatus = useSelector(getSingleProductStatus);
    const [quantity, setQuantity] = useState(1);
    const CartMessageStatus = useSelector(getCartMessageStatus);

    //getting single product
    useEffect(() => {
        dispatch(fetchAsyncProductSingle(id));
        if (CartMessageStatus) {
            setTimeout(() => {
                dispatch(setCartMessageOff());
            }, 2000);
        }
    }, [CartMessageStatus]);

    let discountedPrice = product?.price - product?.price * (product?.discountPercentage / 100);

    const increaseQty = () => {
        setQuantity((prevQty) => {
            let tempQty = prevQty + 1;
            if (tempQty > product?.stock) tempQty = product?.stock;
            return tempQty;
        });
    };

    const decreaseQty = () => {
        setQuantity((prevQty) => {
            let tempQty = prevQty - 1;
            if (tempQty < 1) tempQty = 1;
            return tempQty;
        });
    };

    const addToCartHandle = (product) => {
        let discountedPrice = product?.price - product?.price * (product?.discountPercentage / 100);
        let totalPrice = discountedPrice * quantity;

        dispatch(addToCart({ ...product, totalPrice, quantity: quantity, discountedPrice }));
        dispatch(setCartMessageOn(true));
    };

    return (
        <main className="py-5 bg-whitesmoke">
            {productSingleStatus === STATUS.LOADING ? (
                <Loader />
            ) : (
                <div className="product-single">
                    <div className="container">
                        <div className="product-single-content bg-white grid">
                            {/* left */}
                            <div className="product-single-l">
                                <div className="product-img">
                                    <div className="product-img-zoom">
                                        <img
                                            className="img-cover"
                                            src={product ? (product.images ? product.images[0] : '') : ''}
                                            alt=""
                                        />
                                    </div>
                                    {product?.images?.length > 0 && (
                                        <div className="product-img-thumbs flex align-center my-2">
                                            {product?.images?.map((item, index) => (
                                                <div className="thumb-item" key={index}>
                                                    <img className="img-cover" src={item} alt="" />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* right */}
                            <div className="product-single-r">
                                <div className="product-details font-manrope">
                                    <div className="title fs-20 fw-5">{product?.title}</div>

                                    <div>
                                        <p className="para fw-3 fs-115">{product?.description}</p>
                                    </div>

                                    <div className="info flex align-center flex-wrap fs-14">
                                        <div className="rating">
                                            <span className="text-orange fw-5">Rating:</span>
                                            <span className="mx-1">{product?.rating}</span>
                                        </div>
                                        <div className="vert-line"></div>
                                        <div className="brand">
                                            <span className="text-orange fw-5">Brand:</span>
                                            <span className="mx-1">{product?.brand}</span>
                                        </div>
                                        <div className="vert-line"></div>
                                        <div className="brand">
                                            <span className="text-orange fw-5">Category:</span>
                                            <span className="mx-1">{product?.category ? product?.category : ''}</span>
                                        </div>
                                    </div>

                                    <div className="price">
                                        <div className="flex align-center">
                                            <div className="old-price text-gray">{product?.price}</div>
                                            <span className="fs-14 mx-2 text-dark">Inclusive of all taxes</span>
                                        </div>

                                        <div className="flex align-center my-1">
                                            <div className="new-price fw-5 font-poppins fs-24 text-orange">
                                                {formatPrice(discountedPrice)}
                                            </div>
                                            <div className="discount bg-orange fs-13 text-white fw-6 font-poppins">
                                                {product?.discountPercentage}% Off
                                            </div>
                                        </div>

                                        <div className="qty flex align-center my-4">
                                            <div className="qty-text">Quantity: </div>
                                            <div className="qty-change flex align-center mx-3">
                                                <button
                                                    onClick={() => decreaseQty()}
                                                    type="button"
                                                    className="qty-decrease flex align-center justify-center"
                                                >
                                                    <i className="fas fa-minus"></i>
                                                </button>
                                                <div className="qty-value flex align-center justify-center">
                                                    {quantity}
                                                </div>
                                                <button
                                                    onClick={() => increaseQty()}
                                                    type="button"
                                                    className="qty-increase flex align-center justify-center"
                                                >
                                                    <i className="fas fa-plus"></i>
                                                </button>
                                            </div>
                                            {product?.stock === 0 ? (
                                                <div className="qty-error text-uppercase bg-danger text-white fs-12 ls-1 mx-2 fw-5">
                                                    Out of stock
                                                </div>
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                        <div className="btns">
                                            <button
                                                className="add-to-cart-btn btn"
                                                onClick={() => addToCartHandle(product)}
                                                type="button"
                                            >
                                                <i className="fas fa-shopping-cart"></i>
                                                <span className="btn-text mx-2">Add to cart</span>
                                            </button>
                                            <button className="buy-now btn" type="button">
                                                <span className="btn-text mx-2">Buy now</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {CartMessageStatus && <CartMessage />}
        </main>
    );
};

export default ProductSinglePage;
