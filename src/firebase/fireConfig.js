// Importo las funcionas que necesito del sdk que necesito.
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

//FALTA: CREAR VARIABLES DE ENTORNO PARA ESTE CODIGO.
const firebaseConfig = {
  apiKey: "AIzaSyADuMI5ixPGQbMpfCVZV55hYYRxO_iaBBY",
  authDomain: "catalogobelie.firebaseapp.com",
  projectId: "catalogobelie",
  storageBucket: "catalogobelie.appspot.com",
  messagingSenderId: "498390481280",
  appId: "1:498390481280:web:fe327e13388100b99ce965",
  measurementId: "G-M3FCLMH23T"
};

// Initializamos Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const Auth = getAuth(app);