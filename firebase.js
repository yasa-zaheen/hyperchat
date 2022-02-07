// Imports
import firebase from "firebase";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuutAArY4we2IXK6fI_RbBF-L3VqGOmXU",
  authDomain: "hyperchat-90b56.firebaseapp.com",
  projectId: "hyperchat-90b56",
  storageBucket: "hyperchat-90b56.appspot.com",
  messagingSenderId: "749821318388",
  appId: "1:749821318388:web:6cd8d74de6d8ef29be7aa1",
};

// Initialize Firebase
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const auth = firebase.auth();
const db = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };
