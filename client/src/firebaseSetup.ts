import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyANfUGXVBY-Kkg_y2nvE9a9_u5xfvvfZsQ",
    authDomain: "modeflick-rota.firebaseapp.com",
    projectId: "modeflick-rota",
    storageBucket: "modeflick-rota.appspot.com",
    messagingSenderId: "83342462837",
    appId: "1:83342462837:web:754f2b20d048f2fc694d3c",
    measurementId: "G-3F02WSZ897"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();