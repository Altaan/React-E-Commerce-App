import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDbQmwBJyMEQ1wari2oSzvHZUH96z0qzrg",
  authDomain: "crown-db-8f27d.firebaseapp.com",
  databaseURL: "https://crown-db-8f27d.firebaseio.com",
  projectId: "crown-db-8f27d",
  storageBucket: "crown-db-8f27d.appspot.com",
  messagingSenderId: "368843294221",
  appId: "1:368843294221:web:6c37484f460c4ee9a47744",
  measurementId: "G-Z30G00F9R7",
};

firebase.initializeApp(config);

// take the user from the obj returned by the auth library and store it in database
export const createUserProfileDocument = async (userAuth, additionalData) => {
  // the auth library returns null when the user signs out
  if (!userAuth) return;
  // when the user is signed in the auth library returns an obj, so query the firebase database to check if the obj exists
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  // even when there isn't user obj in the database, firebase will always return a snapshot obj to check if the user obj exists
  const snapShot = await userRef.get();
  // Getting the data in the users collection in firebase to log it
  /*
  const collectionRef = firestore.collection("users");
  const collectionSnapshot = await collectionRef.get();
  console.log({ collection: collectionSnapshot.docs.map((doc) => doc.data()) });
  */
  // if the user doesn't exists then create new doc and add the user to the database
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      // create a new doc obj with the properties below
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

// add new collection with docs for the passed array of objectsToAdd
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  // batch write is a way to group all requests as one request to avoid any failures in the writting of data
  const batch = firestore.batch();
  // looping through objectsToAdd array to batch the calls to create doc for each of the 5 collections
  objectsToAdd.forEach((obj) => {
    // asking firebase for new docRef in collectionRef and randomly generate an ID for this new doc
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  // firing off the batch request. commit() returns a promise. When commit() succeeds it resolves with null value
  return await batch.commit();
};

// this function converts the snapshot of collections doc to object
export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    // getting the data from the snapshot for every doc in collections
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });
  // console.log(transformedCollection);
  // reducing the transformedCollection array to an object with all of the collections in it
  return transformedCollection.reduce((accumulator, collection) => {
    // each collection will have a key from title property retrieved from firebase docs
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

// getCurrentUser checks if userAuth exists then unsubscribes immediately
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    // onAuthStateChanged(success, error) if there's userAuth the promise will resolve with it otherwise null will be returned
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Trigger the google popup with GoogleAuthProvider() whenever signInWithGoogle is called, check the sign-in component
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
