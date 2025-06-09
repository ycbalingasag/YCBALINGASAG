// Replace with your Firebase project config from Firebase Console
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "
ycbalingasag-837b1",
  storageBucket: "https://ycbalingasag-837b1-default-rtdb.firebaseio.com",
  messagingSenderId: "194612719406",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
