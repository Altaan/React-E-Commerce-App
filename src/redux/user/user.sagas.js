import { takeLatest, put, all, call } from "redux-saga/effects";

import UserActionTypes from "./user.types";

import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure,
} from "./user.actions";

import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
} from "../../firebase/firebase.utils";

// this saga gets a snapshot of the doc in firebase database that contains the user and return the data
export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    // a snapshot will be generated inside createUserProfileDocument()
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData
    );
    const userSnapshot = yield userRef.get();
    // put() puts things back into the regular Redux flow
    yield put(
      // the success method will update the user reducer with the passed obj
      signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
    );
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithGoogle() {
  try {
    // destructuring the object returned from signInWithPopup() to get the user property
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

// destructuring the payload from EMAIL_SIGN_IN_START action to destructure one more time the email and password
export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

// this saga checks if the user is signed in and exists in the firebase database
export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    // if the user didn't sign in, i.e. getCurrentUser() returning null, then return out of this function
    if (!userAuth) return;
    // if there's a logged in user then get a snapshot
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

// userCredentials are passed by SIGN_UP_START action obj, which has displayName, email and password in the payload
export function* signUp({ payload: { displayName, email, password } }) {
  try {
    // auth.createUserWithEmailAndPassword() returns a new obj, after creation of the account, which contains user key
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    // dispatching the signUpSuccess action with user and displayName
    yield put(signUpSuccess({ user, additionalData: { displayName } }));
  } catch (error) {
    yield put(signUpFailure(error.message));
  }
}

// this saga signs in the user after they sign up
export function* signInAfterSignUp({ payload: { user, additionalData } }) {
  yield getSnapshotFromUserAuth(user, additionalData);
}

// the following sagas listen to specific actions in order to call other sagas
// takeLatest is a listener that listens for the latest start action and cancels the previous similar actions
export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  // the action EMAIL_SIGN_IN_START carries the needed payload, email and password, to be passed to signInWithEmail
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

// combining all sagas that need to listen to actions in one saga
export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
  ]);
}
