import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect"; // passes state automatically without adding argument to selector

import { toggleCartHidden } from "../../redux/cart/cart.actions";
// memoized selector that takes the entire state as parameter to select the cart reducer
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import "./cart-icon.styles.scss";

// passing the method toggleCartHidden as prop to toggle the cart icon
// itemCount selector is used to view the total number of items inside the CartIcon in the Header component
const CartIcon = ({ toggleCartHidden, itemCount }) => (
  // dispatch the action toggleCartHidden when this component is clicked on
  <div className="cart-icon" onClick={toggleCartHidden}>
    <ShoppingIcon className="shopping-icon" />
    <span className="item-count">{itemCount}</span>
  </div>
);

// allowing this component to dispatch the toggleCartHidden action
const mapDisptachToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

// whenever ANY reducer updates, a new obj is returned which results in updating the entire state that causes
// mapStateToProps to rerender even if it's not using the updated reducer!
const mapStateToProps = createStructuredSelector({
  // memoized selector which keeps the same value and doesn't rerender if other parts of the state are updated
  itemCount: selectCartItemsCount,
});

export default connect(mapStateToProps, mapDisptachToProps)(CartIcon);
