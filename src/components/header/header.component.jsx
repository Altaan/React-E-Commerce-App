import React from "react";
import { connect } from "react-redux"; // connect is HOC that modifies the component to have access to Redux state
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect"; // used to pass the top level state to the selectors in mapStateToProps

import { ReactComponent as Logo } from "../../assets/crown.svg";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import { signOutStart } from "../../redux/user/user.actions";

import "./header.styles.scss";

// this component needs the state of the currentUser and cart dropdown. It also needs to be able to dispatch sign out
const Header = ({ currentUser, hidden, signOutStart }) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/shop">
        CONTACT
      </Link>
      {
        // if the user is true, an obj, then render the div otherwise the link will be rendered, coz currentUser will be null
        currentUser ? (
          <div className="option" onClick={signOutStart}>
            SIGN OUT
          </div>
        ) : (
          <Link className="option" to="/signin">
            SIGN IN
          </Link>
        )
      }
      <CartIcon />
    </div>
    {
      // if hidden is true then render nothing otherwise show the CartDropdown
      hidden ? null : <CartDropdown />
    }
  </div>
);

// checking to the state, cart and user reducers, to see if the user is signed in and to toggle the cart dropdown
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

// dispatching the signOutStart action
const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
