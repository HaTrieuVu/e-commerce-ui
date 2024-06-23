import React from "react";
import "./CartPage.scss";
import { useSelector, useDispatch } from "react-redux";
import { shopping_cart } from "../../utils/images";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/helpers";
import {
  getAllCarts,
  removeFromCart,
  toggleCartQty,
  clearCart,
  getCartTotal,
} from "../../store/cartSlice";

const CartPage = () => {
  return (
    <div className="cart bg-whitesmoke">
      <h1>CartPage</h1>
    </div>
  );
};

export default CartPage;
