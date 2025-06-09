// Replace with your Firebase project config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyCKB39SXsY0DzOCeow9wILTiGzbE-PFYhw",
  authDomain: "ycbalingasag-837b1.firebaseapp.com",
  projectId: "
ycbalingasag-837b1",
  storageBucket: "ycbalingasag-837b1.firebasestorage.app",
  messagingSenderId: "194612719406",
  appId: "1:194612719406:web:7087557a685822426414bf"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
