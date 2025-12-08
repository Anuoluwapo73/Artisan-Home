import {initializeApp} from "firebase/app"
import {getAuth} from "firebase/auth"

//Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAvVHxbmFqsagOI8WgQsUwwzvOUmxI56T0",
  authDomain: "artisan-home-e8b4c.firebaseapp.com",
  projectId: "artisan-home-e8b4c",
  storageBucket: "artisan-home-e8b4c.firebasestorage.app",
  messagingSenderId: "57340475734",
  appId: "1:57340475734:web:ff63b6dfe7940636ee7ef7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
