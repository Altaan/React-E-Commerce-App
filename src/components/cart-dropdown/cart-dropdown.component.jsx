import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";

import CartItem from "../cart-item/cart-item.component";
import CustomButton from "../custom-button/custom-button.component";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

import "./cart-dropdown.styles.scss";

// getting the prop cartItems from the state, through mapStateToProps, in order to render each item in this component
// history obj is obtained from withRouter to have access to checkout page when the checkout button is used
// dispatch is passed as prop by connect because connect doesn't have mapDispatchToProps as 2nd argument
const CartDropdown = ({ cartItems, history, dispatch }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {
        // if cartItems array has el in it then render it otherwise show the span
        cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )
      }
    </div>
    <CustomButton
      onClick={() => {
        // taking the user to checkout page and hidding the cart dropdown
        history.push("/checkout");
        dispatch(toggleCartHidden());
      }}
    >
      GO TO CHECKOUT
    </CustomButton>
  </div>
);

const mapStateToProps = createStructuredSelector({
  // using the memoized selectCartItems selector to prevent this component from rerendering whenever the state
  // changes due to actions unrelated to cartItems
  cartItems: selectCartItems,
});

// using withRouter to allow the returned connected comp to have access to History, Location and Match objects
// connect passes dispatch to the component as prop IF mapDispatchToProps ISN'T passed to connect as 2nd argument
export default withRouter(connect(mapStateToProps)(CartDropdown));
