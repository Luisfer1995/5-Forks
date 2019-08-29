import firebase from 'firebase/app';


const  firebaseConfig = {
    apiKey: "AIzaSyBc1rKnq6OHOAB9ib8alaCAyuFhrl_saDg",
    authDomain: "forks-d8c64.firebaseapp.com",
    databaseURL: "https://forks-d8c64.firebaseio.com",
    projectId: "forks-d8c64",
    storageBucket: "forks-d8c64.appspot.com",
    messagingSenderId: "81419554145",
    appId: "1:81419554145:web:9f0d12d30e96ff46"
};

export const firebaseapp= firebase.initializeApp(firebaseConfig)