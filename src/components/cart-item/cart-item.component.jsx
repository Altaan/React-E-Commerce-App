import React from "react";

import "./cart-item.styles.scss";

// this component shows the added item in the cart dropdown. The item prop is passed from cart-dropdown component
const CartItem = ({ item: { imageUrl, price, name, quantity } }) => (
  <div className="cart-item">
    <img src={imageUrl} alt="item" />
    <div className="item-details">
      <span className="name">{name}</span>
      <span className="price">
        {quantity} x ${price}
      </span>
    </div>
  </div>
);

// using React.memo to memoize the items added to the cart to avoid unnecessary re-rendering of items already added
export default React.memo(CartItem);
