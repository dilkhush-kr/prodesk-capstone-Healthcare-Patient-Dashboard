
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCZYVXw-GWR4pf9_RsXuXme2wyuAcKV5zU",
  authDomain: "vitalsync-3415a.firebaseapp.com",
  projectId: "vitalsync-3415a",
  storageBucket: "vitalsync-3415a.firebasestorage.app",
  messagingSenderId: "863606997199",
  appId: "1:863606997199:web:204af9d571330d94bd77ba"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);