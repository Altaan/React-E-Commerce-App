import { createSelector } from "reselect";

// input selector is a func that takes the whole state as parameter and returns a slice of it
const selectCart = (state) => state.cart; // there can be multiple input selectors that get different slices of the state

// output selector uses createSelector to get a specific prop from the input selector slice
// createSelector makes the output selector memoized
export const selectCartItems = createSelector(
  [selectCart], // this array can be passed multiple selectors
  (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

// output selectors can use other output selectors to have more specific selectors
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  // this selector will return the total quantity of the cartItems in the cart reducer
  (cartItems) =>
    cartItems.reduce(
      (accumalatedQuantity, cartItem) =>
        accumalatedQuantity + cartItem.quantity,
      0
    )
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (accumalatedQuantity, cartItem) =>
      accumalatedQuantity + cartItem.quantity * cartItem.price,
    0
  )
);
