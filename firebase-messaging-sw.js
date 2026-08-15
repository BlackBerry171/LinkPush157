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


messaging.onBackgroundMessage((payload) => {

  console.log(
    "Notificação recebida em segundo plano:",
    payload
  );


  const notificationTitle =
    payload.notification?.title ||
    "LinkPush 🔔";


  const notificationOptions = {

    body:
      payload.notification?.body ||
      "Você recebeu uma nova mensagem.",

    icon:
      payload.notification?.icon ||
      "/LinkPush157/icon.png",

    data: {
      url:
        payload.data?.url ||
        "https://blackberry171.github.io/LinkPush157/"
    }

  };


  self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );

});


self.addEventListener("notificationclick", (event) => {

  event.notification.close();


  const url =
    event.notification.data?.url ||
    "https://blackberry171.github.io/LinkPush157/";


  event.waitUntil(
    clients.openWindow(url)
  );

});