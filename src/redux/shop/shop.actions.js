import ShopActionTypes from "./shop.types";

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});

// thunk isn't used anymore in this app. shop.sagas is handling the async api requests
/*
// thunk is an action creator that returns a function that gets the dispatch, like mapDispatchToProps
// with dispatch actions can be triggered inside another action, all of this thanks to thunk
export const fetchCollectionsStartAsync = () => {
  return (dispatch) => {
    // the title of the collection holding shop data in firebase is collections
    const collectionRef = firestore.collection("collections");
    dispatch(fetchCollectionsStart()); // used to change the property isFetching, in shop reducer, to true
    // get() makes an api call to fetch the data associated with collectionRef. get() returns a promise
    collectionRef
      .get()
      .then((snapshot) => {
        // converting the collections collection to an object containing each collection as an obj with their titles as keys
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        dispatch(fetchCollectionsSuccess(collectionsMap)); // dispatching the collections after converting them
      })
      .catch((error) => dispatch(fetchCollectionsFailure(error.message)));
  };
};
*/
