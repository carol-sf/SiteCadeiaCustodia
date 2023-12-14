import { initializeApp } from "firebase/app"
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA4_ki7dtlzhONexBqmXQj-ZkQqK5yMKcQ",
  authDomain: "varios-1fa1e.firebaseapp.com",
  projectId: "varios-1fa1e",
  storageBucket: "varios-1fa1e.appspot.com",
  messagingSenderId: "95910596250",
  appId: "1:95910596250:web:9afefac80d42309bddd923"
}

const app = initializeApp(firebaseConfig)

const db= getFirestore(app)

export {db}