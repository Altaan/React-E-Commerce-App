import CartActionTypes from "./cart.types";
import { addItemToCart, removeItemFromCart } from "./cart.utils";

// the cart dropdown has to been hidden the first time the user loads the app
const INITIAL_STATE = {
  hidden: true,
  cartItems: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        // cart dropdown will be either in a false or true state that's why ! is used to convert to the opposite state
        hidden: !state.hidden,
      };
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        // addItemToCart returns new cartItems array whether the action.payload has a new item to add or an existing item in state.cartItems
        cartItems: addItemToCart(state.cartItems, action.payload),
      };
    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        // removeItemFromCart reduces the quantity of the item if it matches the id of the item in the action payload
        cartItems: removeItemFromCart(state.cartItems, action.payload),
      };
    case CartActionTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        // filter() returns a new array with items that don't match the id of the item that needs to be removed
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        ),
      };
    case CartActionTypes.CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
