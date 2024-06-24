import React from 'react';
import './CartModal.scss';
import { shopping_cart } from '../../utils/images';
import { formatPrice } from '../../utils/helpers';
import { Link } from 'react-router-dom';

const CartModal = ({ carts }) => {
    return (
        <div className="cart-modal">
            <h5 className="cart-modal-title fw-5 fs-15 font-manrope text-center">Recently Added Products</h5>
            {carts?.length > 0 ? (
                <div className="cart-modal-list grid">
                    {carts?.map((cart) => (
                        <Link to="/cart" key={cart?.id}>
                            <div className="cart-modal-item grid align-center font-manrope py-2">
                                <div className="cart-modal-item-img">
                                    <img src={cart?.thumbnail} className="img-cover" alt="img-cart" />
                                </div>
                                <div className="cart-modal-item-title fs-13 font-manrope text-capitalize">
                                    {cart?.title}
                                </div>
                                <div className="cart-modal-item-price text-orange fs-14 fw-6">
                                    {formatPrice(cart?.discountedPrice)}
                                </div>
                            </div>
                        </Link>
                    ))}

                    <Link
                        to={'/cart'}
                        className="view-cart-btn text-capitalize bg-orange fs-15 font-manrope text-center"
                    >
                        View My Shopping
                    </Link>
                </div>
            ) : (
                <div className="cart-modal-empty flex flex-column align-center justify-center">
                    <img src={shopping_cart} alt="shopping_cart-img" />
                    <h6 className="text-dark fw-4">No products yet</h6>
                </div>
            )}
        </div>
    );
};

export default CartModal;
