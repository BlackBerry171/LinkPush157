importScripts(
  "https://www.gstatic.com/firebasejs/12.1.0/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/12.1.0/firebase-messaging-compat.js"
);


firebase.initializeApp({
  apiKey: "AIzaSyBxt1S0Rn63tymkSa0CqqpQBi8fFgSKhoE",
  authDomain: "linkpush-e7bb6.firebaseapp.com",
  projectId: "linkpush-e7bb6",
  storageBucket: "linkpush-e7bb6.firebasestorage.app",
  messagingSenderId: "753138864517",
  appId: "1:753138864517:web:3df918ac7b3a861bdff4ec"
});


const messaging = firebase.messaging();