// cartItems are the existing items in the cart and cartItemToAdd is the new item that has to be added
export const addItemToCart = (cartItems, cartItemToAdd) => {
  // find() returns the first item found in the cartItems array based on the condition passed
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  ); // existingCartItem will be undefined if there's no matching item

  // if existingCartItem has a value, i.e. true, then map will return a new array with the updated quantity prop of
  // the already existing cartItem in the cartItems array
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  // the first time a new item is added to the obj the line below will be returned
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  // checking if the item that needs to be removed exists in cartItems
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  // using filter() to return new cartItems array without the cartItemToRemove if it has quantity of 1
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }
  // decrease the item quantity by 1 otherwise keep it the same if the id doesn't match
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
