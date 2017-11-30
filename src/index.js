import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';


firebase.initializeApp({
    apiKey: "AIzaSyCIAeaWzTzm8NuLpWoyI_o9EhBrP56_5Bw",
    authDomain: "api-github-lqn.firebaseapp.com",
    databaseURL: "https://api-github-lqn.firebaseio.com",
    projectId: "api-github-lqn",
    storageBucket: "api-github-lqn.appspot.com",
    messagingSenderId: "514955299995"
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
