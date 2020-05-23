import { createSelector } from "reselect";

const shopSelector = (state) => state.shop;

export const selectCollections = createSelector(
  [shopSelector],
  (shop) => shop.collections
);

// transforming the collections object to array to be passed to collections-overview component
export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  // Object.keys gets all keys from collections obj and transform them into array then map through the array of keys
  // to get the corresponding values, which would be the items within every individual collection, as arrays
  (collections) =>
    collections ? Object.keys(collections).map((key) => collections[key]) : []
);

// using the collectionUrlParam, which is a string, in match obj to find the matching collection
export const selectCollection = (collectionUrlParam) =>
  // the state is needed for the returned func below to get the collections array in shop reducer
  createSelector(
    [selectCollections],
    // since collections is an obj finding the correct collection is done by passing the string found in params prop in match
    (collections) => (collections ? collections[collectionUrlParam] : null)
  );

export const selectIsCollectionFetching = createSelector(
  [shopSelector],
  (shop) => shop.isFetching
);

// returning a boolean value of whether the collections are null or not to avoid crashing the app where collections are expected
export const selectIsCollectionsLoaded = createSelector(
  [shopSelector],
  // using !! to evaluate whether a value is truthy or falsey. So if collections are loaded true will be returned otherwise false
  (shop) => !!shop.collections
);
