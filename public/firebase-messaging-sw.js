// Scripts for firebase and firebase messaging
importScripts(
    'https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js'
);
importScripts(
    'https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js'
);

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
    apiKey: 'AIzaSyBcE_SEqdtBTl61WdAcEHmQPnMzRqs3Pek',
    authDomain: 'dam-photo-app.firebaseapp.com',
    projectId: 'dam-photo-app',
    storageBucket: 'dam-photo-app.appspot.com',
    messagingSenderId: '1023011207770',
    appId: '1:1023011207770:web:b6a7a4d154aaeb1efa3663',
    measurementId: 'G-QJSBK4SN7D',
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };
    console.log(self.registration);
    self.registration.showNotification(notificationTitle, notificationOptions);
});
