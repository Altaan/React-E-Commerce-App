import { takeLatest, call, put, all } from "redux-saga/effects";

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
} from "./shop.actions";

import ShopActionTypes from "./shop.types";

// yield gives control over sagas to the middleware, which can determine to cancel a previous request from a saga
export function* fetchCollectionsAsync() {
  try {
    // the title of the collection holding shop data in firebase is collections
    const collectionRef = firestore.collection("collections");
    // get() makes an api call to fetch the data associated with collectionRef. get() returns a promise
    const snapshot = yield collectionRef.get();
    // call is used as the effect inside the generator func that invokes a method
    // call() takes a func as 1st argument and the following arguments will be the parameters for the func
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );
    // put() dispatches an obj, which would have type and payload
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

// the generator function will pause whenever a specific action type is received
export function* fetchCollectionsStart() {
  // the 2nd argument is another generator func that will run in response to the action type passed as the 1st arg
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}

export function* shopSagas() {
  yield all([call(fetchCollectionsStart)]);
}
