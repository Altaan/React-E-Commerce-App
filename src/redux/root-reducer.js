import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
// storage gives access to local storage on the window browser
import storage from "redux-persist/lib/storage"; // make sure its lib and storage folders

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import directoryReducer from "./directory/directory.reducer";
import shopReducer from "./shop/shop.reducer";

// persistConfig is the JSON obj with wanted config that redux-persist needs to use
const persistConfig = {
  // indicating the level in the reducer obj from where the storage has to start
  key: "root",
  // storage: storage to indicate the wanted storage obj from redux-persist
  storage,
  // whitelist includes the string names of the reducers that has to be stored in local storage
  // user is being handled by firebase so there's no need to add it in local storage
  whitelist: ["cart"],
};

// the root reducer is the base reducer that represents all of the state, i.e. all reducers, of the app
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer,
});

// export a modified version of the rootReducer with persisting capabilities
export default persistReducer(persistConfig, rootReducer);
