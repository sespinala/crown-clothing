import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyA7H-Cbq2-AUrLKnz-RD6DHloGqCFe-xsw",
  authDomain: "crwn-db-9c90b.firebaseapp.com",
  databaseURL: "https://crwn-db-9c90b.firebaseio.com",
  projectId: "crwn-db-9c90b",
  storageBucket: "crwn-db-9c90b.appspot.com",
  messagingSenderId: "252469077584",
  appId: "1:252469077584:web:1d41b56260eaafb1085355"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;